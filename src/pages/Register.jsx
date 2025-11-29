import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MockAPI } from '../data/mockData';
import InputField from '../components/shared/InputField';
import LoadingSpinner from '../components/shared/LoadingSpinner';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [errors, setErrors] = useState({}); // Store Validation Errors
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Level 5 Validation Logic
  const validate = () => {
    let tempErrors = {};
    if (!form.name) tempErrors.name = "Full Name is required";
    if (!form.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = "Email format is invalid";
    if (!form.password) tempErrors.password = "Password is required";
    else if (form.password.length < 6) tempErrors.password = "Password must be at least 6 characters";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validate()) return; // Stop if validation fails

    setLoading(true);
    try {
      await MockAPI.register(form.name, form.email, form.password, form.role);
      alert("Registration Successful! Please Login.");
      navigate('/login');
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card animate-slide-up">
        <div style={{ padding: '2rem 2rem 0', textAlign: 'center' }}>
          <h2>Create Account</h2>
        </div>
        <div className="form-content">
          <form onSubmit={handleRegister}>
            <div>
                <InputField 
                    label="Full Name" type="text" value={form.name} 
                    onChange={(e)=>setForm({...form, name: e.target.value})} 
                    className={errors.name ? 'input-error' : ''}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div style={{marginTop: '10px'}}>
                <InputField 
                    label="Email" type="email" value={form.email} 
                    onChange={(e)=>setForm({...form, email: e.target.value})} 
                    className={errors.email ? 'input-error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            <div style={{marginTop: '10px'}}>
                <InputField 
                    label="Password" type="password" value={form.password} 
                    onChange={(e)=>setForm({...form, password: e.target.value})} 
                    className={errors.password ? 'input-error' : ''}
                />
                {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <div className="input-group" style={{marginTop: '10px'}}>
              <label>Role</label>
              <select value={form.role} onChange={(e)=>setForm({...form, role: e.target.value})} className="custom-input" style={{background:'white'}}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
          {loading && <LoadingSpinner />}
          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem' }}>
            Have an account? <Link to="/login" style={{ color: '#4f46e5', fontWeight: 'bold' }}>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}