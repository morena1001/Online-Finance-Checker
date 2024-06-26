import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './login.css'

export const Login = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [loginError, setLoginError] = useState('')

    const navigate = useNavigate()

    const onLoginButtonClick = () => {
        setUsernameError('')
        setPasswordError('')
        setLoginError('')
        let usernameErrorCheck = false
        let passwordErrorCheck = false

        if ('' === username) {
            setUsernameError('Please enter your username')
            usernameErrorCheck = true
        }
        else if (/[^a-z0-9]/.test(username)) {
            setUsernameError('Please enter a valid username')
            usernameErrorCheck = true
        }

        if ('' === password) {
            setPasswordError('Please enter a password')
            passwordErrorCheck = true
        }
        else if (/\s/.test(password)) {
            setPasswordError('Please enter a valid password')
            passwordErrorCheck = true
        }
        else if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            passwordErrorCheck = true
        }

        if (!usernameErrorCheck && !passwordErrorCheck) {
            fetch('/checkAccount', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            .then(r => r.json())
            .then(r => {
                if (r.status === 'User exists') {
                    fetch('/auth', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ username, password })
                    })
                    .then(r => r.json())
                    .then(r => {
                        if (r.message === 'success') {
                            localStorage.setItem('user', JSON.stringify({ username, token: r.token, userId: r.userId }))
                            props.setUsername(username)
                            props.setLoggedIn(true)
                            props.setUserId(r.userId)
                            props.setCheckLogIn(false)
                            navigate('/home', props)
                        } else {
                            setLoginError('Password is incorrect. Try again')
                        }
                    })
                } else {
                    setLoginError('Account does not exist. Try again')
                }
            })
        }
    }

    useEffect(() => {
        if (props.loggedIn) {
            navigate('/home', props)
        }
    })

    return (
        <>
            <div className="loginContainer">
                <div className="loginWrapper">
                    <div className="titleContainer">
                        <div className="title">Login</div>
                    </div>
                    <div className="inputContainer">
                        <input type="text" className="inputBox" id='username' value={username} placeholder='Enter your username here' onChange={
                            (e) => setUsername(e.target.value)
                        }/>
                        <label className="errorLabel">{usernameError}</label>
                    </div>
                    <div className="inputContainer">
                        <input type="text" className="inputBox" id='password' placeholder='Enter your password here' onChange={
                            (e) => setPassword(e.target.value)
                        } />
                        <label className="errorLabel">{passwordError}</label>
                    </div>
                    <div className="registerLink">
                        <label className="registerLabel">Don't have an account?</label>
                        <Link className='link' to='/register'>Register</Link>
                    </div>
                    <div className="inputContainer">
                        <input className="inputButton" type="button" onClick={onLoginButtonClick} value={'Log in'} />
                        <label className="loginErrorLabel">{loginError}</label>
                    </div>
                </div>
            </div>
        </>
    )
}
