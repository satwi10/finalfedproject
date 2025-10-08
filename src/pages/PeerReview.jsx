// PeerReview.jsx
const PeerReview = ({ assignments, userId }) => {
    // assignments = array of {id, title, studentId, ...}
    const peerAssignments = assignments.filter(a => a.studentId !== userId);

    return (
        <div>
            <h3>Peer Assignments</h3>
            <ul>
                {peerAssignments.map(a => (
                    <li key={a.id}>
                        {a.title}
                        <button onClick={() => {/* Handle review */}}>Review</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
