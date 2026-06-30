import { useState, useEffect } from 'react'
import api from '../api'
import '../App.css'

function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFeature, setActiveFeature] = useState('')

  const [activeJob, setActiveJob] = useState(null)
  const [resumeBullets, setResumeBullets] = useState('')
  const [aiOutput, setAiOutput] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

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
      const response = await api.get(
        '/jobs/',
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setJobs(response.data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleTailorResume(jobId) {
    const token = localStorage.getItem('token')
    console.log("Token for AI:", token)  // add this
    console.log("Job ID:", jobId)
    setAiLoading(true)
    setAiOutput('')
    try {
      const response = await api.post(
        `/jobs/${jobId}/tailor-resume`,
        { resume_bullets: resumeBullets },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setAiOutput(response.data.tailored_resume)
    } catch (error) {
      console.error('Error tailoring resume:', error.response?.data || error.message)
      alert(error.response?.data?.detail || "Failed to fetch resume")

    } finally {
      setAiLoading(false)
    }

  }

  async function handleInterviewPrep(jobId) {
    const token = localStorage.getItem('token')
    setAiLoading(true)
    setAiOutput('')
    try {
      const response = await api.post(
        `/jobs/${jobId}/interview_questions`,
        { resume_bullets: resumeBullets },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      setAiOutput(response.data["Interview Questions"])
    } catch (error) {
      console.error('Error preparing interview questions:', error.response?.data || error.message)
      alert(error.response?.data?.detail || "Failed to prepare interview questions")
    } finally {
      setAiLoading(false)
    }
  }

  async function handleDelete(jobId) {
    const token = localStorage.getItem('token')
    try {
      await api.delete(
        `/jobs/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      fetchJobs()
    } catch (error) {
      alert('Failed to delete job')
    }
  }

  async function handleStatusUpdate(jobId, newStatus) {
    const token = localStorage.getItem('token')
    try {
      await api.put(
        `/jobs/${jobId}`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      fetchJobs()
    } catch (error) {
      alert('Failed to update status')
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Loading your jobs...</h2>
    </div>
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
          <p>No jobs added yet. Click Add Job to start tracking.</p>
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

              {/* AI Buttons */}
              <div style={{ width: '100%', marginTop: '10px' }}>
                <button
                  onClick={() => {
                    setActiveJob(activeJob === job.id ? null : job.id)
                    setActiveFeature('tailor')
                    setAiOutput('')
                  }}
                  style={{ backgroundColor: '#7c3aed', marginRight: '10px' }}
                >
                  🤖 Tailor Resume
                </button>
                <button
                  onClick={() => {
                    setActiveJob(activeJob === job.id ? null : job.id)
                    setActiveFeature('interview')
                    setAiOutput('')
                  }}
                  style={{ backgroundColor: '#0891b2', marginLeft: '10px' }}
                >
                  📝 Interview Prep
                </button>
              </div>

              {/* AI Panel */}
              {activeJob === job.id && (
                <div style={{ width: '100%', marginTop: '15px' }}>
                  <textarea
                    placeholder="Paste your resume bullets here..."
                    value={resumeBullets}
                    onChange={(e) => setResumeBullets(e.target.value)}
                    style={{ width: '100%', height: '100px', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                  />
  <button
    onClick={() => {
        if (activeFeature === 'tailor') {
            handleTailorResume(job.id)
        } else {
            handleInterviewPrep(job.id)
        }
    }}
    disabled={aiLoading}
    style={{backgroundColor: '#7c3aed', marginTop: '10px'}}
>
    {aiLoading ? 'Generating...' : 'Generate'}
</button>
                  {aiOutput && (
                    <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#f0f4ff', borderRadius: '8px' }}>
                      <h4>Tailored Resume Bullets:</h4>
                      <p style={{ whiteSpace: 'pre-wrap' }}>{aiOutput}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Dashboard
