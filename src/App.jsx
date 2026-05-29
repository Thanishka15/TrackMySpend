import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddIncome from "./pages/AddIncome";
import AddExpense from "./pages/AddExpense";
import Transactions from "./pages/Transactions";
import Investments from "./pages/Investments";
import Login from "./pages/Login";

function App() {
  const [user, setUser] = useState(undefined);
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u ?? null));
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "users", user.uid, "expenses"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setExpenses(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, "users", user.uid, "income"),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setIncome(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [user]);

  if (user === undefined) {
    return <div style={{ color: "#fff", padding: 40 }}>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Dashboard expenses={expenses} income={income} user={user} /> : <Navigate to="/login" />} />
        <Route path="/add-income" element={user ? <AddIncome user={user} /> : <Navigate to="/login" />} />
        <Route path="/add-expense" element={user ? <AddExpense user={user} /> : <Navigate to="/login" />} />
        <Route path="/transactions" element={user ? <Transactions expenses={expenses} user={user} /> : <Navigate to="/login" />} />
        <Route path="/investments" element={user ? <Investments /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
