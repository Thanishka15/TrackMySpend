import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import Transactions from "./pages/Transactions";
import Investments from "./pages/Investments";


function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  // 🔹 Expenses
  useEffect(() => {
    const q = query(
      collection(db, "expenses"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setExpenses(data);
    });

    return () => unsub();
  }, []);

  // 🔹 Income
  useEffect(() => {
    const q = query(
      collection(db, "income"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setIncome(data);
    });

    return () => unsub();
  }, []);

  return (
    <Router>
      <Routes>
  <Route
    path="/"
    element={<Dashboard expenses={expenses} income={income} />}
  />
  <Route path="/add-income" element={<AddIncome />} />
  <Route path="/add-expense" element={<AddExpense />} />
  <Route
    path="/transactions"
    element={<Transactions expenses={expenses} />}
  />
  <Route path="/investments" element={<Investments />} />
</Routes>

    </Router>
  );
}

export default App;

