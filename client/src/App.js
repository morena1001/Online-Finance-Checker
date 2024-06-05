import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { About } from './Components/About/about'
import { Home } from './Components/Home/home'
import { Login } from './Components/Login/login'
import { Register } from './Components/Register/register'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <About/>} />
          <Route path='/home' element={ <Home/>} />
          <Route path='/login' element={ <Login/>} />
          <Route path='/register' element={ <Register/>} />
          {/* <Route path='/profile/:id' element={ <Profile/> } /> */}
          {/* <Route path='/tracker/:id' element={ <Tracker/> } /> */}
          {/* <Route path='/trackerHistory/:id' element={ <TrackerHistory/> } /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
