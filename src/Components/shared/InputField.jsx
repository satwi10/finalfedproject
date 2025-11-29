import React from 'react';

export default function InputField({ label, type, value, onChange, placeholder, required, className }) {
  return (
    <div className="input-group" style={{ marginBottom: '1.2rem' }}>
      <label>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        placeholder={placeholder} 
        // CHANGED: Use glass-input class
        className={`glass-input ${className || ''}`} 
      />
    </div>
  );
}