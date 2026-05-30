import { useEffect } from "react";
import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0e0e10",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 24
    }}>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, letterSpacing: "-0.3px", margin: 0 }}>
        <span style={{ color: "#e2e2e2" }}>Track</span>
        <span style={{ color: "#a259ff" }}>My</span>
        <span style={{ color: "#e2e2e2" }}>Spend</span>
      </h1>
      <p style={{ color: "#888", fontFamily: "sans-serif", margin: 0 }}>Sign in to track your finances</p>
      <button
        onClick={handleLogin}
        style={{
          background: "#a259ff",
          color: "#fff",
          border: "none",
          padding: "14px 32px",
          borderRadius: 14,
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
          width: "auto"
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
}