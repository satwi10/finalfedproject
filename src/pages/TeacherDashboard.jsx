import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Components/Modal';
import appLogo from '../assets/EduTrack.png'; // Import your logo here

function TeacherDashboard({ assignments, addAssignment, gradeSubmission }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errors, setErrors] = useState({});
  const [gradeInput, setGradeInput] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsn, setSelectedAsn] = useState(null);

  const activeAssignments = assignments.filter(asn => asn.status === 'active');
  const submittedAssignments = assignments.filter(asn => asn.status === 'submitted');
  const completedAssignments = assignments.filter(asn => asn.status === 'completed');

  const viewDetails = (assignment) => {
    setSelectedAsn(assignment);
    setIsModalOpen(true);
  };
  
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!title) newErrors.title = "Title is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!dueDate) newErrors.dueDate = "Due Date is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    addAssignment({ title, description, dueDate });
    setTitle('');
    setDescription('');
    setDueDate('');
    setErrors({});
    alert('Assignment created successfully!');
  };

  const handleGradeChange = (assignmentId, value) => {
    setGradeInput(prev => ({ ...prev, [assignmentId]: value }));
  };

  const handleSaveGrade = (assignmentId) => {
    const grade = gradeInput[assignmentId];
    if (grade) {
      gradeSubmission(assignmentId, grade);
      alert(`Grade '${grade}' saved for assignment ${assignmentId}`);
      setGradeInput(prev => {
        const newState = { ...prev };
        delete newState[assignmentId];
        return newState;
      });
    } else {
      alert("Please enter a grade.");
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedAsn?.title}>
          <p><strong>Description:</strong> {selectedAsn?.description}</p>
          <p><strong>Due Date:</strong> {selectedAsn?.dueDate}</p>
          <p><strong>Status:</strong> {selectedAsn?.status.charAt(0).toUpperCase() + selectedAsn?.status.slice(1)}</p>
          {selectedAsn?.grade && <p><strong>Grade:</strong> {selectedAsn?.grade}</p>}
      </Modal>

      <div className="dashboard-body">
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="logo-text-container"> {/* Container for logo and text */}
                <img src={appLogo} alt="EduTrack Logo" className="navbar-logo" />
                EduTrack
            </Link>
            <Link to="/" className="btn btn-secondary">Logout</Link>
          </div>
        </nav>
        <main className="dashboard-container">
          <header className="dashboard-header">
            <h1>Teacher Dashboard</h1>
            <p>Manage assignments and review submissions.</p>
          </header>

          <div className="card">
            <header className="card-header"><h2>Create New Assignment</h2></header>
            <div className="card-body">
              <form onSubmit={handleCreateSubmit}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  {errors.title && <small className="error-message">{errors.title}</small>}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                  {errors.description && <small className="error-message">{errors.description}</small>}
                </div>
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input type="date" id="dueDate" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                  {errors.dueDate && <small className="error-message">{errors.dueDate}</small>}
                </div>
                <button type="submit" className="btn btn-primary">Publish Assignment</button>
              </form>
            </div>
          </div>

          <div className="card">
            <header className="card-header"><h2>Review Submissions</h2></header>
            <div className="card-body">
              <div className="item-list">
                {submittedAssignments.length > 0 ? submittedAssignments.map(asn => (
                  <div className="item" key={asn.id}>
                    <div className="item-content">
                      <h3 onClick={() => viewDetails(asn)}>{asn.title}</h3>
                      <p>Status: Submitted</p>
                    </div>
                    <div className="item-actions">
                      <input 
                        type="text" 
                        placeholder="Grade..." 
                        className="grade-input" 
                        value={gradeInput[asn.id] || ''}
                        onChange={(e) => handleGradeChange(asn.id, e.target.value)}
                      />
                      <button onClick={() => handleSaveGrade(asn.id)} className="btn btn-success">Save</button>
                    </div>
                  </div>
                )) : <p className="text-muted">No pending submissions.</p>}
              </div>
            </div>
          </div>

          <div className="card">
            <header className="card-header"><h2>Active Assignments</h2></header>
            <div className="card-body">
              <div className="item-list">
                {activeAssignments.length > 0 ? activeAssignments.map(asn => (
                  <div className="item" key={asn.id}>
                    <div className="item-content">
                      <h3 onClick={() => viewDetails(asn)}>{asn.title}</h3>
                      <p>Due: {asn.dueDate}</p>
                    </div>
                    <div className="item-status">Active</div>
                  </div>
                )) : <p className="text-muted">No active assignments created.</p>}
              </div>
            </div>
          </div>

          <div className="card">
            <header className="card-header"><h2>Graded Assignments</h2></header>
            <div className="card-body">
              <div className="item-list">
                {completedAssignments.length > 0 ? completedAssignments.map(asn => (
                  <div className="item" key={asn.id}>
                    <div className="item-content">
                      <h3 onClick={() => viewDetails(asn)}>{asn.title}</h3>
                      <p>Due: {asn.dueDate}</p>
                    </div>
                    <div className="item-grade">{asn.grade || 'N/A'}</div>
                  </div>
                )) : <p className="text-muted">No assignments graded yet.</p>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
export default TeacherDashboard;