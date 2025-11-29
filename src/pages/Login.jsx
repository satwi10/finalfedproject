import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MockAPI } from '../data/mockData';
import InputField from '../components/shared/InputField';
import LoadingSpinner from '../components/shared/LoadingSpinner'; // Ensure you have this created from previous steps

export default function Login() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await MockAPI.login(email, password);

      // Check if the user is logging into the correct tab
      if (user.role !== role) {
        throw new Error(`Account found, but it is a ${user.role} account. Please switch tabs.`);
      }

      navigate(user.role === 'teacher' ? '/teacher' : '/student');
      window.location.reload();
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card animate-slide-up">
        {/* TABS */}
        <div className="role-tabs">
          <div 
            className={`tab ${role === 'student' ? 'active' : ''}`} 
            onClick={() => setRole('student')}
          >
            Student Login
          </div>
          <div 
            className={`tab ${role === 'teacher' ? 'active' : ''}`} 
            onClick={() => setRole('teacher')}
          >
            Teacher Login
          </div>
        </div>

        {/* FORM */}
        <div className="form-content">
          <h2 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>
            Welcome Back
          </h2>
          
          {error && (
            <div className="error-text" style={{ textAlign: 'center', marginBottom: '1rem', color: '#ff6b6b' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <InputField 
              label="Email" 
              type="email" 
              placeholder={role === 'teacher' ? "teacher@test.com" : "student@test.com"}
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <InputField 
              label="Password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Authenticating...' : `Login as ${role === 'student' ? 'Student' : 'Teacher'}`}
            </button>
          </form>

          {loading && <LoadingSpinner />}

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
            New here? <Link to="/register" style={{ color: '#23a6d5', fontWeight: '600' }}>Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}