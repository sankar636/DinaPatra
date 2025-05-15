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
import  store  from './store/store.js'; // Import the store


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentUser = store.getState().auth.currentUser;

    if (token && !currentUser) {
      axios
        .get(`${import.meta.env.VITE_BASE_URL}/user/getuser`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          dispatch(signIn(res.data.user)); // Update Redux state with user data
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          localStorage.removeItem("token"); // Clear token if invalid
          dispatch(signOut()); // Clear Redux state
        });
    }
  }, []); // Ensure Redux state is initialized on app load

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