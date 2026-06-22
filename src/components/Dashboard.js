import { useState, useEffect } from 'react'
import axios from 'axios'
import '../App.css'

function Dashboard() {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    fetchJobs()
  }, [])

  async function fetchJobs() {
    const token = localStorage.getItem('token')
    if (!token) {
      window.location.href = '/login'
      return
    }
    try {
      const response = await axios.get('http://localhost:8000/jobs/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setJobs(response.data)
    } catch (error) {
      window.location.href = '/login'
    }
  }
  async function handleStatusUpdate(jobId, newStatus) {
    const token = localStorage.getItem('token')
    try {
        await axios.put(`http://localhost:8000/jobs/${jobId}`, 
            { status: newStatus },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        fetchJobs()
    } catch (error) {
        alert('Failed to update status')
    }
}
async function handleDelete(jobId) {
    const token = localStorage.getItem('token')
    try {
        await axios.delete(`http://localhost:8000/jobs/${jobId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        fetchJobs()  // refresh the list
    } catch (error) {
        alert('Failed to delete job')
    }
}

  function handleLogout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

 return (
  <div>
    <div className="navbar">
      <h2>ApplySmart</h2>
      <div>
        <a href="/add-job">+ Add Job</a>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
    <div className="container">
      <h1>My Job Applications</h1>
      {jobs.length === 0 ? (
        <p>No jobs added yet.</p>
      ) : (
        jobs.map((job) => (
          <div className="card" key={job.id}>
            <div>
              <h3>{job.company}</h3>
              <p>{job.role}</p>
            </div>
            <div>
              <select
                value={job.status}
                onChange={(e) => handleStatusUpdate(job.id, e.target.value)}
              >
                <option>Applied</option>
                <option>Interview Scheduled</option>
                <option>Rejected</option>
                <option>Offer Received</option>
              </select>
              <button
                className="delete-btn"
                onClick={() => handleDelete(job.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
)
}

export default Dashboard