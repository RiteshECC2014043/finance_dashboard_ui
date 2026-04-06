import React, { useState } from 'react';
import Dashboard from './Dashboard';
import './app.css';

function App() {
  // States for Authentication and Role
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');

  // Login Function
  const handleLogin = (e) => {
    e.preventDefault();
    if (username.toLowerCase() === 'admin' && password === 'admin123') {
      setRole('Admin');
      setIsLoggedIn(true);
    } else if (username !== '' && password !== '') {
      setRole('User');
      setIsLoggedIn(true);
    } else {
      alert("Please enter valid credentials!");
    }
  };

  // Forgot Password Function
  const handleForgotPassword = () => {
    const email = prompt("Please enter your registered email to reset password:");
    if (email) {
      alert("A password reset link has been sent to: " + email);
    }
  };

  // Logout Function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        /* --- 1. Login Screen Section --- */
        <div className="login-container">
          <div className="login-card">
            <h1 style={{ color: '#6366f1', marginBottom: '10px' }}>FinancePro</h1>
            <p style={{ color: '#64748b', marginBottom: '20px' }}>Sign in to your dashboard</p>
            
            <form onSubmit={handleLogin}>
              <div style={{ textAlign: 'left', marginBottom: '15px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Username</label>
                <input 
                  type="text" 
                  placeholder="e.g. admin or ritesh" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="login-input"
                  required
                />
              </div>

              <div style={{ textAlign: 'left', marginBottom: '5px' }}>
                <label style={{ fontSize: '14px', fontWeight: 'bold' }}>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  required
                />
              </div>

              {/* --- FORGOT PASSWORD OPTION ADDED --- */}
              <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                <button 
                  type="button" 
                  onClick={handleForgotPassword}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#6366f1', 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    cursor: 'pointer',
                    padding: '0'
                  }}
                >
                  Forgot Password?
                </button>
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
            </form>
            <p style={{ fontSize: '12px', marginTop: '15px', color: '#94a3b8' }}>
              Hint: Use 'admin' as username for full access.
            </p>
          </div>
        </div>
      ) : (
        /* --- 2. Dashboard Section (Logged In) --- */
        <>
          <nav className="top-nav">
            <div className="nav-brand">FinancePro</div>
            <div className="nav-user">
              <span>Welcome, <b>{username}</b> <small>({role})</small></span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          </nav>

          {/* Role ko Dashboard component mein bhej rahe hain */}
          <Dashboard role={role} />
        </>
      )}
    </div>
  );
}

export default App;