import { useNavigate } from "react-router-dom";

export default function Investments() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1>Investments</h1>

      <div className="summary-card">
        <p>This feature is coming next 🚀</p>
        <p style={{ opacity: 0.7 }}>
          You’ll be able to track stocks, mutual funds, and savings here.
        </p>
      </div>

      <button onClick={() => navigate("/")}>← Back to Dashboard</button>
    </div>
  );
}
