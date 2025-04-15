// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CustomerMenu from "./CustomerMenu";
import AdminPage from "./AdminPage";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const correctPassword = "test2000"; // Change this to your password

  const handleLogin = () => {
    if (passwordInput === correctPassword) {
      setIsAdmin(true);
    } else {
      alert("Wrong password!");
    }
  };

  return (
    <Router>
      <div style={{ padding: "10px", textAlign: "center" }}>
        <Link to="/">🏠 Customer Menu</Link> | <Link to="/admin">🛠️ Admin Dashboard</Link>
      </div>

      <Routes>
        <Route path="/" element={<CustomerMenu />} />
        <Route
          path="/admin"
          element={
            isAdmin ? (
              <AdminPage />
            ) : (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h2>Enter Admin Password</h2>
                <input
                  type="password"
                  placeholder="Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
                <button onClick={handleLogin} style={{ marginLeft: "10px" }}>
                  Login
                </button>
              </div>
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
