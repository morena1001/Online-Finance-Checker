import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Home } from './Components/Home/home'

import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <Home/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
