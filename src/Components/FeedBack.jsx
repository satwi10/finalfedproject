import React, { useState } from "react";
function FeedbackForm({ onSubmit }) {
  const [feedback, setFeedback] = useState("");
  return (
    <form onSubmit={e => {e.preventDefault(); onSubmit(feedback); setFeedback("");}}>
      <textarea
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        placeholder="Type feedback..."
        required
        style={{ width: "97%", minHeight: "48px", padding: "6px", marginBottom: "8px" }}
      />
      <button type="submit" className="btn btn-primary">Submit Feedback</button>
    </form>
  );
}
export default FeedbackForm;
