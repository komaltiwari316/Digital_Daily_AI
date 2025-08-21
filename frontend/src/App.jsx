import React from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signupform from './Froms/Signupform';
import MainBody from './MainBody';
import LoginForm from './Froms/LoginForm';
import DD from './DD';
import Ai from './Ai/Ai';





function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainBody />} />
        <Route path="/signup" element={<Signupform />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/DDPage' element={<DD />} />
        <Route path='/aiassistant' element={<Ai/>}/>
      </Routes>
    </>
  )
}

export default App




