import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../Components/Modal';
import appLogo from '../assets/EduTrack.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentDashboard({ assignments = [], submitAssignment }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAsn, setSelectedAsn] = useState(null);

  const activeAssignments = assignments.filter(asn => asn.status === 'active');
  const submittedAssignments = assignments.filter(
    asn => asn.status === 'submitted' || asn.status === 'completed'
  );

  const viewDetails = (assignment) => {
    setSelectedAsn(assignment);
    setIsModalOpen(true);
  };

  const handleSubmit = (id) => {
    if (window.confirm('Are you sure you want to submit this assignment?')) {
      submitAssignment(id);
      alert('Assignment submitted!');
    }
  };

  // Notification for assignments near deadline or overdue
  useEffect(() => {
    const now = new Date();
    activeAssignments.forEach(asn => {
      const due = new Date(asn.dueDate);
      const timeDiff = due - now;
      if (timeDiff < 24 * 60 * 60 * 1000 && timeDiff > 0) {
        toast.info(`Assignment "${asn.title}" is due soon!`);
      }
      if (timeDiff <= 0) {
        toast.error(`Assignment "${asn.title}" is overdue!`);
      }
    });
  }, [activeAssignments]);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedAsn?.title || ''}
      >
        {selectedAsn && (
          <>
            <p><strong>Description:</strong> {selectedAsn.description}</p>
            <p><strong>Due Date:</strong> {selectedAsn.dueDate}</p>
            <p>
              <strong>Status:</strong>{' '}
              {selectedAsn.status.charAt(0).toUpperCase() +
                selectedAsn.status.slice(1)}
            </p>
            {selectedAsn.grade && (
              <p>
                <strong>Grade:</strong> {selectedAsn.grade}
              </p>
            )}
            {selectedAsn.feedback && (
              <p>
                <strong>Feedback:</strong> {selectedAsn.feedback}
              </p>
            )}
          </>
        )}
      </Modal>


      <div className="dashboard-body">
        <nav className="navbar">
          <div className="nav-content">
            <Link to="/" className="logo-text-container">
              <img src={appLogo} alt="EduTrack Logo" className="navbar-logo" />
              EduTrack
            </Link>
            <Link to="/" className="btn btn-secondary">
              Logout
            </Link>
          </div>
        </nav>
        <main className="dashboard-container">
          <header className="dashboard-header">
            <h1>Student Dashboard</h1>
            <p>Welcome back! Here are your assignments.</p>
          </header>

          <div className="card">
            <header className="card-header">
              <h2>Active Assignments</h2>
            </header>
            <div className="card-body">
              <div className="item-list">
                {activeAssignments.length > 0 ? (
                  activeAssignments.map(asn => (
                    <div className="item" key={asn.id}>
                      <div className="item-content">
                        <h3 onClick={() => viewDetails(asn)} style={{ cursor: 'pointer' }}>
                          {asn.title}
                        </h3>
                        <p>Due: {asn.dueDate}</p>
                      </div>
                      <button
                        onClick={() => handleSubmit(asn.id)}
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No active assignments. Great job!</p>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <header className="card-header">
              <h2>Completed & Submitted</h2>
            </header>
            <div className="card-body">
              <div className="item-list">
                {submittedAssignments.length > 0 ? (
                  submittedAssignments.map(asn => (
                    <div className="item" key={asn.id}>
                      <div className="item-content">
                        <h3 onClick={() => viewDetails(asn)} style={{ cursor: 'pointer' }}>
                          {asn.title}
                        </h3>
                        <p>
                          Status:{' '}
                          {asn.status.charAt(0).toUpperCase() +
                            asn.status.slice(1)}
                        </p>
                      </div>
                      {asn.status === 'completed' && (
                        <div className="item-grade">{asn.grade || 'N/A'}</div>
                      )}
                      {asn.status === 'submitted' && (
                        <div className="item-status">Pending Review</div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-muted">No submitted assignments yet.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <ToastContainer />
    </>
  );
}

export default StudentDashboard;
