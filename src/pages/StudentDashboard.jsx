import React, { useEffect, useState } from 'react';
import { MockAPI } from '../data/mockData';
import Card from '../components/shared/Card';
import Button from '../components/shared/Button';

export default function StudentDashboard() {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [inputData, setInputData] = useState({});
  const user = MockAPI.getCurrentUser();

  const refreshData = async () => {
    const [a, s] = await Promise.all([MockAPI.getAssignments(), MockAPI.getSubmissions()]);
    setAssignments(a);
    setSubmissions(s);
  };
  useEffect(() => { refreshData(); }, []);

  // --- PROGRESS CALCULATION ---
  const mySubmissions = submissions.filter(s => s.studentId === user.id);
  const completedCount = mySubmissions.length;
  const totalCount = assignments.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  // ... (Keep handleInputChange and handleSubmit logic the same) ...
  const handleInputChange = (assignId, value, type) => {
    setInputData(prev => ({ ...prev, [assignId]: { value, type } }));
  };

  const handleSubmit = async (assignId) => {
    const data = inputData[assignId];
    if (!data || !data.value) return alert("Please provide data!");
    const submissionValue = data.type === 'file' ? `📄 ${data.value.name}` : data.value;
    await MockAPI.submitAssignment({ assignmentId: assignId, studentId: user.id, link: submissionValue, submissionType: data.type });
    setInputData(prev => ({ ...prev, [assignId]: null }));
    refreshData();
  };

  const getMySubmission = (id) => submissions.find(s => s.assignmentId === id && s.studentId === user.id);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-header animate-slide-up">Student Portal</h1>
      
      {/* --- NEW PROGRESS BAR --- */}
      <div className="white-panel animate-slide-up">
        <div className="progress-container">
          <div className="progress-header">
            <span>Your Progress</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
            You have completed {completedCount} out of {totalCount} assignments.
          </p>
        </div>
      </div>

      {assignments.map((a, i) => {
        const sub = getMySubmission(a.id);
        const currentInput = inputData[a.id] || { type: 'link', value: '' };
        return (
          <div key={a.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <Card title={a.title}>
              <p style={{ color: '#4b5563', marginBottom: '10px' }}>{a.desc}</p>
              <p style={{ color: '#dc2626', fontWeight: 'bold' }}>Deadline: {a.deadline}</p>
              
              <div style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                {sub ? (
                  <div style={{ padding: '10px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                    <strong>✅ Submitted:</strong> {sub.link}
                    {sub.grade && <div style={{marginTop:'5px', color:'#15803d'}}><strong>Grade:</strong> {sub.grade}/100</div>}
                  </div>
                ) : (
                  <div>
                    <div style={{display:'flex', gap:'15px', marginBottom:'10px'}}>
                        <label><input type="radio" name={`t-${a.id}`} checked={currentInput.type==='link'} onChange={()=>handleInputChange(a.id,'','link')} /> Paste Link</label>
                        <label><input type="radio" name={`t-${a.id}`} checked={currentInput.type==='file'} onChange={()=>handleInputChange(a.id,'','file')} /> Upload PDF</label>
                    </div>
                    <div style={{display:'flex', gap:'10px'}}>
                        {currentInput.type === 'link' ? 
                           <input type="text" placeholder="http://..." className="custom-input" value={currentInput.value} onChange={e=>handleInputChange(a.id,e.target.value,'link')} /> : 
                           <input type="file" className="custom-input" onChange={e=>handleInputChange(a.id,e.target.files[0],'file')} />
                        }
                        <Button onClick={()=>handleSubmit(a.id)}>Submit</Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        );
      })}
    </div>
  );
}