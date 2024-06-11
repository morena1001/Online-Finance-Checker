import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './profile.css'

export const Profile = (props) => {
    const navigate = useNavigate()
    const [ editMode, setEditMode ] = useState(false)
    const [ deleteMode, setDeleteMode ] = useState(false)

    const onEditAccountButton = () => {
        if (deleteMode) {
            document.getElementById('editIcon').style.display = 'inline'
            document.getElementById('cancelIcon').style.display = 'none'
            setDeleteMode(false)
        }

        else if (!editMode) {
            document.getElementById('viewMode').style.display = 'none'
            document.getElementById('editMode').style.display = 'flex'
            document.getElementById('editIcon').style.display = 'none'
            document.getElementById('trashIcon').style.display = 'none'
            document.getElementById('cancelIcon').style.display = 'inline'
            document.getElementById('checkIcon').style.display = 'inline'
            setEditMode(true)
        } else {
            document.getElementById('viewMode').style.display = 'inline'
            document.getElementById('editMode').style.display = 'none'
            document.getElementById('editIcon').style.display = 'inline'
            document.getElementById('trashIcon').style.display = 'inline'
            document.getElementById('cancelIcon').style.display = 'none'
            document.getElementById('checkIcon').style.display = 'none'
            setEditMode(false)
        }
        document.getElementById('askForPasswordContainer').style.display = 'none'
    }

    const onDeleteAccountButton = () => {
        if (editMode) {
            document.getElementById('askForPasswordContainer').style.display = 'flex'
            document.getElementById('editIcon').style.display = 'none'
            document.getElementById('cancelIcon').style.display = 'inline'
        }
        else if (!deleteMode) {
            document.getElementById('askForPasswordContainer').style.display = 'flex'
            document.getElementById('editIcon').style.display = 'none'
            document.getElementById('cancelIcon').style.display = 'inline'
            setDeleteMode(true)
        }
    }

    const onEnterPreviousPasswordButton = () => {
        fetch('/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                // username: props.username, 
                username: JSON.parse(localStorage.getItem('user')).username,
                password: document.getElementById('previousPassword').value 
            })
        })
        .then(r => r.json())
        .then(r => {
            console.log(r.message)
        })
        // console.log(deleteMode + " " + editMode)
    }

    const onHomeButton = () => {
        navigate('/home', props)
    }

    return (
        <>
            <div className='profileContainer'>
                <div className='profileWrapper viewMode' id='viewMode'>
                    <div className='username'>admin1</div>
                    <div className='email'>admin1@admin.com</div>
                    <div className='currentTrackersContainer'>
                        <span className='currentTrackersSpan'>Current Trackers =</span>
                        <div className='currentTrackersCount'>2</div>
                    </div>
                    <div className='totalMoneySpentInTrackersContainer'>
                        <span className='totalMoneySpentInTrackersSpan'>Total Money Spent = </span>
                        <div className='totalMoneySpentInTrackersCount'>$195.36</div>
                    </div>
                    <div className='totalMoneySavedInTrackersContainer'>
                        <span className='totalMoneySavedInTrackersSpan'>Total Money Saved = </span>
                        <div className='totalMoneySavedInTrackersCount'>$12.97</div>
                    </div>
                </div>

                <div className='profileWrapper editMode' id='editMode'>
                    <span className='usernameSpan editSpan'>Username</span>
                    <input type='text' className='usernameEdit editInputBox' placeholder='Enter new username' />
                    <span className='emailSpan editSpan'>email</span>
                    <input type='text' className='emailEdit editInputBox' placeholder='Enter new email' />
                    <span className='passwordSpan editSpan'>password</span>
                    <input type='text' className='passwordEdit editInputBox' placeholder='Enter new password' />
                </div>

                <div className='optionButtonsContainer'>
                    <div className='optionButtonsWrapper'>
                        <button className='editAccountButton' onClick={ onEditAccountButton }>
                            <i class='fa-solid fa-pencil' id='editIcon'/>
                            <i class='fa-solid fa-xmark' id='cancelIcon'/>
                        </button>
                        <button className='deleteAccountButton' id='deleteAccountButton' onClick={ onDeleteAccountButton }>
                            <i class='fa-solid fa-trash' id='trashIcon'/>
                            <i class='fa-solid fa-check' id='checkIcon'/>
                        </button>
                        <button className="homeButton" id='homeButton' onClick={ onHomeButton }>
                            <i class="fa-solid fa-house"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div className='askForPasswordContainer' id='askForPasswordContainer'>
                <div className='askForPasswordWrapper'>
                    <span className='askForPasswordSpan'>Previous password</span>
                    <input type='text' className='previousPassword' id='previousPassword' placeholder='Enter previous password' />
                    <button className='enterPreviousPassword' onClick={ onEnterPreviousPasswordButton }>Enter</button>
                </div>
            </div>
        </>
    )
}
