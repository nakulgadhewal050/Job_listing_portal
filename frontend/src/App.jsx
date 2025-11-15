import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home';
export const serverUrl = "http://localhost:3000"


function App() {
  const {userData} = useSelector((state) => state.user);
  
  return (
    <>
      <Routes>
        <Route path='/signup' element={!userData ? <Signup/> : <Navigate to="/" />} />
        <Route path='/login' element={!userData ? <Login /> : <Navigate to="/" />} />
        <Route path='/' element={userData?<Home/>:<Navigate to={"/login"}/>}/>
      </Routes>
    </>
  )
}

export default App