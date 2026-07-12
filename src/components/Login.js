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