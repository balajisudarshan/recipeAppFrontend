import React from 'react'
import Hero from './components/Hero'
import NavBar from './components/NavBar'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import AllRecipes from './pages/AllRecipes'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import VerifyOtp from './pages/VerifyOtp'
import Dashboard from './pages/Dashboard'
import AddRecipe from './pages/AddRecipe'
import DetailedRecipe from './pages/DetailedRecipe'
import AboutPage from './pages/AboutPage'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    if (token && storedUser) {
      setIsLoggedIn(true)
      try {
        const user = JSON.parse(storedUser)
        setUsername(user.username || 'Unknown')
      } catch (error) {
        console.log("Failed to parse")
      }
    }
  }, [])
  return (
    <>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} username={username} setUsername={setUsername} />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/allRecipes' element={<AllRecipes />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}  setUsername = {setUsername}/>} />
        <Route path='/verify-otp' element={<VerifyOtp />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/addRecipe' element={<AddRecipe/>}/>
        <Route path='/recipes/:id' element={<DetailedRecipe/>}/>
        <Route path='/about' element={<AboutPage/>}/>
      </Routes>
    </>
  )
}

export default App