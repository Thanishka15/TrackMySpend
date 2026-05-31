import { auth, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
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
      <h1 className="login-title">TrackMySpend</h1>
      <p style={{ color: "#888", margin: 0 }}>Sign in to track your finances</p>
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