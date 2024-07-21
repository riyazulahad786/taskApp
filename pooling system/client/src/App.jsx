// import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'; 
import './App.css'
import Register from './Components/Register';
import Login from './Components/Login';
import ForgotPassword from './Components/ForgotPassword';

function App() {

  return (
    <>
 <Router>
  <Routes>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/forgotPassword" element={<ForgotPassword/>}/>


  </Routes>
 </Router>
    </>
  )
}

export default App
