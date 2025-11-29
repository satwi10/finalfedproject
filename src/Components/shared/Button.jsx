import React from 'react';
export default function Button({ children, onClick, disabled, style }) {
  return (
    <button onClick={onClick} disabled={disabled} style={style} className="custom-btn">
      {children}
    </button>
  );
}