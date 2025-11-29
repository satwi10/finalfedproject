import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MockAPI } from '../../data/mockData';
import logo from '../../assets/EduTrack.png'; 

export default function Navbar() {
  const navigate = useNavigate();
  const user = MockAPI.getCurrentUser();

  const handleLogout = () => {
    MockAPI.logout();
    navigate('/login');
    window.location.reload();
  };

  return (
    <nav className="navbar">
      {/* --- FIX: Force the logo height to 40px --- */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
        <img 
          src={logo} 
          alt="EduTrack" 
          className="navbar-logo" 
          style={{ height: '40px', width: 'auto' }} 
        />
      </Link>

      <div className="links">
        {user ? (
          <>
            <span style={{ fontWeight: '600', color: '#555' }}>
              Hi, {user.name}
            </span>
            <button onClick={handleLogout} className="btn-logout">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" style={{ fontWeight: '600', color: '#333' }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}