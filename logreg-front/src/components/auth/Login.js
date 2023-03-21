import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const {setAuth} = useAuth()

    const navigate = useNavigate()

    const handleChange = event => {
        const field = event.target.id
        const value = event.target.value
        switch (field) {
            case 'username':
                setUsername(value)
                break
            case 'password':
                setPassword(value)
        }
    }

    const handleSubmit = async event => {
        event.preventDefault()

        const data = {
            username,
            password
        }
        try {    
            const response = await fetch('http://127.0.0.1:8000/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                },
                credentials: "include",
                body: JSON.stringify(data)
            })
            if (response.ok) {
                const result = await response.json()
                setAuth(result.data)
                navigate('/chat', {replace: true})
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form className='auth-form' onSubmit={handleSubmit}>
            <h2 className='auth-form__header'>LogIn</h2>
            <div className='auth-form__username auth-form__field'>
                <label className='hidden' htmlFor='username'>Username: </label>
                <input className='auth-form__input' type='text'
                        id='username' name='username' placeholder='Username'
                        value={username} onChange={handleChange} required></input>
            </div>
            <div className='auth-form__password auth-form__field'>
                <label className='hidden' htmlFor='password'>Password: </label>
                <input className='auth-form__input' type='password'
                        id='password' name='password' placeholder='Password'
                        value={password} onChange={handleChange} required></input>
            </div>
            <div className='auth-form__submit-button'>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Login