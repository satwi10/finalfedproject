import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/EduTrack.png'; 

export default function LandingPage() {
  return (
    <div className="landing-container" style={{
      /* --- FIX: Force Center Alignment --- */
      display: 'flex',
      justifyContent: 'center', /* Centers Horizontally */
      alignItems: 'center',     /* Centers Vertically */
      minHeight: 'calc(100vh - 70px)', /* Takes full height minus navbar */
      width: '100%',
      padding: '20px'
    }}>
      
      {/* The White Card */}
      <div style={{ 
        backgroundColor: '#ffffff', 
        borderRadius: '24px', 
        padding: '3rem', 
        maxWidth: '500px', 
        width: '100%', 
        textAlign: 'center',
        boxShadow: '0 20px 50px rgba(0,0,0,0.2)', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative' /* Ensures z-index works if needed */
      }}>
        
        {/* Logo */}
        <img 
          src={logo} 
          alt="EduTrack Logo" 
          style={{ 
            width: '140px', 
            height: 'auto', 
            marginBottom: '1.5rem',
            display: 'block'
          }} 
        />
        
        {/* Title */}
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '800', 
          color: '#1f2937', 
          marginBottom: '0.5rem',
          marginTop: 0,
          fontFamily: 'sans-serif'
        }}>
          Welcome to EduTrack
        </h1>
        
        {/* Subtitle */}
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#6b7280', 
          marginBottom: '2rem', 
          lineHeight: '1.6' 
        }}>
          Experience the future of assignment management. <br/>
          Beautiful, Fast, and Intuitive.
        </p>
        
        {/* Button */}
        <Link to="/login" style={{ 
          backgroundColor: '#0fbcf9', 
          color: 'white', 
          padding: '14px 40px', 
          borderRadius: '50px', 
          fontSize: '1.1rem', 
          fontWeight: 'bold', 
          textDecoration: 'none',
          boxShadow: '0 4px 15px rgba(15, 188, 249, 0.4)',
          transition: 'transform 0.2s',
          display: 'inline-block'
        }}>
          Get Started
        </Link>
      </div>
    </div>
  );
}