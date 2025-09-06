import React, { useEffect, useState } from 'react'
import './styles/auth.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const VerifyOtp = () => {
  const [otp, setOtp] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const ApiUrl = import.meta.env.VITE_BACKEND_API_URI

  useEffect(() => {
    const storedEmail = localStorage.getItem('signUpEmail')
    if (storedEmail) {
      setEmail(storedEmail)
    } else {
      navigate('/signup') // redirect back if no email found
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${ApiUrl}/user/verify-otp`, {
        email,
        otp
      })
      console.log(res.data)
      alert("OTP Verified! 🎉")
      localStorage.removeItem("signUpEmail") // clear stored email
      navigate("/login") // redirect to login after verification
    } catch (err) {
      console.error("Error verifying OTP:", err.response?.data || err.message)
      alert(err.response?.data?.message || "Invalid OTP, please try again")
    }
  }

  return (
    <div className="authContainer">
      <form className="authForm" onSubmit={handleSubmit}>
        <h1>Verify OTP</h1>

        <p style={{ textAlign: "center", marginBottom: "15px", color: "#555" }}>
          We sent an OTP to <b>{email}</b>
        </p>

        <div className="row">
          <label>Enter your OTP</label>
          <input
            type="text"
            placeholder="Enter O-T-P"
            value={otp}
            maxLength={6}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Verify
        </button>

        <p className="resend">
          Didn’t get the code? <span style={{ cursor: "pointer", color: "#ff4e00" }}>Resend OTP</span>
        </p>
      </form>
    </div>
  )
}

export default VerifyOtp
