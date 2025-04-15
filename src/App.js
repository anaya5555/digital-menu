/// src/App.js
import React, { useState } from "react";
import CustomerMenu from "./CustomerMenu";
import AdminPage from "./AdminPage";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const correctPassword = "testtest"; // 👈 change this to your secret password

  const handlePasswordSubmit = () => {
    if (passwordInput === correctPassword) {
      setIsAdmin(true);
      setShowPasswordPrompt(false);
      setPasswordInput("");
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <div>
      <div style={{ padding: "10px", textAlign: "center" }}>
        {isAdmin ? (
          <button onClick={() => setIsAdmin(false)}>🔙 View Customer Menu</button>
        ) : (
          <button onClick={() => setShowPasswordPrompt(true)}>🛠️ Admin Login</button>
        )}
      </div>

      {showPasswordPrompt && (
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button onClick={handlePasswordSubmit}>Login</button>
        </div>
      )}

      {isAdmin ? <AdminPage /> : <CustomerMenu />}
    </div>
  );
}

export default App;
