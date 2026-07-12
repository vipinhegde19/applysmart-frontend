import { useState } from 'react'
import api from '../api'
import '../App.css'

function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleRegister() {
    try {
      await api.post('/auth/register', {
        name: name,
        email: email,
        password: password
      })
      alert('Registered successfully! Please login.')
      window.location.href = '/login'
    } catch (error) {
      alert('Registration failed. Email may already exist.')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">ApplySmart</div>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start tracking your job applications</p>

        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button className="auth-btn" onClick={handleRegister}>
          Create account
        </button>

        <div className="auth-footer">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  )
}

export default Register