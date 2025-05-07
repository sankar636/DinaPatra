import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Start from './Pages/Start.jsx'
import Home from './Pages/Home.jsx'
import PrivateRoute from './Components/PrivateRoutes'
import Login from './Pages/Login.jsx'
import SignUp from './Pages/SignUp.jsx'


const App = () => {
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