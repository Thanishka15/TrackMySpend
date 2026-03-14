import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#c084fc", "#60a5fa", "#34d399", "#fbbf24", "#f87171"];

export default function Dashboard({ expenses, income }) {
  const navigate = useNavigate();

  // Totals
  const totalExpenses = expenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const totalIncome = income.reduce(
    (sum, i) => sum + Number(i.amount),
    0
  );

  const balance = totalIncome - totalExpenses;

  // 🔹 Category-wise expense data for pie chart
  const categoryMap = {};
  expenses.forEach((e) => {
    if (!e.category) return;
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + Number(e.amount);
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* 🔹 Pie Chart */}
      {pieData.length > 0 && (
        <div className="chart-card">
          <p className="label">Spending Breakdown</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Balance */}
      <div className="balance-card">
        <p className="label">Current Balance</p>
        <h2 className="balance">₹{balance}</h2>
      </div>

      {/* Stats */}
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

      {/* Actions */}
      <div className="actions-row">
        <button
          className="btn primary"
          onClick={() => navigate("/add-income")}
        >
          + Add Income
        </button>

        <button
          className="btn secondary"
          onClick={() => navigate("/add-expense")}
        >
          + Add Expense
        </button>
      </div>

      {/* Secondary navigation cards */}
      <div className="secondary-cards">
        <div
          className="secondary-card"
          onClick={() => navigate("/transactions")}
        >
          <span>View Transactions</span>
          <span className="arrow">→</span>
        </div>

        <div
          className="secondary-card"
          onClick={() => navigate("/investments")}
        >
          <span>Investments</span>
          <span className="arrow">→</span>
        </div>
      </div>
    </div>
  );
}

