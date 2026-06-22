import { useState } from 'react'
import axios from 'axios'
import '../App.css'

function AddJob() {
  const [company, setCompany] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('Applied')
  const [jobDescription, setJobDescription] = useState('')
  const [notes, setNotes] = useState('')

  async function handleSubmit() {
    const token = localStorage.getItem('token')
    console.log("Token:", token)
    const jobData = {
      company: company,
      role: role,
      status: status,
      job_description: jobDescription,
      notes: notes
    }
    try {
      await axios.post('http://localhost:8000/jobs/', jobData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      alert("Job added successfully")
      window.location.href = '/dashboard'
    } catch (error) {
      alert('Failed to add job')
    }
  }

  return (
  <div className="auth-container">
      <h1>Add Job to ApplySmart</h1>

      <input
        type="text"
        placeholder="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <input
        type="text"
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      />

      <input
        type="text"
        placeholder="Job Description"
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
      />

      <input
        type="text"
        placeholder="Notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

    <button onClick={handleSubmit}>Add Job</button>
    <p style={{marginTop: '15px', textAlign: 'center'}}>
      <a href="/dashboard">Back to Dashboard</a>
    </p>
    </div>
  )
}

export default AddJob