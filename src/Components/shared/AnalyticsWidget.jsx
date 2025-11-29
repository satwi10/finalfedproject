import React from 'react';

export default function AnalyticsWidget({ assignments, submissions }) {
  // Calculate stats
  const totalAssignments = assignments.length;
  const totalSubmissions = submissions.length;
  const gradedCount = submissions.filter(s => s.status === 'graded').length;
  const pendingCount = submissions.filter(s => s.status === 'submitted').length;

  // Calculate percentages for bar height (max 100%)
  // We use arbitrary scaling for demo visual
  const max = Math.max(totalAssignments, totalSubmissions, 10); // Scale based on 10 or max

  const getHeight = (val) => `${(val / max) * 100}%`;

  return (
    <div className="white-panel animate-slide-up">
      <h2 className="section-title">Class Analytics</h2>
      <div className="chart-container">
        {/* Total Tasks Bar */}
        <div className="chart-bar-group">
          <div className="chart-bar" style={{ height: getHeight(totalAssignments), background: '#6366f1' }}>
            <span className="chart-value">{totalAssignments}</span>
          </div>
          <span className="chart-label">Total Tasks</span>
        </div>

        {/* Submissions Bar */}
        <div className="chart-bar-group">
          <div className="chart-bar" style={{ height: getHeight(totalSubmissions), background: '#f59e0b' }}>
            <span className="chart-value">{totalSubmissions}</span>
          </div>
          <span className="chart-label">Received</span>
        </div>

        {/* Graded Bar */}
        <div className="chart-bar-group">
          <div className="chart-bar" style={{ height: getHeight(gradedCount), background: '#10b981' }}>
            <span className="chart-value">{gradedCount}</span>
          </div>
          <span className="chart-label">Graded</span>
        </div>
      </div>
    </div>
  );
}