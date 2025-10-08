import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import appLogo from '../assets/EduTrack.png'; // Import your logo here

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginType, setLoginType] = useState('student'); // 'student' or 'faculty'

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.type) {
      setLoginType(location.state.type);
    }
  }, [location.state]);

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      if (loginType === 'faculty') {
        navigate('/teacher-dashboard');
      } else {
        navigate('/student-dashboard');
      }
    }
  };

  return (
    <div className="auth-container">
      <img src={appLogo} alt="Assignment Hub Logo" className="app-logo" /> {/* Add logo here */}
      <div className="login-type-switcher">
        <button
          className={`switcher-btn ${loginType === 'student' ? 'active' : ''}`}
          onClick={() => setLoginType('student')}
        >
          Student
        </button>
        <button
          className={`switcher-btn ${loginType === 'faculty' ? 'active' : ''}`}
          onClick={() => setLoginType('faculty')}
        >
          Faculty
        </button>
      </div>

      <h2>
        Welcome Back, {loginType === 'student' ? 'Student' : 'Faculty'}
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          {errors.email && <small className="error-message">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          {errors.password && <small className="error-message">{errors.password}</small>}
        </div>
        <button type="submit" className="btn btn-primary">Sign In</button>
      </form>
      <p className="auth-link">
        No account yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;