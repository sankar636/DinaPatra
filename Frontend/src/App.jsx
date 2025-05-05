import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Start from './Pages/Start.jsx'
import Home from './Pages/Home.jsx'
import PrivateRoute from './Components/PrivateRoutes'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Start />} />

        <Route element={<PrivateRoute />}>
          <Route path='/home' element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App