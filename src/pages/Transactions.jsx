import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Transactions({ expenses }) {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState("all");

  // Convert date → YYYY-MM
  const getMonthKey = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  // Available months (dropdown)
  const months = Array.from(
    new Set(expenses.map((e) => getMonthKey(e.date)).filter(Boolean))
  );

  // Filter expenses by month
  const filteredExpenses =
    selectedMonth === "all"
      ? expenses
      : expenses.filter(
          (e) => getMonthKey(e.date) === selectedMonth
        );

  // Total spending for selected month
  const totalForMonth = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  // Delete handler
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "expenses", id));
  };

  return (
    <div className="app-container">
      <h1>Transactions</h1>

      {/* Month Filter */}
      <div className="filter-row">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="all">All Months</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {new Date(month + "-01").toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </option>
          ))}
        </select>
      </div>

      {/* Month Total */}
      <div className="summary-card">
        <p className="label">
          {selectedMonth === "all"
            ? "Total Spending (All Time)"
            : "Total Spending (Selected Month)"}
        </p>
        <h2 className="summary-amount">₹{totalForMonth}</h2>
      </div>

      {/* Transactions */}
      {filteredExpenses.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No transactions found.</p>
      ) : (
        filteredExpenses.map((e) => (
          <div key={e.id} className="expense-card">
  <div className="expense-left">
    <strong>₹{e.amount}</strong>
    <p className="category">{e.category}</p>

    {e.note && (
      <p className="note">“{e.note}”</p>
    )}

    <p className="date">{e.date}</p>
  </div>

  <button
    className="delete-btn"
    onClick={() => handleDelete(e.id)}
  >
    Delete
  </button>
</div>

        ))
      )}

      <button onClick={() => navigate("/")}>← Back</button>
    </div>
  );
}
