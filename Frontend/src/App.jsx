import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import axios from 'axios'

import Start from './Pages/Start.jsx'
import Home from './Pages/Home.jsx'
import PrivateRoute from './Components/PrivateRoutes.jsx'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'
import { signIn, signOut } from "./store/authSlice.js";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/getuser`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(signIn(res.data.user));
        })
        .catch(() => {
          localStorage.removeItem("token");
          dispatch(signOut());
        });
    }
  }, []); // this useEffect part is same as a OritectedWraooer (in MoCab)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />

        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App