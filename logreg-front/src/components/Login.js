import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import useAuth from '../hooks/useAuth'

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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'>Username: </label>
                    <input type='text' id='username' name='username' value={username} onChange={handleChange} required></input>
                </div>
                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' id='password' name='password' value={password} onChange={handleChange} required></input>
                </div>
                <div>
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Login