return (
    <div className="add-job-wrapper">
      <div style={{marginBottom: '32px'}}>
        <a href="/dashboard" style={{color: '#697386', fontSize: '14px', textDecoration: 'none'}}>
          ← Back to Dashboard
        </a>
      </div>

      <h1 className="page-title">Add New Application</h1>
      <p className="page-subtitle">Track a new job you've applied to.</p>

      <div style={{background: 'white', border: '1px solid #e3e8ee', borderRadius: '12px', padding: '32px'}}>
        <div className="form-group">
          <label className="form-label">Company Name</label>
          <input
            type="text"
            placeholder="e.g. Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Role</label>
          <input
            type="text"
            placeholder="e.g. Backend Developer"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <input
            type="text"
            placeholder="Applied"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Job Description</label>
          <textarea
            placeholder="Paste the job description here — the AI will use this for resume tailoring and interview prep"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            style={{minHeight: '120px'}}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Notes</label>
          <input
            type="text"
            placeholder="Any notes about this application"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button className="auth-btn" onClick={handleSubmit}>
          Save Application
        </button>
      </div>
    </div>
  )