import React, { useState } from 'react'
import axios from 'axios'
import './styles/auth.css'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ type: '', message: '' })

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setAlert({ type: '', message: '' })

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/

    if (!passwordRegex.test(password)) {
      setAlert({
        type: 'error',
        message:
          'Password must be at least 8 characters, include a number and a special character.',
      })
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${ApiUrl}/user/register`, {
        username,
        email,
        password,
        fullName,
      })

      setAlert({
        type: 'success',
        message: res.data.message || 'Signup successful!',
      })

      // Save token & user info
      localStorage.setItem('token', res.data.token)
      localStorage.setItem(
        'user',
        JSON.stringify({ username, email, fullName })
      )

      // Redirect after short delay
      setTimeout(() => {
        navigate('/') // Redirect to homepage or dashboard
      }, 1500)
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Error during signup',
      })
      
      console.error('Error during signup:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="authContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        {/* Alert */}
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
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="row">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Choose a username"
            required
          />
        </div>

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
            placeholder="Create a strong password"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Signing you up...' : 'Sign Up'}
        </button>
        <p>Already Registered?  <Link to='/login'>Login Here</Link></p>
      </form>
    </div>
  )
}

export default SignUp
