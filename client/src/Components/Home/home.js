import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './home.css'

export const Home = (props) => {
    const navigate = useNavigate()
    const [ editMode, setEditMode ] = useState(false)
    const [ deleteMode, setDeleteMode ] = useState(false)
    const [ purchaseIdInEditMode, setPurchaseIdInEditMode] = useState('')
    const [ purchaseIdInDeleteMode, setPurchaseIdInDeleteMode] = useState('')

    const onSignOutButtonClick = () => {
        navigate('/login')
    }

    const onProfileButtonClick = () => {
        navigate('/profile/' + props.userId, props)
    }

    const onNewTrackerButtonClick = () => {
        navigate('/tracker', props)
    }

    const onLimitTrackerTimePeriodHistoryButtonClick = () => {
        navigate('/trackerHistory/1', props) // UPDATE THIS
    }

    const onLimitTrackerEditButtonClick = () => {
        navigate('/tracker/1', props) // UPDATE THIS
    }
    
    const onEditPurchaseButtonClick = (item) => {
        if (item.target.id !== 'editPurchaseItemButton') {
            item.target = item.target.parentElement
        }

        if (deleteMode && purchaseIdInDeleteMode === item.target.parentElement.parentElement.id) {
            item.target.querySelector('#pencilIcon').style.display = 'inline'
            item.target.querySelector('#cancelIcon').style.display = 'none'

            item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'inline'
            item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#checkIcon').style.display = 'none'
            setPurchaseIdInDeleteMode('')
            setDeleteMode(false)
            return
        } else if (deleteMode) {
            let previousItem = item.target.parentElement.parentElement.parentElement.querySelector('#' + purchaseIdInDeleteMode)

            previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
            previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'

            previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'inline'
            previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#checkIcon').style.display = 'none'
            setPurchaseIdInDeleteMode('')
            setDeleteMode(false)
        }

        if (editMode && purchaseIdInEditMode === item.target.parentElement.parentElement.id) {
            console.log("DONE WITH EDIT")

            item.target.querySelector('#pencilIcon').style.display = 'inline'
            item.target.querySelector('#checkIcon').style.display = 'none'

            item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'inline'
            item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'
            setPurchaseIdInEditMode('')
            setEditMode(false)
            return
        } else if (editMode) {
            let previousItem = item.target.parentElement.parentElement.parentElement.querySelector('#' + purchaseIdInEditMode)

            previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
            previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#checkIcon').style.display = 'none'

            previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItem').querySelector('#trashIcon').style.display = 'inline'
            previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'
        }

        item.target.querySelector('#pencilIcon').style.display = 'none'
        item.target.querySelector('#checkIcon').style.display = 'inline'

        item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'none'
        item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#cancelIcon').style.display = 'inline'

        setPurchaseIdInEditMode(item.target.parentElement.parentElement.id)
        setEditMode(true);
    }

    const onDeletePurchaseButtonClick = (item) => {
        if (item.target.id !== 'deletePurchaseItemButton') {
            item.target = item.target.parentElement
        }

        if (editMode && purchaseIdInEditMode === item.target.parentElement.parentElement.id) {
            item.target.querySelector('#trashIcon').style.display = 'inline'
            item.target.querySelector('#cancelIcon').style.display = 'none'

            item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
            item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#checkIcon').style.display = 'none'
            setPurchaseIdInEditMode('')
            setEditMode(false)
            return
        } else if (editMode) {
            let previousItem = item.target.parentElement.parentElement.parentElement.querySelector('#' + purchaseIdInEditMode)

            previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'inline'
            previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'

            previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
            previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#checkIcon').style.display = 'none'
            setPurchaseIdInEditMode('')
            setEditMode(false)
        }

        if (deleteMode && purchaseIdInDeleteMode === item.target.parentElement.parentElement.id) {
            console.log("DONE WITH DELETION")

            item.target.querySelector('#trashIcon').style.display = 'inline'
            item.target.querySelector('#checkIcon').style.display = 'none'

            item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
            item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'
            setPurchaseIdInDeleteMode('')
            setDeleteMode(false)
            return
        } else if (deleteMode) {
            let previousItem = item.target.parentElement.parentElement.parentElement.querySelector('#' + purchaseIdInDeleteMode)
            
            previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'inline'
            previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#checkIcon').style.display = 'none'

            previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
            previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'
        }

        item.target.querySelector('#trashIcon').style.display = 'none'
        item.target.querySelector('#checkIcon').style.display = 'inline'

        item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'none'
        item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#cancelIcon').style.display = 'inline'

        setPurchaseIdInDeleteMode(item.target.parentElement.parentElement.id)
        setDeleteMode(true);
    }

    useEffect(() => {
        if (!props.loggedIn) {
            navigate('/login', props)
        }
    })

    return (
        <>
            <div className="headerContainer">
                <div className="headerWrapper">
                    <div className="siteTitle">OFC</div>
                    <div className="headerButtons">
                        <div className="profileButtonContainer">
                            <button className="profileButton" onClick={onProfileButtonClick}>
                                <i class="fa-solid fa-user"></i>
                            </button>
                        </div>
                        <div className="newTrackerButtonContainer">
                            <button className="newTrackerButton" onClick={onNewTrackerButtonClick}>New Tracker</button>
                        </div>
                        <div className="signOutButtonContainer">
                            <button className="signOutButton" onClick={onSignOutButtonClick}>Sign out</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bodyContainer">
                <div className="bodyWrapper">
                    <div className="trackItemsContainer">
                        <select name="Limit Tracker" id="limitTrackerSelector" className="limitTrackerSelector">
                            <option value="Tracker1" className='trackerListItem'>Tracker #1</option>
                        </select>
                        {/* <div className="limitTrackerTimePeriodHistoryContainer"> */}
                            <button className="limitTrackerTimePeriodHistoryButton" onClick={ onLimitTrackerTimePeriodHistoryButtonClick }><i class="fa-solid fa-clock-rotate-left buttons" /></button>
                        {/* </div> */}
                        {/* <div className="limitTrackerEditContainer"> */}
                            <button className="limitTrackerEditButton" onClick={ onLimitTrackerEditButtonClick }><i class="fa-solid fa-pencil buttons" /></button>
                        {/* </div> */}
                    </div>

                    <div className="currentPeriodLimitStatisticsContainer">
                        <div className="moneyLimitContainer">
                            <span className="limitText">Limit:</span>
                            <span className="currentPeriodMoneyLimit">$150</span>
                        </div>
                        <div className="timeLimitContainer">
                            <span className="limitText">Period:</span>
                            <span className="currentPeriodTimeLimit">2 weeks</span>
                        </div>
                    </div>

                    <div className="currentPeriodPurchasesListContainer" id='currentPeriodPurchasesListContainer'>
                        <table className="currentPeriodPurchasesList">
                            <tr className="currentPurchasesListHeader">
                                <th className="listHeader dateOfPurchaseTitle">Date</th>
                                <th className="listHeader purchaseReasonTitle">Reason</th>
                                <th className="listHeader moneySpentOnPurchaseTitle">Amount</th>
                                {/* <th className="listHeader editPurchaseItemTitle">
                                </th> */}
                            </tr>
                            <tr className="purchaseItem" id='item1'>
                                <td className="purchaseItemCell dateOfPurchase">5/1/24</td>
                                <td className="purchaseItemCell purchaseReason purchaseViewMode">Pizza Hut</td>
                                <td className="purchaseItemCell moneySpentOnPurchase purchaseViewMode">$24.50</td>
                                <td className="purchaseItemCell purchaseReason purchaseEditMode">
                                    <input type="text" className="editInput"  value={'Pizza Hut'} />
                                </td>
                                <td className="purchaseItemCell moneySpentOnPurchase purchaseEditMode">
                                    <input type="text" className="editInput" value={'$24.50'} />
                                </td>
                                <td className="purchaseItemCell editPurchaseItem" id='editPurchaseItem'>
                                    <button className="editPurchaseItemButton" id='editPurchaseItemButton' title="edit" onClick={ onEditPurchaseButtonClick }>
                                        <i class="fa-solid fa-pencil" id='pencilIcon' />
                                        <i class='fa-solid fa-check' id='checkIcon'/>
                                        <i class='fa-solid fa-xmark' id='cancelIcon'/>
                                    </button>
                                </td>
                                <td className="purchaseItemCell deletePurchaseItem" id='deletePurchaseItem'>
                                    <button className="editPurchaseItemButton" id='deletePurchaseItemButton' title=" delete" onClick={ onDeletePurchaseButtonClick }>
                                        <i class="fa-solid fa-trash" id='trashIcon' />
                                        <i class='fa-solid fa-check' id='checkIcon'/>
                                        <i class='fa-solid fa-xmark' id='cancelIcon'/>
                                    </button>
                                </td>
                            </tr>
                            <tr className="purchaseItem" id='item2'>
                                <td className="purchaseItemCell dateOfPurchase">5/1/24</td>
                                <td className="purchaseItemCell purchaseReason purchaseViewMode">Pizza Hut</td>
                                <td className="purchaseItemCell moneySpentOnPurchase purchaseViewMode">$24.50</td>
                                <td className="purchaseItemCell purchaseReason purchaseEditMode">
                                    <input type="text" className="editInput"  value={'Pizza Hut'} />
                                </td>
                                <td className="purchaseItemCell moneySpentOnPurchase purchaseEditMode">
                                    <input type="text" className="editInput" value={'$24.50'} />
                                </td>
                                <td className="purchaseItemCell editPurchaseItem" id='editPurchaseItem'>
                                    <button className="editPurchaseItemButton" id='editPurchaseItemButton' title="edit" onClick={ onEditPurchaseButtonClick }>
                                        <i class="fa-solid fa-pencil" id='pencilIcon' />
                                        <i class='fa-solid fa-check' id='checkIcon'/>
                                        <i class='fa-solid fa-xmark' id='cancelIcon'/>
                                    </button>
                                </td>
                                <td className="purchaseItemCell deletePurchaseItem" id='deletePurchaseItem'>
                                    <button className="editPurchaseItemButton" id='deletePurchaseItemButton' title=" delete" onClick={ onDeletePurchaseButtonClick }>
                                        <i class="fa-solid fa-trash" id='trashIcon' />
                                        <i class='fa-solid fa-check' id='checkIcon'/>
                                        <i class='fa-solid fa-xmark' id='cancelIcon'/>
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div className="currentPeriodStatisticsContainer">
                        <div className="totalMoneySpentContainer">
                            <span className="leftText">Total Spent:</span>
                            <span className="currentPeriodMoneySpent">$120.33</span>
                        </div>
                        <div className="timeLeftInPeriodContainer">
                            <span className="leftText">Time Left:</span>
                            <span className="timeLeft">2:14:5:3</span>
                        </div>
                        <div className="totalMoneyLeftContainer">
                            <span className="leftText">Total Left:</span>
                            <span className="currentPeriodMoneyLeft">$29.67</span>
                        </div>
                    </div>

                    <div className="NewPurchaseAdderContainer">
                        <input type="text" className="itemPurchaseAmount" placeholder='Purchase Amount' />
                        <input type="text" className="itemPurchaseReason" placeholder='Purchase Reason' />
                        <button className="itemAddToListButton">Add</button>
                    </div>
                </div>
            </div>
        </>
    )
}
