import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const initState = {
    value: '',
    error: {
        isExist: false,
        msg: ''
    }
}

const Reg = () => {
    const [username, setUsername] = useState(initState)
    const [password, setPassword] = useState(initState)
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [email, setEmail] = useState(initState)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const navigate = useNavigate()

    const handleChange = event => {
        const field = event.target.id
        const value = event.target.value
        switch(field) {
            case 'username':
                setUsername({...initState, value})
                break
            case 'password':
                if(value === passwordConfirm) {
                    setPassword({...initState, value})
                } else {
                    const passwordMsg = 'The two password fields do not match'
                    setPassword({error: {isExist: true, msg: passwordMsg}, value})
                }
                break
            case 'password_confirm':
                setPasswordConfirm(value)
                if(value === password.value) {
                    setPassword({...initState, value: password.value})
                } else {
                    const passwordMsg = 'The two password fields do not match'
                    setPassword({error: {isExist: true, msg: passwordMsg}, value: password.value})
                }
                break
            case 'email':
                setEmail({...initState, value})
                break
            case 'first_name':
                setFirstName(value)
                break
            case 'last_name':
                setLastName(value)
        }
    }

    const handleSubmit = async event => {
        event.preventDefault()
        let isValid = true

        const usernamePattern = /^[a-zA-Z0-9](_(?![_.])|\.(?![_.])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/
        if (!usernamePattern.test(username.value)) {
            const msg = 'Only English letters, numbers, and _/. character; only a letter or digit character at the begining and at the end; 4-20 charachters'
            setUsername(prev => ({...prev, error: {isExist: true, msg}}))
            isValid = false
        }

        const emailPattern = /^[a-zA-Z0-9](-(?![_.-])|_(?![_.-])|\.(?![_.-])|[a-zA-Z0-9])+@[a-zA-Z0-9](-?[a-zA-Z0-9])+\.[a-zA-Z0-9]{2,4}$/
        if (!emailPattern.test(email.value)) {
            const msg = 'invalid email'
            setEmail(prev => ({...prev, error: {isExist: true, msg}}))
            isValid = false
        }

        if (password.value !== passwordConfirm) {
            isValid = false
        }

        if (isValid) {
            const data = {
                username: username.value,
                password: password.value,
                email: email.value,
                first_name: firstName,
                last_name: lastName
            }
            try {
                const response = await fetch('http://127.0.0.1:8000/auth/reg/', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
                })
                if (response.status === 201) {
                    const result = await response.json()
                    navigate('/auth/login')
                    console.log(result)
                } else if (response.status === 400) {
                    const errors = await response.json()
                    console.log(errors)
                    for (let key in errors) {
                        switch (key) {
                            case 'username':
                                setUsername(prev => ({...prev, error: {isExist: true, msg: errors[key].join(' ')}}))
                                break
                            case 'password':
                                setPassword({...initState, error: {isExist: true, msg: errors[key].join(' ')}})
                                setPasswordConfirm('')
                                break
                            case 'email':
                                setEmail(prev => ({...prev, error: {isExist: true, msg: errors[key].join(' ')}}))
                        }
                    }
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('not submitted')
        }
    }

    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2 className='auth-form__header'>SignUp</h2>
            <div className='auth-form__username auth-form__field'>
                <label className='hidden' htmlFor='username'>Username: </label>
                <input className='auth-form__input' type='text'
                        id='username' name='username' placeholder='Username'
                        value={username.value} onChange={handleChange} required></input>
                {username.error.isExist && <span>{username.error.msg}</span>}
            </div>
            <div className='auth-form__password auth-form__field'>
                <label className='hidden' htmlFor='password'>Password: </label>
                <input className='auth-form__input' type='password'
                        id='password' name='password' placeholder='Password'
                        value={password.value} onChange={handleChange} required></input>
                {password.error.isExist && <span>{password.error.msg}</span>}
            </div>
            <div className='auth-form__password-confirm auth-form__field'>
                <label className='hidden' htmlFor='password-confirm'>Password confirmation: </label>
                <input className='auth-form__input' type='password'
                        id='password-confirm' name='password_confirm' placeholder='Confirm password'
                        value={passwordConfirm} onChange={handleChange} required></input>
            </div>
            <div className='auth-form__email auth-form__field'>
                <label className='hidden' htmlFor='email'>Email: </label>
                <input className='auth-form__input' type='email'
                        id='email' name='email' placeholder='Email'
                        value={email.value} onChange={handleChange} required></input>
                {email.error.isExist && <span>{email.error.msg}</span>}
            </div>
            <div className='auth-form__firstname auth-form__field'>
                <label className='hidden' htmlFor='firstname'>First Name: </label>
                <input className='auth-form__input' type='text'
                        id='firstname' name='first_name' placeholder='First Name'
                        value={firstName} onChange={handleChange}></input>
            </div>
            <div className='auth-form__lastname auth-form__field'>
                <label className='hidden' htmlFor='lastname'>Last Name: </label>
                <input className='auth-form__input' type='text'
                        id='lastname' name='last_name' placeholder='Last Name'
                        value={lastName} onChange={handleChange}></input>
            </div>
            <div className='auth-form__submit-button'>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Reg