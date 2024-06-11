import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { About } from './Components/About/about'
import { Home } from './Components/Home/home'
import { Login } from './Components/Login/login'
import { Register } from './Components/Register/register'
import { Profile } from './Components/Profile/profile'
import { Tracker } from './Components/Tracker/tracker'

import './App.css'

function App() {
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ userId, setUserId ] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user || !user.token) {
      setLoggedIn(false)
      return
    }

    fetch('/verify', {
      method: 'POST',
      headers: {
        'jwt-token': user.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: user.username })
    })
    .then(r => r.json())
    .then(r => {
      if (r.message === 'success') {
        localStorage.setItem('user', JSON.stringify({ username: user.username, token: user.token, userId: r.user._id }))
        setUsername(username)
        setLoggedIn(true)
        setUserId(r.user._id)
      } else {
        setLoggedIn(false)
      }
      
    })
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <About/>} />
          <Route path='/home' element={ <Home 
            username = { username } 
            setUsername = { setUsername } 
            loggedIn = { loggedIn } 
            setLoggedIn = { setLoggedIn }
            userId = { userId }
            setUserId = { setUserId }
            /> } 
          />
          <Route path='/login' element={ <Login
            username = { username } 
            setUsername = { setUsername } 
            loggedIn = { loggedIn } 
            setLoggedIn = { setLoggedIn }
            userId = { userId }
            setUserId = { setUserId }
            />} 
          />
          <Route path='/register' element={ <Register
            username = { username } 
            setUsername = { setUsername } 
            loggedIn = { loggedIn } 
            setLoggedIn = { setLoggedIn }
            userId = { userId }
            setUserId = { setUserId }
            />} 
          />
          <Route path='/profile/:id' element={ <Profile
            username = { username } 
            setUsername = { setUsername } 
            loggedIn = { loggedIn } 
            setLoggedIn = { setLoggedIn }
            userId = { userId }
            setUserId = { setUserId }
            /> } 
          />
          <Route path='/tracker' element={ <Tracker
            username = { username } 
            setUsername = { setUsername } 
            loggedIn = { loggedIn } 
            setLoggedIn = { setLoggedIn }
            userId = { userId }
            setUserId = { setUserId }
            /> } 
          />
          <Route path='/tracker/:id' element={ <Tracker
            username = { username } 
            setUsername = { setUsername } 
            loggedIn = { loggedIn } 
            setLoggedIn = { setLoggedIn }
            userId = { userId }
            setUserId = { setUserId }
            /> } 
          />
          {/* <Route path='/trackerHistory/:id' element={ <TrackerHistory/> } /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
