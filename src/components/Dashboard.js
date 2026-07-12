import { useState, useEffect } from 'react'
import api from '../api'
import '../App.css'

function Dashboard() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeJob, setActiveJob] = useState(null)
  const [activeFeature, setActiveFeature] = useState('')
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
      const response = await api.get('/jobs/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setJobs(response.data)
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(jobId) {
    const token = localStorage.getItem('token')
    try {
      await api.delete(`/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchJobs()
    } catch (error) {
      alert('Failed to delete job')
    }
  }

  async function handleStatusUpdate(jobId, newStatus) {
    const token = localStorage.getItem('token')
    try {
      await api.put(`/jobs/${jobId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchJobs()
    } catch (error) {
      alert('Failed to update status')
    }
  }

  async function handleTailorResume(jobId) {
    const token = localStorage.getItem('token')
    setAiLoading(true)
    setAiOutput('')
    try {
      const response = await api.post(
        `/jobs/${jobId}/tailor-resume`,
        { resume_bullets: resumeBullets },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAiOutput(response.data.tailored_resume)
    } catch (error) {
      console.error('Error tailoring resume:', error.response?.data || error.message)
      alert(error.response?.data?.detail || 'Failed to tailor resume')
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
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setAiOutput(response.data["Interview Questions"])
    } catch (error) {
      console.error('Error preparing interview questions:', error.response?.data || error.message)
      alert(error.response?.data?.detail || 'Failed to prepare interview questions')
    } finally {
      setAiLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  if (loading) {
    return (
      <div className="loading-wrapper">
        <p>Loading your applications...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="navbar">
        <h2>ApplySmart</h2>
        <div className="navbar-actions">
          <a href="/add-job">+ Add Job</a>
          <button className="btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="container">
        <p className="page-title">My Applications</p>
        <p className="page-subtitle">Track and manage all your job applications in one place.</p>

        {jobs.length === 0 ? (
          <div className="empty-state">
            <h3>No applications yet</h3>
            <p>Add your first job application to get started.</p>
            <a href="/add-job">
              <button className="btn-primary">+ Add Job</button>
            </a>
          </div>
        ) : (
          jobs.map((job) => (
            <div className="card" key={job.id}>
              <div className="card-header">
                <div className="card-info">
                  <h3>{job.company}</h3>
                  <p>{job.role}</p>
                </div>
                <div className="card-actions">
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusUpdate(job.id, e.target.value)}
                  >
                    <option>Applied</option>
                    <option>Interview Scheduled</option>
                    <option>Rejected</option>
                    <option>Offer Received</option>
                  </select>
                  <button className="btn-ai" onClick={() => {
                    setActiveJob(activeJob === job.id ? null : job.id)
                    setActiveFeature('tailor')
                    setAiOutput('')
                  }}>
                    🤖 Tailor Resume
                  </button>
                  <button className="btn-ai" onClick={() => {
                    setActiveJob(activeJob === job.id ? null : job.id)
                    setActiveFeature('interview')
                    setAiOutput('')
                  }}>
                    📝 Interview Prep
                  </button>
                  <button className="btn-danger" onClick={() => handleDelete(job.id)}>
                    Delete
                  </button>
                </div>
              </div>

              {activeJob === job.id && (
                <div className="ai-panel">
                  <p className="ai-panel-label">
                    {activeFeature === 'tailor' ? '🤖 AI Resume Tailor' : '📝 Interview Prep'}
                  </p>
                  <textarea
                    placeholder="Paste your resume bullets here..."
                    value={resumeBullets}
                    onChange={(e) => setResumeBullets(e.target.value)}
                  />
                  <button
                    className="btn-primary"
                    style={{ marginTop: '10px' }}
                    onClick={() => {
                      if (activeFeature === 'tailor') handleTailorResume(job.id)
                      else handleInterviewPrep(job.id)
                    }}
                    disabled={aiLoading}
                  >
                    {aiLoading ? 'Generating...' : 'Generate'}
                  </button>

                  {aiOutput && (
                    <div className="ai-output">
                      <p className="ai-output-label">
                        {activeFeature === 'tailor' ? 'Tailored Resume Bullets' : 'Interview Questions'}
                      </p>
                      <p className="ai-output-text">{aiOutput}</p>
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