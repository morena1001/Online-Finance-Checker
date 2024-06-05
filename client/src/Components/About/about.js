import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './about.css'

export const About = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/home')
    })
    return (
        <>
            ABOUT
        </>
    )
}