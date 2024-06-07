import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './register.css'

export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [registerError, setRegisterError] = useState('')

    const navigate = useNavigate()

    const onRegisterButtonClick = () => {
        setEmailError('')
        setUsernameError('')
        setPasswordError('')
        setRegisterError('')
        let emailErrorCheck = false
        let usernameErrorCheck = false
        let passwordErrorCheck = false

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError('Please enter a valid email')
            emailErrorCheck = true
        }

        if ('' === username || /[^a-z0-9]/.test(username)) {
            setUsernameError('Please enter a valid username')
            usernameErrorCheck = true
        }
    
        if ('' === password || /\s/.test(password)) {
            setPasswordError('Please enter a valid password')
            passwordErrorCheck = true
        }
        else if (password.length < 7) {
            setPasswordError('The password must be 8 characters or longer')
            passwordErrorCheck = true
        }

        if (!emailErrorCheck && !usernameErrorCheck && !passwordErrorCheck ) {
            fetch('/checkAccount', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ username })
            })
            .then(r => r.json())
            .then(r => {
                if (r.status === 'User does not exist') {
                    fetch('/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, username, password })
                    })
                    .then(r => r.json())
                    .then(r => {
                        if (r.message === 'success') {
                            localStorage.setItem('user', JSON.stringify({ email, token: r.token,userId: r.result.insertedId.toString() }))
                            props.setUsername(username)
                            props.setLoggedIn(true)
                            props.setUserId(r.result.insertedId.toString())
                            navigate('/home', props)
                        } else {
                            setRegisterError('Error occurred. Try again')
                        }
                    })
                } else {
                    setRegisterError('Account does not exist. Try again')
                }
            })
        }
    }

    useEffect(() => {
        
    })

    return (
        <>
            <div className="registerContainer">
                <div className="registerWrapper">
                    <div className="titleContainer">
                        <div className="title">Register</div>
                    </div>
                    <div className="inputContainer">
                        <input type="text" className="inputBox" id='email' value={email} placeholder='Enter your email here' onChange={
                            (e) => setEmail(e.target.value)
                        }/>
                        <label className="errorLabel">{emailError}</label>
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
                        <label className="registerLabel">Already have an account?</label>
                        <Link className='link' to='/login'>Login</Link>
                    </div>
                    <div className="inputContainer">
                        <input className="inputButton" type="button" onClick={onRegisterButtonClick} value={'Register'} />
                        <label className="loginErrorLabel">{registerError}</label>
                    </div>
                </div>
            </div>
        </>
    )
}