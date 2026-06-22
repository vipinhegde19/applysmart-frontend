import { useState } from "react"
import axios from "axios"
import '../App.css'

function Register() {
  const [name,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  async function handleRegister() {
    try {
      await axios.post('http://localhost:8000/auth/register',{
        name:name,
        email:email,
        password:password
      })
      alert('Registered Sucessfully. Please Login. ')
      window.location.href='/login'
    } catch (error) {
      alert('Registration failed email already exists.')
      
    }
    
  }
  return (
<div className="auth-container">

      <h1>Register for applysamrt</h1>
      <input
      type="text"
      placeholder="Fullname"
      value={name}
      onChange={(e)=>setName(e.target.value)}
      />
      <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      
      />
      <input
      type="password"
      placeholder="Password"
      value={password}

      onChange={(e)=>setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>
        Register
      </button>
      <p>Already have a account?<a href="/login">Login</a></p>
    </div>
  )
}

export default Register