import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function AddIncome() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !date) return;

    await addDoc(collection(db, "income"), {
      amount: Number(amount),
      date,
      note,
      createdAt: serverTimestamp(),
    });

    navigate("/"); // back to dashboard
  };

  return (
    <div className="app-container">
      <h1>Add Income</h1>

      <form className="form-card" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="text"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <button type="submit" disabled={!amount || !date}>
          Save Income
        </button>
      </form>
    </div>
  );
}
