// src/Components/ProgressBar.jsx
import React from "react";
const ProgressBar = ({ completed, total }) => {
  const width = total ? (completed / total) * 100 : 0;
  return (
    <div className="progress-outer">
      <div className="progress-inner" style={{ width: `${width}%` }} />
      <span className="progress-label">
        {completed} / {total} assignments completed
      </span>
    </div>
  );
};
export default ProgressBar;

// Add CSS:
/*
.progress-outer { width: 100%; height: 14px; background: #eee; border-radius: 6px; margin-bottom: 8px; }
.progress-inner { height: 100%; background: #4caf50; border-radius: 6px; transition: width 0.4s; }
.progress-label { font-size: 0.9rem; margin-left: 6px; color: #222; }
*/
