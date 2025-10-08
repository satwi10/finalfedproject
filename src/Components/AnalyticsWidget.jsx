export default function AnalyticsWidget({ assignments }) {
  const avgGrade = assignments.reduce((acc, a) => acc + (parseFloat(a.grade) || 0), 0) / assignments.length;
  const submitted = assignments.filter(a => a.status === "submitted" || a.status === "completed").length;
  return (
    <div style={{ background: "#f4f4f4", padding: "12px", borderRadius: "8px" }}>
      <p>Average Grade: {isNaN(avgGrade) ? "N/A" : avgGrade.toFixed(1)}</p>
      <p>Assignments Submitted: {submitted}</p>
    </div>
  );
}
