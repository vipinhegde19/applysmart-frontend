import { useState } from 'react'
import api from '../api'
import '../App.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handlelogin() {
    const formData = new FormData()
    formData.append('username', email)
    formData.append('password', password)
    try {
      const response = await api.post('/auth/login', formData)
      const token = response.data.access_token
      localStorage.setItem('token', token)
      window.location.href = '/dashboard'
    } catch (error) {
      alert('Invalid email or password')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">ApplySmart</div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your account</p>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="auth-btn" onClick={handlelogin}>
          Sign in
        </button>

        <div className="auth-footer">
          Don't have an account? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  )
}

export default Login