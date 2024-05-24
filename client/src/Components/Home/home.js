import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import './home.css'

export const Home = (props) => {

    const navigate = useNavigate()

    const onSignOutButtonClick = () => {
        navigate('/login')
    }

    return (
        <>
            <div className="headerContainer">
                <div className="headerWrapper">
                    <div className="siteTitle">OFC</div>
                    <div className="signOutButtonContainer">
                        <button className="signOutButton" onClick={onSignOutButtonClick}>Sign out</button>
                    </div>
                </div>
            </div>
            <div className="bodyContainer">
                <div className="bodyWrapper">
                    <div className="TrackItemsContainer">
                        <select name="Limit Tracker" id="LimitTrackerSelector" className="LimiTrackerSelector">
                            <option value="Tracker1">Tracker #1</option>
                        </select>
                        {/* <div className="limitTrackerTimePeriodHistoryContainer"> */}
                            <button className="limitTrackerTimePeriodHistoryButton"></button>
                        {/* </div> */}
                        {/* <div className="limitTrackerEditContainer"> */}
                            <button className="limitTrackerEditButton"></button>
                        {/* </div> */}
                    </div>

                    <div className="currentPeriodLimitStatisticsContainer">
                        <div className="moneyLimitContainer">
                            <span className="limitText"></span>
                            <span className="currentPeriodMoneyLimit"></span>
                        </div>
                        <div className="timeLimitContainer">
                            <span className="limitText"></span>
                            <span className="currentPeriodTimeLimit"></span>
                        </div>
                    </div>

                    <div className="currentPeriodPurchasesListContainer">
                        <ul className="currentPeriodPurchasesList">
                            <li className="purchaseItem">
                                <span className="dateOfPurchase"></span>
                                <span className="purchaseReason"></span>
                                <span className="moneySpendOnPurchase"></span>
                            </li>
                        </ul>
                    </div>

                    <div className="currentPeriodStatisticsContainer">
                        <div className="totalMoneySpentContainer">
                            <span className="totalText"></span>
                            <span className="currentPeriodMoneySpent"></span>
                        </div>
                        <div className="timeLeftInPeriodContainer">
                            <span className="timeLeftText"></span>
                            <span className="timeLeft"></span>
                        </div>
                        <div className="totalMoneyLeftContainer">
                            <span className="totalText"></span>
                            <span className="currentPeriodMoneyLeft"></span>
                        </div>
                    </div>

                    <div className="NewPurchaseAdderContainer">
                        <input type="text" className="itemPurchaseAmount" />
                        <input type="text" className="itemPurchaseReason" />
                        <button className="itemAddToListButton">Add</button>
                    </div>
                </div>
            </div>
            <div className="footerContainer">
                <div className="footerWrapper">

                </div>
            </div>
        </>
    )
}


{/* <div className="loginContainer">
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
            </div> */}
