// import { useState } from 'react'

import './App.css'
import {BrowserRouter as Router,Routes,Route}  from 'react-router-dom'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import Login from './Components/Login'
import Home from './Components/Home'
function App() {

  return (
    <>
    <Navbar/>
    <Router>
       <Routes>
         <Route path="/home" element={<Home/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/login" element={<Login/>}/>


       </Routes>
    </Router>
    </>
  )
}

export default App
