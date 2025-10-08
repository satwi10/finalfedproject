import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';

function App() {
  // --- Central State Management ---
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Introduction to React', description: 'Complete the first 5 lessons on React official documentation.', status: 'active', dueDate: '2023-11-15' },
    { id: 2, title: 'Project Proposal: Web App', description: 'Submit a detailed proposal for your final web application project.', status: 'active', dueDate: '2023-11-20' },
    { id: 3, title: 'Data Structures Midterm', description: 'Review chapters 1-5 for the upcoming midterm exam.', status: 'completed', grade: 'A-', dueDate: '2023-10-25' }
  ]);

  const addAssignment = (newAssignment) => {
    setAssignments(prev => [...prev, { 
      ...newAssignment, 
      id: Date.now(), 
      status: 'active', 
      dueDate: newAssignment.dueDate || 'No Due Date' // Ensure dueDate is set
    }]);
  };

  const submitAssignment = (assignmentId) => {
    setAssignments(prev => 
      prev.map(asn => 
        asn.id === assignmentId ? { ...asn, status: 'submitted' } : asn
      )
    );
  };

  const gradeSubmission = (assignmentId, newGrade) => {
    setAssignments(prev =>
      prev.map(asn =>
        asn.id === assignmentId ? { ...asn, status: 'completed', grade: newGrade } : asn
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route 
          path="/student-dashboard" 
          element={
            <StudentDashboard 
              assignments={assignments} 
              submitAssignment={submitAssignment} 
            />
          } 
        />
        <Route 
          path="/teacher-dashboard" 
          element={
            <TeacherDashboard 
              assignments={assignments} 
              addAssignment={addAssignment} 
              gradeSubmission={gradeSubmission}
            />
          } 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
