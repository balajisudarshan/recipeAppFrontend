import React, { useState } from 'react'
import axios from 'axios'
import './styles/auth.css'
import { useNavigate } from 'react-router-dom'
const Login = ({setIsLoggedIn,setUsername}) => {
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await axios.post(`${ApiUrl}/user/login`, {
        email,
        password
      })
      console.log('Login successful', res.data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setIsLoggedIn(true)
      setUsername(res.data.user.username)
      console.log(res.data.token)
      navigate('/')
    } catch (err) {
      console.error('Login failed', err.response?.data || err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="authContainer">
      <form className="authForm" onSubmit={handleLogin}>
        <h1>Login</h1>

        <div className="row">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="row">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login
