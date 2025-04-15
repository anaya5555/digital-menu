// src/CustomerMenu.js
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

function CustomerMenu() {
  const [menuItems, setMenuItems] = useState({});

  const loadMenu = async () => {
    const snapshot = await getDocs(collection(db, "menuItems"));
    const items = snapshot.docs.map((doc) => doc.data());

    // Group items by category
    const grouped = {};
    items.forEach((item) => {
      if (!grouped[item.category]) grouped[item.category] = [];
      grouped[item.category].push(item);
    });

    setMenuItems(grouped);
  };

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Our Menu</h1>

      {Object.entries(menuItems).map(([category, items]) => (
        <div key={category} style={{ marginBottom: "20px" }}>
          <h2>{category}</h2>
          {items.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <strong>{item.name}</strong> - ${item.price}
              <br />
              <small>{item.description}</small>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CustomerMenu;
