import React, { useState } from 'react';
import Summarycard from './Summarycard.js';
import './Dashboard.css';

const Dashboard = ({ role }) => {
  // --- 1. Common State Management ---
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // --- DARK MODE & USER FILTERS STATE ---
  const [darkMode, setDarkMode] = useState(false);
  const [userCatFilter, setUserCatFilter] = useState('All Categories');
  const [userDateFilter, setUserDateFilter] = useState('');

  // --- 2. Admin Specific Data ---
  const [users, setUsers] = useState([
    { id: 1, name: 'Ritesh', email: 'ritesh@example.com', status: 'Verified', role: 'User', lastLogin: '2026-04-05' },
    { id: 2, name: 'Aman', email: 'aman@example.com', status: 'Pending', role: 'User', lastLogin: '2026-04-04' },
    { id: 3, name: 'Sita', email: 'sita@example.com', status: 'Verified', role: 'Admin', lastLogin: '2026-04-06' },
  ]);

  const [allTransactions, setAllTransactions] = useState([
    { id: 101, user: 'Ritesh', date: '2026-04-01', amount: 5000, type: 'Income', status: 'Completed' },
    { id: 102, user: 'Aman', date: '2026-04-02', amount: 800, type: 'Expense', status: 'Pending' },
    { id: 103, user: 'Sita', date: '2026-04-03', amount: 1500, type: 'Expense', status: 'Rejected' },
    { id: 104, user: 'Ritesh', date: '2026-04-05', amount: 2000, type: 'Income', status: 'Refunded' },
  ]);

  // --- 3. User Specific Data ---
  const [userTransactions] = useState([
    { id: 1, date: '2026-04-01', amount: 5000, category: 'Salary', type: 'income' },
    { id: 2, date: '2026-04-02', amount: 800, category: 'Food', type: 'expense' },
    { id: 3, date: '2026-04-03', amount: 1500, category: 'Travel', type: 'expense' },
    { id: 4, date: '2026-04-04', amount: 450, category: 'Freelance', type: 'income' },
    { id: 5, date: '2026-04-05', amount: 300, category: 'Food', type: 'expense' },
  ]);

  // --- 4. Logic Handlers ---
  const filteredUserTransactions = userTransactions.filter(t => {
    const matchesDate = !userDateFilter || t.date === userDateFilter;
    const matchesCat = userCatFilter === 'All Categories' || t.category === userCatFilter;
    return matchesDate && matchesCat;
  });

  const calculateCategoryTotal = (cat) => {
    return userTransactions
      .filter(t => t.category === cat && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const filteredAdminTransactions = allTransactions.filter(t => {
    const matchesSearch = t.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || t.status === filterStatus;
    const matchesDate = !filterDate || t.date === filterDate;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setAllTransactions(allTransactions.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  // --- NEW: About Us Section Component ---
  const AboutContent = () => (
    <div className="about-section" style={{ padding: '20px' }}>
      <div className="table-card" style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '10px' }}>FinancePro</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '30px' }}>Empowering your financial journey with smart tracking.</p>
        
        <div className="card-grid">
          <div className="cat-card">
            <h3>Our Mission</h3>
            <p>To provide a simple yet powerful platform for tracking every penny.</p>
          </div>
          <div className="cat-card">
            <h3>Secure Data</h3>
            <p>Your financial information is encrypted and private.</p>
          </div>
          <div className="cat-card">
            <h3>Smart Analysis</h3>
            <p>Get detailed insights into your spending habits instantly.</p>
          </div>
        </div>
        
        <div style={{ marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
  <p><b>Developed by:</b> Ritesh Maurya</p>
  
  {/*  Email aur Phone option */}
  <p><b>Email:</b> <a href="mailto:ritesh@example.com" style={{ color: 'var(--primary)', textDecoration: 'none' }}>ritesh@example.com</a></p>
  <p><b>Phone:</b> <a href="tel:+919305940933" style={{ color: 'var(--primary)', textDecoration: 'none' }}>+91 9305940933</a></p>
  
  <p style={{ marginTop: '10px' }}><b>Version:</b> 1.0.0 (Stable Build)</p>
</div>
      </div>
    </div>
  );

  // ==============================
  // ADMIN VIEW RENDER
  // ==============================
  if (role === 'Admin') {
    return (
      <div className={`admin-layout ${darkMode ? 'dark-theme' : ''}`}>
        <aside className="admin-sidebar">
          <div className="sidebar-brand">Admin Console</div>
          <nav className="sidebar-nav">
            <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>📊 Overview</button>
            <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>👥 Users</button>
            <button className={activeTab === 'transactions' ? 'active' : ''} onClick={() => setActiveTab('transactions')}>💸 Transactions</button>
            <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>🛡️ Security Logs</button>
            {/* Added About Us Button for Admin */}
            <button className={activeTab === 'about' ? 'active' : ''} onClick={() => setActiveTab('about')}>ℹ️ About Us</button>
            
            <button className="theme-switch" onClick={toggleTheme} style={{marginTop: 'auto', background: darkMode ? '#6366f1' : '#334155', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer'}}>
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </nav>
        </aside>

        <main className="admin-main">
          <header className="admin-header">
            <h2>{activeTab.toUpperCase()}</h2>
            <div className="admin-profile">Welcome, <b>{role}</b></div>
          </header>

          {activeTab === 'about' && <AboutContent />}

          {activeTab === 'overview' && (
            <div className="tab-content">
              <div className="card-grid">
                <Summarycard title="Total Users" amount={users.length} />
                <Summarycard title="Active Transactions" amount={allTransactions.length} />
                <Summarycard title="Pending Verifications" amount={users.filter(u => u.status === 'Pending').length} />
                <Summarycard title="Daily Revenue" amount="12,450" />
              </div>
              <div className="recent-activity-box">
                <h3>System Status</h3>
                <p>🟢 All systems operational. Last backup: 2 hours ago.</p>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="table-container">
              <div className="table-header"><h3>User List</h3><button className="add-btn">+ Add New User</button></div>
              <table className="data-table">
                <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.name}</td><td>{user.email}</td><td>{user.role}</td>
                      <td><span className={`status-pill ${user.status.toLowerCase()}`}>{user.status}</span></td>
                      <td className="actions">
                        <button className="edit-link">Edit</button>
                        <button className="delete-link" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="table-container">
              <div className="filter-row">
                <input type="text" placeholder="Search User..." onChange={(e) => setSearchTerm(e.target.value)} />
                <input type="date" onChange={(e) => setFilterDate(e.target.value)} />
                <select onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="All">All Status</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>
              <table className="data-table">
                <thead><tr><th>ID</th><th>User</th><th>Date</th><th>Amount</th><th>Status</th><th>Control</th></tr></thead>
                <tbody>
                  {filteredAdminTransactions.map(t => (
                    <tr key={t.id}>
                      <td>#{t.id}</td><td>{t.user}</td><td>{t.date}</td>
                      <td className={t.type === 'Income' ? 'income-txt' : 'expense-txt'}>₹{t.amount}</td>
                      <td><span className={`status-pill ${t.status.toLowerCase()}`}>{t.status}</span></td>
                      <td className="actions">
                        <button onClick={() => handleStatusChange(t.id, 'Refunded')}>Refund</button>
                        <button className="reject-btn" onClick={() => handleStatusChange(t.id, 'Rejected')}>Reject</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="logs-container">
              <h3>Activity Logs</h3>
              <div className="log-item">🕒 10:45 AM - <b>Admin</b> deleted user #2</div>
              <div className="log-item danger">🕒 08:15 AM - Failed login attempt detected</div>
            </div>
          )}
        </main>
      </div>
    );
  }

  // ==============================
  // USER VIEW RENDER
  // ==============================
  return (
    <div className={`user-dashboard ${darkMode ? 'dark-theme' : ''}`}>
      <nav className="user-nav">
        <div className="logo">MyFinance</div>
        <div className="nav-links">
          <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'active' : ''}>Overview</button>
          <button onClick={() => setActiveTab('transactions')} className={activeTab === 'transactions' ? 'active' : ''}>Transactions</button>
          <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>About Us</button>
          <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'active' : ''}>Settings</button>
          
          <button className="theme-toggle-nav" onClick={toggleTheme} style={{cursor: 'pointer', border:'none', background:'none', fontSize:'1.2rem', marginLeft: '15px'}}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <main className="content">
        {activeTab === 'about' && <AboutContent />}

        {activeTab === 'overview' && (
          <div className="overview-section">
            <div className="balance-card">
              <small>Current Balance</small>
              <h1>₹2,850</h1>
              <div className="mini-stats">
                <span>Income: +₹5,450</span>
                <span>Expense: -₹2,600</span>
              </div>
            </div>
            <div className="expense-tracking">
              <h3>Expense Tracking (Category-wise)</h3>
              <div className="category-grid">
                <div className="cat-card">🍔 Food: <b>₹{calculateCategoryTotal('Food')}</b></div>
                <div className="cat-card">✈️ Travel: <b>₹{calculateCategoryTotal('Travel')}</b></div>
                <div className="cat-card">🛒 Shopping: <b>₹{calculateCategoryTotal('Shopping') || 0}</b></div>
              </div>
            </div>
            <div className="graph-placeholder">
              <p>Income vs Expense Visual Graph (📊 Placeholder)</p>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="history-section">
            <div className="table-header-row">
              <h3>Recent History</h3>
              <div className="table-filters">
                <input 
                   type="date" 
                   value={userDateFilter} 
                   onChange={(e) => setUserDateFilter(e.target.value)} 
                />
                <select value={userCatFilter} onChange={(e) => setUserCatFilter(e.target.value)}>
                  <option value="All Categories">All Categories</option>
                  <option value="Food">Food</option>
                  <option value="Travel">Travel</option>
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                </select>
                <button onClick={() => {setUserCatFilter('All Categories'); setUserDateFilter('')}} style={{marginLeft: '10px', cursor: 'pointer', padding: '5px 10px', borderRadius: '8px', border: '1px solid #ccc'}}>Reset</button>
              </div>
            </div>
            <table className="user-table">
              <thead><tr><th>Date</th><th>Category</th><th>Amount</th></tr></thead>
              <tbody>
                {filteredUserTransactions.length > 0 ? (
                  filteredUserTransactions.map(t => (
                    <tr key={t.id}>
                      <td>{t.date}</td><td>{t.category}</td>
                      <td className={t.type === 'income' ? 'income' : 'expense'}>
                        {t.type === 'income' ? '+' : '-'}₹{t.amount}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="3" style={{textAlign: 'center', padding: '20px'}}>No records found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings-section">
            <h3>Profile Settings</h3>
            <form className="settings-form">
              <label>Update Name</label><input type="text" placeholder="Ritesh Maurya" />
              <label>Change Password</label><input type="password" placeholder="New Password" />
              <button type="button" className="save-btn">Update Profile</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;