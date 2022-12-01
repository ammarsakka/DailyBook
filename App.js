import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Company } from './pages/Company'
import { Dashboard } from './pages/Dashboard'
import { Home } from './pages/Home'
import { Sign } from './pages/Sign'
import { SignOut } from './pages/SignOut'

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Sign />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/:page' element={<Dashboard />} />
        <Route path='/dashboard/:page/:companyPage' element={<Company />} />
        <Route path='/dashboard/:page/:companyPage/:companyToken' element={<Company />} />
        <Route path='/sign-out' element={<SignOut />} />
      </Routes>
    </BrowserRouter>
  )
}