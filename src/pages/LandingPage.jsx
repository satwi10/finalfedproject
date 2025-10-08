import React from 'react';
import { Link } from 'react-router-dom';
import appLogo from '../assets/EduTrack.png'; // Import your logo here

function LandingPage() {
  return (
    <div className="auth-container">
      <img src={appLogo} alt="Assignment Hub Logo" className="app-logo" />
      <h1>EduTrack</h1>
      <p>Your streamlined portal for academic tasks.</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Link to="/login" state={{ type: 'student' }} className="btn btn-primary">
          Student Login
        </Link>
        <Link to="/login" state={{ type: 'faculty' }} className="btn btn-secondary">
          Faculty Login
        </Link>
      </div>
    </div>
  );
}
export default LandingPage;