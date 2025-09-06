import React, { useState } from 'react'
import axios from 'axios'
import './styles/auth.css'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
     const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert('Password must be at least 8 characters long, include a number and a special character.');
    return;
  }
    try {
      setLoading(true)
      const res = await axios.post(`${ApiUrl}/user/register`, {
        username,
        email,
        password,
        fullName
      })
      setMessage(res.data.message)
      alert('Otp sent to your Email')
      localStorage.setItem("signUpEmail",email)
      navigate('/verify-otp')
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error during sign up')
      console.error('Error during sign up:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="authContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

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
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Signing you in...' : 'Sign Up'}
        </button>

        {message && <p style={{ textAlign: 'center', marginTop: '10px' }}>{message}</p>}
      </form>
    </div>
  )
}

export default SignUp
