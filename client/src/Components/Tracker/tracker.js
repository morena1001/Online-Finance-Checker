import React, { useState, useEffect } from 'react'
import { useNavigate, Link, useParams } from 'react-router-dom'

import './tracker.css'

export const Tracker = (props) => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ editMode, setEditMode ] = useState(false)
    const [ deleteMode, setDeleteMode ] = useState(false)

    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if (month < 10) { month = '0' + month.toString() } 
    let today = year + '-' + month + '-' + day


    const onEditTrackerButton = () => {
        if (deleteMode) {
            document.getElementById('editIcon').style.display = 'inline'
            document.getElementById('cancelIcon').style.display = 'none'
            setDeleteMode(false)
        }

        else if (!editMode) {
            Array.from(document.getElementsByClassName('viewTrackerMode')).forEach(element => {
                element.style.display = 'none'
            })

            Array.from(document.getElementsByClassName('editTrackerMode')).forEach(element => {
                element.style.display = 'inline'
            })
            document.getElementById('editIcon').style.display = 'none'
            document.getElementById('trashIcon').style.display = 'none'
            document.getElementById('cancelIcon').style.display = 'inline'
            document.getElementById('checkIcon').style.display = 'inline'
            setEditMode(true)
        } else {
            Array.from(document.getElementsByClassName('viewTrackerMode')).forEach(element => {
                element.style.display = 'inline'
            })

            Array.from(document.getElementsByClassName('editTrackerMode')).forEach(element => {
                element.style.display = 'none'
            })
            document.getElementById('editIcon').style.display = 'inline'
            document.getElementById('trashIcon').style.display = 'inline'
            document.getElementById('cancelIcon').style.display = 'none'
            document.getElementById('checkIcon').style.display = 'none'
            setEditMode(false)
        }
        document.getElementById('askForPasswordContainer').style.display = 'none'
    }

    const onDeleteTrackerButton = () => {
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
    
    const onHomeButton = () => {
        navigate('/home', props)
    }

    const onCreateTrackerButton = () => {
        // FETCH REQUEST TO CREATE NEW TRACKER
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
    }

    useEffect(() => {
        
    })

    if (id) {
        return (
            <>
                <div className="trackerContainer">
                    <div className="trackerWrapper">
                        <div className="inputWrapper topInputWrapper">
                            <span className="trackerNameSpan inputSpan">Name</span>
                            <div className="trackerName trackerInfo viewTrackerMode">Tracker #1</div>
                            <input type="text" className="trackerName textInputItem editTrackerMode" placeholder='Enter tracker name'/>
                        </div>
                        <div className="inputWrapper">
                            <span className="trackerLimitSpan inputSpan">Limit</span>
                            <div className="trackerLimit trackerInfo viewTrackerMode">$150</div>
                            <input type="text" className="trackerLimit textInputItem editTrackerMode" placeholder='Enter period limit' />
                        </div>
                        <div className="inputWrapper">
                            <span className="trackerPeriodSpan inputSpan">Period</span>
                            <div className="trackerPeriod trackerInfo  viewTrackerMode">14 days</div>
                            <input type="text" className="trackerPeriod textInputItem editTrackerMode" placeholder='Enter length of period in days' />
                        </div>
                        <div className="inputWrapper bottomInputWrapper">
                            <span className="trackerStartDateSpan inputSpan">Start Date</span>
                            <div className="trackerPeriodStartDate trackerInfo  viewTrackerMode">6/14/2024</div>
                            <input type="date" className="trackerStartDate editTrackerMode" id='trackerStartDate' min={today} />
                        </div>
                    </div>

                    <div className='buttonMenuContainer'>
                        <div className='buttonMenuWrapper_2'>
                            <button className='editTrackerButton' onClick={ onEditTrackerButton }>
                                <i class='fa-solid fa-pencil' id='editIcon'/>
                                <i class='fa-solid fa-xmark' id='cancelIcon'/>
                            </button>
                            <button className='deleteTrackerButton' id='deleteTrackerButton' onClick={ onDeleteTrackerButton }>
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
    else {
        return (
            <>
                <div className="trackerContainer">
                    <div className="trackerWrapper">
                        {/* { id ? id : 'HELLO WORLD'} */}
                        <div className="inputWrapper topInputWrapper">
                            <span className="trackerNameSpan inputSpan">Name</span>
                            <input type="text" className="trackerName textInputItem" placeholder='Enter tracker name'/>
                        </div>
                        <div className="inputWrapper">
                            <span className="trackerLimitSpan inputSpan">Limit</span>
                            <input type="text" className="trackerLimit textInputItem" placeholder='Enter period limit' />
                        </div>
                        <div className="inputWrapper">
                            <span className="trackerPeriodSpan inputSpan">Period</span>
                            <input type="text" className="trackerPeriod textInputItem" placeholder='Enter length of period in days' />
                        </div>
                        <div className="inputWrapper bottomInputWrapper">
                            <span className="trackerStartDateSpan inputSpan">Start Date</span>
                            <input type="date" className="trackerStartDate" id='trackerStartDate' min={today} />
                        </div>
                    </div>

                    <div className='buttonMenuContainer'>
                        <div className='buttonMenuWrapper'>
                            <button className='createTrackerButton' id='createTrackerButton' onClick={ onCreateTrackerButton }>
                                <i class='fa-solid fa-check'/>
                            </button>
                            <button className="homeButton" id='homeButton' onClick={ onHomeButton }>
                                <i class="fa-solid fa-house"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
    }    
}
