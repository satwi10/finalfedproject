import React, { useEffect, useState } from 'react';
import { MockAPI } from '../data/mockData';
import InputField from '../components/shared/InputField';
import Button from '../components/shared/Button';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import AnalyticsWidget from '../components/shared/AnalyticsWidget'; // NEW IMPORT

export default function TeacherDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: '', desc: '', deadline: '' });
  const [isEditing, setIsEditing] = useState(false);

  const refreshData = async () => {
    setLoading(true);
    const [a, s] = await Promise.all([MockAPI.getAssignments(), MockAPI.getSubmissions()]);
    setAssignments(a);
    setSubmissions(s);
    setLoading(false);
  };
  useEffect(() => { refreshData(); }, []);

  // --- NEW FEATURE: EXPORT TO CSV ---
  const handleExport = () => {
    if (submissions.length === 0) return alert("No data to export!");
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Student ID,Assignment ID,Link,Status,Grade\n"; // Header

    submissions.forEach(s => {
      csvContent += `${s.studentId},${s.assignmentId},${s.link},${s.status},${s.grade || 'N/A'}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "gradebook.csv");
    document.body.appendChild(link);
    link.click();
  };

  // ... (Existing handlers: handleSubmit, handleEdit, handleDelete, handleGrade keep them same) ...
  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    if (isEditing) { await MockAPI.updateAssignment(formData); setIsEditing(false); } 
    else { await MockAPI.createAssignment(formData); }
    setFormData({ id: null, title: '', desc: '', deadline: '' }); await refreshData();
  };

  const handleEdit = (assignment) => { setFormData(assignment); setIsEditing(true); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  
  const handleDelete = async (id) => {
    if(window.confirm("Delete this?")) { setLoading(true); await MockAPI.deleteAssignment(id); await refreshData(); }
  };

  const handleGrade = async (subId) => {
    const g = prompt("Grade (0-100):"); const f = prompt("Feedback:");
    if(g) { setLoading(true); await MockAPI.gradeSubmission(subId, g, f); await refreshData(); }
  };

  return (
    <div className="dashboard-container">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <h1 className="dashboard-header animate-slide-up" style={{marginBottom:0}}>Teacher Dashboard</h1>
        {/* Export Button */}
        <button onClick={handleExport} style={{background:'white', color:'#23a6d5', padding:'10px 20px', borderRadius:'30px', fontWeight:'bold', border:'none', cursor:'pointer', boxShadow:'0 4px 10px rgba(0,0,0,0.1)'}}>
          📥 Export CSV
        </button>
      </div>
      
      {loading && <LoadingSpinner />}

      {/* NEW ANALYTICS WIDGET */}
      <AnalyticsWidget assignments={assignments} submissions={submissions} />

      {/* Section 1: Form */}
      <div className="white-panel animate-slide-up">
        <h2 className="section-title">{isEditing ? "Edit Assignment" : "Post New Assignment"}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <InputField placeholder="Assignment Title" value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} required />
          <InputField type="date" value={formData.deadline} onChange={e=>setFormData({...formData, deadline: e.target.value})} required />
          <div style={{ gridColumn: 'span 2' }}>
            <InputField placeholder="Description" value={formData.desc} onChange={e=>setFormData({...formData, desc: e.target.value})} />
            <div style={{ display: 'flex', gap: '10px', marginTop:'10px' }}>
              <Button type="submit">{isEditing ? "Update" : "Publish"}</Button>
              {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ id: null, title: '', desc: '', deadline: '' }); }} style={{background:'#9ca3af', padding:'10px', borderRadius:'8px', border:'none', color:'white'}}>Cancel</button>}
            </div>
          </div>
        </form>
      </div>

      {/* Section 2: Active Assignments */}
      <div className="white-panel animate-slide-up stagger-1">
        <h2 className="section-title">Active Assignments</h2>
        {assignments.map(a => (
          <div key={a.id} className="assignment-item">
            <div><h3 style={{margin:0}}>{a.title}</h3><p style={{margin:0, color:'#666'}}>Due: {a.deadline}</p></div>
            <div>
              <button onClick={() => handleEdit(a)} className="action-btn btn-edit">Edit</button>
              <button onClick={() => handleDelete(a.id)} className="action-btn btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Section 3: Submissions */}
      <div className="white-panel animate-slide-up stagger-2">
        <h2 className="section-title">Student Submissions</h2>
        {submissions.map(s => {
          const relatedAssignment = assignments.find(a => a.id === s.assignmentId) || {};
          return (
            <div key={s.id} className="assignment-item">
              <div>
                <h4>{relatedAssignment.title}</h4>
                <p><strong>Student ID:</strong> {s.studentId}</p>
                <div style={{color:'#0fbcf9'}}>{s.submissionType === 'file' ? `📄 ${s.link}` : `🔗 ${s.link}`}</div>
              </div>
              <div style={{textAlign:'right'}}>
                {s.grade ? <span style={{color:'#10ac84', fontWeight:'bold'}}>{s.grade}/100</span> : <button onClick={() => handleGrade(s.id)} className="action-btn btn-grade">Grade</button>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}