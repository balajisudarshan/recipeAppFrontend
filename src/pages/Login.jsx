import React, { useState } from 'react'
import axios from 'axios'
import './styles/auth.css'
import { useNavigate } from 'react-router-dom'

const Login = ({ setIsLoggedIn, setUsername }) => {
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setIsLoading] = useState(false)
  const [alert, setAlert] = useState({ type: '', message: '' })

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setAlert({ type: '', message: '' })

    try {
      const res = await axios.post(`${ApiUrl}/user/login`, {
        email,
        password,
      })

      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setIsLoggedIn(true)
      setUsername(res.data.user.username)

      setAlert({ type: 'success', message: 'Login successful! Redirecting...' })

      setTimeout(() => navigate('/'), 1500) // delay so user sees the message
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || 'Login failed. Please try again.'
      setAlert({ type: 'error', message: errorMessage })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="authContainer">
      <form className="authForm" onSubmit={handleLogin}>
        <h1>Login</h1>

        {/* Alert box */}
        {alert.message && (
          <div
            className={`alert ${
              alert.type === 'success' ? 'alert-success' : 'alert-error'
            }`}
          >
            {alert.message}
          </div>
        )}

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
