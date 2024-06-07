import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './home.css'

export const Home = (props) => {
    const navigate = useNavigate()

    const onSignOutButtonClick = () => {
        navigate('/login')
    }

    const onProfileButtonClick = () => {
        navigate('/profile/' + props.userId, props)
    }

    useEffect(() => {
        if (!props.loggedIn) {
            navigate('/login')
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
                            <button className="limitTrackerTimePeriodHistoryButton"><i class="fa-solid fa-clock-rotate-left buttons" /></button>
                        {/* </div> */}
                        {/* <div className="limitTrackerEditContainer"> */}
                            <button className="limitTrackerEditButton"><i class="fa-solid fa-pencil buttons" /></button>
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

                    <div className="currentPeriodPurchasesListContainer">
                        <table className="currentPeriodPurchasesList">
                            <tr className="currentPurchasesListHeader">
                                <th className="listHeader dateOfPurchaseTitle">Date</th>
                                <th className="listHeader purchaseReasonTitle">Reason</th>
                                <th className="listHeader moneySpentOnPurchaseTitle">Amount</th>
                                <th className="listHeader editPurchaseItemTitle">
                                </th>
                            </tr>
                            <tr className="purchaseItem">
                                <td className="purchaseItemCell dateOfPurchase">5/1/24</td>
                                <td className="purchaseItemCell purchaseReason">Pizza Hut</td>
                                <td className="purchaseItemCell moneySpentOnPurchase">$24.50</td>
                                <td className="purchaseItemCell editPurchaseItem">
                                    <button className="editPurchaseItemButton" title="edit">
                                        <i class="fa-solid fa-pencil" />
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
