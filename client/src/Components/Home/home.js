import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './home.css'

export const Home = (props) => {
    const navigate = useNavigate()
    const [ loaded, setLoaded ] = useState(false)
    const [ editMode, setEditMode ] = useState(false)
    const [ deleteMode, setDeleteMode ] = useState(false)
    const [ purchaseIdInEditMode, setPurchaseIdInEditMode] = useState('')
    const [ purchaseIdInDeleteMode, setPurchaseIdInDeleteMode] = useState('')

    var dayCount
    var hourCount
    var minuteCount
    var secondCount
    var inEditMode = false
    var itemInEditMode
    var inDeleteMode = false
    var itemInDeleteMode

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
    
    // const onEditPurchaseButtonClick = (item) => {
    //     if (item.target.id !== 'editPurchaseItemButton') {
    //         item.target = item.target.parentElement
    //     }

    //     if (deleteMode && purchaseIdInDeleteMode === item.target.parentElement.parentElement.id) {
    //         item.target.querySelector('#pencilIcon').style.display = 'inline'
    //         item.target.querySelector('#cancelIcon').style.display = 'none'

    //         item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'inline'
    //         item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#checkIcon').style.display = 'none'
    //         setPurchaseIdInDeleteMode('')
    //         setDeleteMode(false)
    //         return
    //     } else if (deleteMode) {
    //         let previousItem = item.target.parentElement.parentElement.parentElement.querySelector('#' + purchaseIdInDeleteMode)

    //         previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
    //         previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'

    //         previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'inline'
    //         previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#checkIcon').style.display = 'none'
    //         setPurchaseIdInDeleteMode('')
    //         setDeleteMode(false)
    //     }

    //     if (editMode && purchaseIdInEditMode === item.target.parentElement.parentElement.id) {
    //         console.log("DONE WITH EDIT")

    //         item.target.querySelector('#pencilIcon').style.display = 'inline'
    //         item.target.querySelector('#checkIcon').style.display = 'none'

    //         item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'inline'
    //         item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'
    //         setPurchaseIdInEditMode('')
    //         setEditMode(false)
    //         return
    //     } else if (editMode) {
    //         let previousItem = item.target.parentElement.parentElement.parentElement.querySelector('#' + purchaseIdInEditMode)

    //         previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
    //         previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#checkIcon').style.display = 'none'

    //         previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItem').querySelector('#trashIcon').style.display = 'inline'
    //         previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'
    //     }

    //     let hope = item.target.querySelector('#pencilIcon')
    //     console.log(hope.style)
    //     console.log(item.target.style)
    //     console.log(document.getElementById(item.target.id).getElementsByClassName('pencilIcon')[0].style)

    //     item.target.querySelector('#pencilIcon').style.display = 'none'
    //     item.target.querySelector('#checkIcon').style.display = 'inline'

    //     item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'none'
    //     item.target.parentElement.parentElement.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#cancelIcon').style.display = 'inline'

    //     setPurchaseIdInEditMode(item.target.parentElement.parentElement.id)
    //     setEditMode(true);
    // }

    // const onNewDeletePurchaseButtonClick = (item) => {
    //     if (item.target.id !== 'deletePurchaseItemButton') {
    //         item.target = item.target.parentElement
    //     }

    //     if (editMode && purchaseIdInEditMode === item.target.parentElement.parentElement.id) {
    //         item.target.querySelector('#trashIcon').style.display = 'inline'
    //         item.target.querySelector('#cancelIcon').style.display = 'none'

    //         item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
    //         item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#checkIcon').style.display = 'none'
    //         setPurchaseIdInEditMode('')
    //         setEditMode(false)
    //         return
    //     } else if (editMode) {
    //         let previousItem = item.target.parentElement.parentElement.parentElement.querySelector('#' + purchaseIdInEditMode)

    //         previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'inline'
    //         previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'

    //         previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
    //         previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#checkIcon').style.display = 'none'
    //         setPurchaseIdInEditMode('')
    //         setEditMode(false)
    //     }

    //     if (deleteMode && purchaseIdInDeleteMode === item.target.parentElement.parentElement.id) {
    //         console.log("DONE WITH DELETION")

    //         item.target.querySelector('#trashIcon').style.display = 'inline'
    //         item.target.querySelector('#checkIcon').style.display = 'none'

    //         item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
    //         item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'
    //         setPurchaseIdInDeleteMode('')
    //         setDeleteMode(false)
    //         return
    //     } else if (deleteMode) {
    //         let previousItem = item.target.parentElement.parentElement.parentElement.querySelector('#' + purchaseIdInDeleteMode)
            
    //         previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#trashIcon').style.display = 'inline'
    //         previousItem.querySelector('#deletePurchaseItem').querySelector('#deletePurchaseItemButton').querySelector('#checkIcon').style.display = 'none'

    //         previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'inline'
    //         previousItem.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#cancelIcon').style.display = 'none'
    //     }

    //     item.target.querySelector('#trashIcon').style.display = 'none'
    //     item.target.querySelector('#checkIcon').style.display = 'inline'

    //     item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#pencilIcon').style.display = 'none'
    //     item.target.parentElement.parentElement.querySelector('#editPurchaseItem').querySelector('#editPurchaseItemButton').querySelector('#cancelIcon').style.display = 'inline'

    //     setPurchaseIdInDeleteMode(item.target.parentElement.parentElement.id)
    //     setDeleteMode(true);
    // }














    const onEditPurchaseButtonClick = (item) => {
        if (item.target.id !== 'editPurchaseItemButton') {
            item = item.target.parentElement
        } else {
            item = item.target
        }
        let purchaseItem = item.parentElement.parentElement

        if (inDeleteMode && itemInDeleteMode === purchaseItem.id) {
            document.getElementById(purchaseItem.id).children[5].firstChild.children[0].style.display = 'inline'
            document.getElementById(purchaseItem.id).children[5].firstChild.children[2].style.display = 'none'

            document.getElementById(purchaseItem.id).children[6].firstChild.children[0].style.display = 'inline'
            document.getElementById(purchaseItem.id).children[6].firstChild.children[1].style.display = 'none'

            itemInDeleteMode = ''
            inDeleteMode = false
            return
        } else if (inDeleteMode) {
            let previousItem = document.getElementById(itemInDeleteMode)

            document.getElementById(previousItem.id).children[5].firstChild.children[0].style.display = 'inline'
            document.getElementById(previousItem.id).children[5].firstChild.children[2].style.display = 'none'

            document.getElementById(previousItem.id).children[6].firstChild.children[0].style.display = 'inline'
            document.getElementById(previousItem.id).children[6].firstChild.children[1].style.display = 'none'
            itemInDeleteMode = ''
            inDeleteMode = false
        }

        if (inEditMode && itemInEditMode === purchaseItem.id) {
            console.log("DONE WITH EDIT")

            document.getElementById(purchaseItem.id).children[5].firstChild.children[0].style.display = 'inline'
            document.getElementById(purchaseItem.id).children[5].firstChild.children[1].style.display = 'none'

            document.getElementById(purchaseItem.id).children[6].firstChild.children[0].style.display = 'inline'
            document.getElementById(purchaseItem.id).children[6].firstChild.children[2].style.display = 'none'

            purchaseItem.children[1].style.display = 'table-cell'
            purchaseItem.children[2].style.display = 'table-cell'
            purchaseItem.children[3].style.display = 'none'
            purchaseItem.children[4].style.display = 'none'

            itemInEditMode = ''
            inEditMode = false
            return
        } else if (inEditMode) {
            let previousItem = document.getElementById(itemInEditMode)

            document.getElementById(previousItem.id).children[5].firstChild.children[0].style.display = 'inline'
            document.getElementById(previousItem.id).children[5].firstChild.children[1].style.display = 'none'

            document.getElementById(previousItem.id).children[6].firstChild.children[0].style.display = 'inline'
            document.getElementById(previousItem.id).children[6].firstChild.children[2].style.display = 'none'

            previousItem.children[1].style.display = 'table-cell'
            previousItem.children[2].style.display = 'table-cell'
            previousItem.children[3].style.display = 'none'
            previousItem.children[4].style.display = 'none'

            itemInEditMode = ''
            inEditMode = false
        }

        document.getElementById(purchaseItem.id).children[5].firstChild.children[0].style.display = 'none'
        document.getElementById(purchaseItem.id).children[5].firstChild.children[1].style.display = 'inline'

        document.getElementById(purchaseItem.id).children[6].firstChild.children[0].style.display = 'none'
        document.getElementById(purchaseItem.id).children[6].firstChild.children[2].style.display = 'inline'

        purchaseItem.children[1].style.display = 'none'
        purchaseItem.children[2].style.display = 'none'
        purchaseItem.children[3].style.display = 'table-cell'
        purchaseItem.children[4].style.display = 'table-cell'

        itemInEditMode = purchaseItem.id
        inEditMode = true
    }

    const onDeletePurchaseButtonClick = (item) => {
        if (item.target.id !== 'deletePurchaseItemButton') {
            item = item.target.parentElement
        } else {
            item = item.target
        }
        let purchaseItem = item.parentElement.parentElement

        if (inEditMode && itemInEditMode === purchaseItem.id) {
            document.getElementById(purchaseItem.id).children[5].firstChild.children[0].style.display = 'inline'
            document.getElementById(purchaseItem.id).children[5].firstChild.children[1].style.display = 'none'

            document.getElementById(purchaseItem.id).children[6].firstChild.children[0].style.display = 'inline'
            document.getElementById(purchaseItem.id).children[6].firstChild.children[2].style.display = 'none'

            purchaseItem.children[1].style.display = 'table-cell'
            purchaseItem.children[2].style.display = 'table-cell'
            purchaseItem.children[3].style.display = 'none'
            purchaseItem.children[4].style.display = 'none'

            itemInEditMode = ''
            inEditMode = false
            return
        } else if (inEditMode) {
            let previousItem = document.getElementById(itemInEditMode)

            previousItem.children[5].firstChild.children[0].style.display = 'inline'
            previousItem.children[5].firstChild.children[1].style.display = 'none'

            previousItem.children[6].firstChild.children[0].style.display = 'inline'
            previousItem.children[6].firstChild.children[2].style.display = 'none'

            previousItem.children[1].style.display = 'table-cell'
            previousItem.children[2].style.display = 'table-cell'
            previousItem.children[3].style.display = 'none'
            previousItem.children[4].style.display = 'none'

            itemInEditMode = ''
            inEditMode = false
        }

        if (inDeleteMode && itemInDeleteMode === purchaseItem.id) {
            console.log("DONE WITH DELETION")

            document.getElementById(purchaseItem.id).children[5].firstChild.children[0].style.display = 'inline'
            document.getElementById(purchaseItem.id).children[5].firstChild.children[2].style.display = 'none'

            document.getElementById(purchaseItem.id).children[6].firstChild.children[0].style.display = 'inline'
            document.getElementById(purchaseItem.id).children[6].firstChild.children[1].style.display = 'none'

            itemInDeleteMode = ''
            inDeleteMode = false
            return
        } else if (inDeleteMode) {
            let previousItem = document.getElementById(itemInDeleteMode)

            previousItem.children[5].firstChild.children[0].style.display = 'inline'
            previousItem.children[5].firstChild.children[2].style.display = 'none'

            previousItem.children[6].firstChild.children[0].style.display = 'inline'
            previousItem.children[6].firstChild.children[1].style.display = 'none'

            itemInDeleteMode = ''
            inDeleteMode = false
        }

        document.getElementById(purchaseItem.id).children[5].firstChild.children[0].style.display = 'none'
        document.getElementById(purchaseItem.id).children[5].firstChild.children[2].style.display = 'inline'

        document.getElementById(purchaseItem.id).children[6].firstChild.children[0].style.display = 'none'
        document.getElementById(purchaseItem.id).children[6].firstChild.children[1].style.display = 'inline'

        itemInDeleteMode = purchaseItem.id
        inDeleteMode = true
    }

    const createOptionItem = (item) => {        
        let optionItem = document.createElement('option')
        optionItem.value = item.name
        optionItem.id = item._id
        optionItem.className = 'trackerListItem'
        optionItem.innerHTML = item.name
        document.getElementById('limitTrackerSelector').appendChild(optionItem)

        document.getElementById('currentPeriodMoneyLimit').innerHTML = '$' + item.limit
        document.getElementById('currentPeriodTimeLimit').innerHTML = item.period + ' ' + (item.period === 1 ? 'day' : 'days') 
        
        let startDate = item.startDate
        let endDate = new Date(startDate)
        endDate.setDate(endDate.getDate() + (item.period - 1))
        let currentDate = new Date()
        let timeLeft = endDate - currentDate

        dayCount = Math.trunc(timeLeft / 86400000)
        timeLeft %= 86400000
        hourCount = Math.trunc(timeLeft / 3600000)
        timeLeft %= 3600000
        minuteCount = Math.trunc(timeLeft / 60000)
        timeLeft %= 60000
        secondCount = Math.trunc(timeLeft / 1000)
        timeLeft %= 1000

        document.getElementById('timeLeft').innerHTML = dayCount + ':' + hourCount + ':' + minuteCount + ':' + secondCount
        setInterval(countdownTimer, 1000)
    }

    const countdownTimer = (item) => {
        secondCount--

        if (dayCount <= 0 && hourCount <= 0 && minuteCount <= 0 && secondCount <= 0) {            
            let startDate = item.startDate
            let endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() + (item.period - 1))
            let currentDate = new Date()
            let timeLeft = endDate - currentDate

            dayCount = Math.trunc(timeLeft / 86400000)
            timeLeft %= 86400000
            hourCount = Math.trunc(timeLeft / 3600000)
            timeLeft %= 3600000
            minuteCount = Math.trunc(timeLeft / 60000)
            timeLeft %= 60000
            secondCount = Math.trunc(timeLeft / 1000)
            timeLeft %= 1000
            document.getElementById('timeLeft').innerHTML = dayCount + ':' + hourCount + ':' + minuteCount + ':' + secondCount
            return
        }
        
        if (secondCount < 0 && (dayCount > 0 || hourCount > 0 || minuteCount > 0)) {
            minuteCount--   
            secondCount = 59
        }

        if (minuteCount < 0 && (dayCount > 0 || hourCount > 0)) {
            hourCount--
            minuteCount = 59
        }

        if (hourCount < 0 && dayCount > 0) {
            dayCount = 0
            hourCount = 23
        }

        document.getElementById('timeLeft').innerHTML = dayCount + ':' + hourCount + ':' + minuteCount + ':' + secondCount
    }

    const createPurchaseItem = (item) => {

        let purchaseItem = document.createElement('tr')
        purchaseItem.className = 'purchaseItem'
        purchaseItem.id = item._id

        let dateOfPurchaseCell = document.createElement('td')
        dateOfPurchaseCell.className = 'purchaseItemCell dateOfPurchase'
        dateOfPurchaseCell.innerHTML = item.date.substring(0, item.date.length - 4) + item.date.substring(item.date.length - 2)

        let purchaseReasonCell = document.createElement('td')
        purchaseReasonCell.className = 'purchaseItemCell purchaseReason purchaseViewMode'
        purchaseReasonCell.innerHTML = item.reason

        let amountSpentCell = document.createElement('td')
        amountSpentCell.className = 'purchaseItemCell moneySpentOnPurchase purchaseViewMode'
        amountSpentCell.innerHTML = '$' + item.amount

        let purchaseReasonCellEdit = document.createElement('td')
        purchaseReasonCellEdit.className = 'purchaseItemCell purchaseReason purchaseEditMode'
        let reasonEditInput = document.createElement('input')
        reasonEditInput.type = 'text'
        reasonEditInput.className = 'editInput'
        reasonEditInput.value = item.reason
        purchaseReasonCellEdit.appendChild(reasonEditInput)
        
        let amountSpentCellEdit = document.createElement('td')
        amountSpentCellEdit.className = 'purchaseItemCell moneySpentOnPurchase purchaseEditMode'
        let amountEditInput = document.createElement('input')
        amountEditInput.type = 'text'
        amountEditInput.className = 'editInput'
        amountEditInput.value = item.amount
        amountSpentCellEdit.appendChild(amountEditInput)

        let editPurchaseItemCell = document.createElement('td')
        editPurchaseItemCell.className = 'purchaseItemCell editPurchaseItem'
        editPurchaseItemCell.id = 'editPurchaseItem'
        let editPurchaseItemButton = document.createElement('button')
        editPurchaseItemButton.className = 'editPurchaseItemButton'
        editPurchaseItemButton.id = 'editPurchaseItemButton'
        editPurchaseItemButton.title = 'edit'
        editPurchaseItemButton.onclick = onEditPurchaseButtonClick
        let pencilIcon = document.createElement('i')
        pencilIcon.className = 'fa-solid fa-pencil pencilIcon'
        pencilIcon.id = 'pencilIcon'
        let checkIcon = document.createElement('i')
        checkIcon.className = 'fa-solid fa-check checkIcon' 
        checkIcon.id = 'checkIcon'
        let cancelIcon = document.createElement('i')
        cancelIcon.className = 'fa-solid fa-xmark cancelIcon' 
        cancelIcon.id = 'cancelIcon'
        editPurchaseItemButton.appendChild(pencilIcon)
        editPurchaseItemButton.appendChild(checkIcon)
        editPurchaseItemButton.appendChild(cancelIcon)
        editPurchaseItemCell.appendChild(editPurchaseItemButton)

        let deletePurchaseItemCell = document.createElement('td')
        deletePurchaseItemCell.className = 'purchaseItemCell deletePurchaseItem'
        deletePurchaseItemCell.id = 'deletePurchaseItem'
        let deletePurchaseItemButton = document.createElement('button')
        deletePurchaseItemButton.className = 'editPurchaseItemButton'
        deletePurchaseItemButton.id = 'deletePurchaseItemButton'
        deletePurchaseItemButton.title = 'delete'
        deletePurchaseItemButton.onclick = onDeletePurchaseButtonClick
        let trashIcon = document.createElement('i')
        trashIcon.className = 'fa-solid fa-trash trashIcon'
        trashIcon.id = 'trashIcon'
        let checkIcon2 = document.createElement('i')
        checkIcon2.className = 'fa-solid fa-check checkIcon' 
        checkIcon2.id = 'checkIcon'
        let cancelIcon2 = document.createElement('i')
        cancelIcon2.className = 'fa-solid fa-xmark cancelIcon' 
        cancelIcon2.id = 'cancelIcon'
        deletePurchaseItemButton.appendChild(trashIcon)
        deletePurchaseItemButton.appendChild(checkIcon2)
        deletePurchaseItemButton.appendChild(cancelIcon2)
        deletePurchaseItemCell.appendChild(deletePurchaseItemButton)

        purchaseItem.appendChild(dateOfPurchaseCell)
        purchaseItem.appendChild(purchaseReasonCell)
        purchaseItem.appendChild(amountSpentCell)
        purchaseItem.appendChild(purchaseReasonCellEdit)
        purchaseItem.appendChild(amountSpentCellEdit)
        purchaseItem.appendChild(editPurchaseItemCell)
        purchaseItem.appendChild(deletePurchaseItemCell)

        document.getElementById('currentPeriodPurchasesList').appendChild(purchaseItem)
    }

    useEffect(() => {
        if (!props.loggedIn) {
            navigate('/login', props)
        }

        if (!loaded) {
            fetch('/trackers/userSpecificTrackers/' + props.userId)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    console.log("NO TRACKERS")
                    return
                }

                res.forEach(item => createOptionItem(item))

                fetch('/purchase/trackerSpecificPurchases/' + res[0]._id)
                .then(res2 => res2.json())
                .then(res2 => {
                    res2.forEach(item => createPurchaseItem(item))
                })
                .then(() => {
                    console.log("DONE")
                    setLoaded(true)
                })
            })
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
                            {/* <option value="Tracker1" className='trackerListItem'>Tracker #1</option> */}
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
                            <span className="currentPeriodMoneyLimit" id='currentPeriodMoneyLimit'>$150</span>
                        </div>
                        <div className="timeLimitContainer">
                            <span className="limitText">Period:</span>
                            <span className="currentPeriodTimeLimit" id='currentPeriodTimeLimit'>2 weeks</span>
                        </div>
                    </div>

                    <div className="currentPeriodPurchasesListContainer" id='currentPeriodPurchasesListContainer'>
                        <table className="currentPeriodPurchasesList" id='currentPeriodPurchasesList'>
                            <tr className="currentPurchasesListHeader">
                                <th className="listHeader dateOfPurchaseTitle">Date</th>
                                <th className="listHeader purchaseReasonTitle">Reason</th>
                                <th className="listHeader moneySpentOnPurchaseTitle">Amount</th>
                                {/* <th className="listHeader editPurchaseItemTitle">
                                </th> */}
                            </tr>
                            {/* <tr className="purchaseItem" id='item1'>
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
                            </tr> */}
                        </table>
                    </div>

                    <div className="currentPeriodStatisticsContainer">
                        <div className="totalMoneySpentContainer">
                            <span className="leftText">Total Spent:</span>
                            <span className="currentPeriodMoneySpent">$120.33</span>
                        </div>
                        <div className="timeLeftInPeriodContainer">
                            <span className="leftText">Time Left:</span>
                            <span className="timeLeft" id='timeLeft'>2:14:5:3</span>
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
