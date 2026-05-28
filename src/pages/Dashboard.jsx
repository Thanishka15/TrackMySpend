import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const COLORS = ["#c084fc", "#60a5fa", "#34d399", "#fbbf24", "#f87171"];

export default function Dashboard({ expenses, income, user }) {
  const navigate = useNavigate();

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const totalIncome = income.reduce((sum, i) => sum + Number(i.amount), 0);
  const balance = totalIncome - totalExpenses;

  const categoryMap = {};
  expenses.forEach((e) => {
    if (!e.category) return;
    categoryMap[e.category] = (categoryMap[e.category] || 0) + Number(e.amount);
  });
  const pieData = Object.keys(categoryMap).map((key) => ({ name: key, value: categoryMap[key] }));

  return (
    <div className="dashboard-container">
      <div className="app-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <h1 className="app-name">TrackMySpend</h1>
          <h2 className="dashboard-title">Dashboard</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
          <img src={user.photoURL} referrerPolicy="no-referrer" style={{ width: 36, height: 36, borderRadius: "50%" }} />
          <button
            onClick={() => signOut(auth)}
            style={{ background: "transparent", color: "#888", border: "1px solid #333", borderRadius: 8, padding: "4px 12px", fontSize: 12, width: "auto", cursor: "pointer" }}
          >
            Sign out
          </button>
        </div>
      </div>

      {pieData.length > 0 && (
        <div className="chart-card">
          <p className="label">Spending Breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={80}>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="balance-card">
        <p className="label">Current Balance</p>
        <h2 className="balance">₹{balance}</h2>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <p className="label">Total Income</p>
          <h3 className="positive">₹{totalIncome}</h3>
        </div>
        <div className="stat-card">
          <p className="label">Total Spending</p>
          <h3 className="negative">₹{totalExpenses}</h3>
        </div>
      </div>

      <div className="actions-row">
        <button className="btn primary" onClick={() => navigate("/add-income")}>+ Add Income</button>
        <button className="btn secondary" onClick={() => navigate("/add-expense")}>+ Add Expense</button>
      </div>

      <div className="secondary-cards">
        <div className="secondary-card" onClick={() => navigate("/transactions")}>
          <span>View Transactions</span><span className="arrow">→</span>
        </div>
        <div className="secondary-card" onClick={() => navigate("/investments")}>
          <span>Investments</span><span className="arrow">→</span>
        </div>
      </div>
    </div>
  );
}
