import { useState } from "react"
import api from "../api"
import '../App.css'
function Login() {
    const [eamil,setEmail]=useState('')
    const [password,setPassword]=useState('')
   async function handlelogin(){
        const formData=new FormData()
        formData.append('username',eamil)
        formData.append('password',password)
        try {
            const response=await api.post('/auth/login',formData)
            const token=response.data.access_token
            localStorage.setItem('token',token)
            window.location.href='/dashboard'
        } catch (error) {
            alert('Invalid email or password')
            
        }
    }
  return (
<div className="auth-container">
      <h1>Login to applysamrt</h1>
      <input 
      type="email"
      placeholder="Email"
      value={eamil}
      onChange={(e)=>setEmail(e.target.value)}
      />
      <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={handlelogin}>Login</button>
      <p>Don't have an account ?<a href="/register">Register</a></p>
    </div>

  )
}

export default Login
