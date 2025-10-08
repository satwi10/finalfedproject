import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import appLogo from '../assets/EduTrack.png'; // Import your logo here

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = 'Full name is required.';
    if (!email) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid.';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      alert('Registration successful! Please sign in.');
      navigate('/login');
    }
  };

  return (
    <div className="auth-container">
      <img src={appLogo} alt="Assignment Hub Logo" className="app-logo" /> {/* Add logo here */}
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          {errors.fullName && <small className="error-message">{errors.fullName}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <small className="error-message">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <small className="error-message">{errors.password}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <small className="error-message">{errors.confirmPassword}</small>}
        </div>
        <button type="submit" className="btn btn-primary">Create Account</button>
      </form>
      <p className="auth-link">
        Already registered? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}
export default Register;