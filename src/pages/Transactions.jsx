import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Transactions({ expenses, user }) {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("all");

  const getMonthKey = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  const months = Array.from(new Set(expenses.map((e) => getMonthKey(e.date)).filter(Boolean)));

  const filteredExpenses = selectedMonth === "all"
    ? expenses
    : expenses.filter((e) => getMonthKey(e.date) === selectedMonth);

  const totalForMonth = filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    await deleteDoc(doc(db, "users", user.uid, "expenses", id));
  };

  return (
    <div className="app-container">
      <h1>Transactions</h1>
      <div className="filter-row">
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="all">All Months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {new Date(month + "-01").toLocaleString("default", { month: "long", year: "numeric" })}
            </option>
          ))}
        </select>
      </div>
      <div className="summary-card">
        <p className="label">{selectedMonth === "all" ? "Total Spending (All Time)" : "Total Spending (Selected Month)"}</p>
        <h2 className="summary-amount">₹{totalForMonth}</h2>
      </div>
      {filteredExpenses.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No transactions found.</p>
      ) : (
        filteredExpenses.map((e) => (
          <div key={e.id} className="expense-card">
            <div className="expense-left">
              <strong>₹{e.amount}</strong>
              <p className="category">{e.category}</p>
              {e.note && <p className="note">"{e.note}"</p>}
              <p className="date">{e.date}</p>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(e.id)}>Delete</button>
          </div>
        ))
      )}
      <button onClick={() => navigate("/")}>← Back</button>
    </div>
  );
}