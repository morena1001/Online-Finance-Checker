import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './trackerHistory.css'

export const TrackerHistory = (props) => {
    const navigate = useNavigate()
    const [ deleteMode, setDeleteMode ] = useState(false)
    const [ trackerHistoryInDeleteMode, setTrackerHistoryInDeleteMode ] = useState('')

    const onDeleteTrackerHistoryButton = (item) => {
        if (item.target.id !== 'deleteTrackerHistoryButton') {
            item.target = item.target.parentElement
        }

        if (deleteMode && trackerHistoryInDeleteMode === item.target.parentElement.parentElement.parentElement.id) {
            console.log("DELETED")
            item.target.querySelector('#trashIcon').style.display = 'inline'
            item.target.querySelector('#checkIcon').style.display = 'none'

            item.target.parentElement.querySelector('#homeButton').querySelector('#homeIcon').style.display = 'inline'
            item.target.parentElement.querySelector('#homeButton').querySelector('#cancelIcon').style.display = 'none'
        } else if (deleteMode) {
            let previousItem = item.target.parentElement.parentElement.parentElement.parentElement.querySelector('#' + trackerHistoryInDeleteMode)

            previousItem.querySelector('#deleteTrackerHistoryButton').querySelector('#trashIcon').style.display = 'inline'
            previousItem.querySelector('#deleteTrackerHistoryButton').querySelector('#checkIcon').style.display = 'none'

            previousItem.querySelector('#homeButton').querySelector('#homeIcon').style.display = 'inline'
            previousItem.querySelector('#homeButton').querySelector('#cancelIcon').style.display = 'none'
        }

        item.target.querySelector('#trashIcon').style.display = 'none'
        item.target.querySelector('#checkIcon').style.display = 'inline'

        item.target.parentElement.querySelector('#homeButton').querySelector('#homeIcon').style.display = 'none'
        item.target.parentElement.querySelector('#homeButton').querySelector('#cancelIcon').style.display = 'inline'

        setTrackerHistoryInDeleteMode(item.target.parentElement.parentElement.parentElement.id)
        setDeleteMode(true)
    }

    const onHomeButton = (item) => {
        if (item.target.id !== 'homeButton') {
            item.target = item.target.parentElement
        }
        
        if (!deleteMode || trackerHistoryInDeleteMode !== item.target.parentElement.parentElement.parentElement.id) {
            navigate('/home', props)
        } else {
            item.target.querySelector('#homeIcon').style.display = 'inline'
            item.target.querySelector('#cancelIcon').style.display = 'none'

            item.target.parentElement.querySelector('#deleteTrackerHistoryButton').querySelector('#trashIcon').style.display = 'inline'
            item.target.parentElement.querySelector('#deleteTrackerHistoryButton').querySelector('#checkIcon').style.display = 'none'

            setTrackerHistoryInDeleteMode('')
            setDeleteMode(false)
        }
    }    

    return (
        <>
            <div className="trackerHistoriesContainer">
                <div className="trackerHistoriesWrapper">
                    <div className="trackerHistoryItemContainer" id='item1'>
                        <div className="trackerHistoryItemWrapper">
                            <div className="limitContainer containerItem firstContainerItem">
                                <div className="limitSpan spanItem">limit:</div>
                                <div className="limitAmount">$150</div>
                            </div>
                            <div className="periodContainer containerItem">
                                <div className="periodSpan spanItem">Period:</div>
                                <div className="periodAmount">14 days</div>
                            </div>
                            <div className="startDateContainer containerItem">
                                <div className="startDateSpan spanItem">Start date:</div>
                                <div className="startDateAmount">5/31/2024</div>
                            </div>
                            <div className="endDateContainer containerItem">
                                <div className="endDateSpan spanItem">End date:</div>
                                <div className="endDateAmount">6/13/2024</div>
                            </div>
                            <div className="moneySpentContainer containerItem">
                                <div className="moneySpentSpan spanItem">Money spent:</div>
                                <div className="moneySpentAmount">$12.98</div>
                            </div>
                            <div className="moneyLeftOverContainer containerItem">
                                <div className="moneyLeftOverSpan spanItem">Money left over:</div>
                                <div className="moneyLeftOverAmount">$112.20</div>
                            </div>
                            <div className="overdraftContainer containerItem lastContainerItem">
                                <div className="overdraftSpan spanItem">Overdraft occurred:</div>
                                <div className="overdraftAmount">No</div>
                            </div>
                        </div>

                        <div className='optionButtonsContainer'>
                            <div className='optionButtonsWrapper'>
                                <button className='deleteTrackerHistoryButton' id='deleteTrackerHistoryButton' onClick={ onDeleteTrackerHistoryButton }>
                                    <i class='fa-solid fa-trash' id='trashIcon'/>
                                    <i class='fa-solid fa-check' id='checkIcon'/>
                                </button>
                                <button className="homeButton" id='homeButton' onClick={ onHomeButton }>
                                    <i class="fa-solid fa-house" id='homeIcon'></i>
                                    <i class='fa-solid fa-xmark' id='cancelIcon'/>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="trackerHistoryItemContainer" id='item2'>
                        <div className="trackerHistoryItemWrapper">
                            <div className="limitContainer containerItem firstContainerItem">
                                <div className="limitSpan spanItem">limit:</div>
                                <div className="limitAmount">$150</div>
                            </div>
                            <div className="periodContainer containerItem">
                                <div className="periodSpan spanItem">Period:</div>
                                <div className="periodAmount">14 days</div>
                            </div>
                            <div className="startDateContainer containerItem">
                                <div className="startDateSpan spanItem">Start date:</div>
                                <div className="startDateAmount">5/31/2024</div>
                            </div>
                            <div className="endDateContainer containerItem">
                                <div className="endDateSpan spanItem">End date:</div>
                                <div className="endDateAmount">6/13/2024</div>
                            </div>
                            <div className="moneySpentContainer containerItem">
                                <div className="moneySpentSpan spanItem">Money spent:</div>
                                <div className="moneySpentAmount">$12.98</div>
                            </div>
                            <div className="moneyLeftOverContainer containerItem">
                                <div className="moneyLeftOverSpan spanItem">Money left over:</div>
                                <div className="moneyLeftOverAmount">$112.20</div>
                            </div>
                            <div className="overdraftContainer containerItem lastContainerItem">
                                <div className="overdraftSpan spanItem">Overdraft occurred:</div>
                                <div className="overdraftAmount">No</div>
                            </div>
                        </div>

                        <div className='optionButtonsContainer'>
                            <div className='optionButtonsWrapper'>
                                <button className='deleteTrackerHistoryButton' id='deleteTrackerHistoryButton' onClick={ onDeleteTrackerHistoryButton }>
                                    <i class='fa-solid fa-trash' id='trashIcon'/>
                                    <i class='fa-solid fa-check' id='checkIcon'/>
                                </button>
                                <button className="homeButton" id='homeButton' onClick={ onHomeButton }>
                                    <i class="fa-solid fa-house" id='homeIcon'></i>
                                    <i class='fa-solid fa-xmark' id='cancelIcon'/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
