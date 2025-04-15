import React, { useState } from "react";
import "./App.css";

const menu = {
  Starters: [
    { name: "Hummus", description: "Creamy chickpea dip", price: 5 },
    { name: "Falafel", description: "5 pieces, crispy", price: 6 },
  ],
  Mains: [
    { name: "Chicken Shawarma", description: "Marinated chicken wrap", price: 10 },
    { name: "Beef Kebab", description: "Served with rice", price: 12 },
  ],
  Drinks: [
    { name: "Pepsi", description: "", price: 2 },
    { name: "Mint Lemonade", description: "Fresh & chilled", price: 3 },
  ],
  Desserts: [
    { name: "Baklava", description: "Sweet layered pastry", price: 4 },
  ],
};

function App() {
  const [order, setOrder] = useState([]);

  const addToOrder = (item) => {
    setOrder([...order, item]);
  };

  const sendOrder = () => {
    const message =
      "Hello! I’d like to place an order:\\n\\n" +
      order.map((item) => `- ${item.name} ($${item.price})`).join("\\n") +
      "\\n\\nThank you!";
    const phone = "1234567890"; // Replace with your WhatsApp number
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Restaurant Menu</h1>
      {Object.entries(menu).map(([category, items]) => (
        <div key={category}>
          <h2>{category}</h2>
          {items.map((item, idx) => (
            <div key={idx} style={{ marginBottom: "10px" }}>
              <strong>{item.name}</strong> - ${item.price}
              <br />
              <small>{item.description}</small>
              <br />
              <button onClick={() => addToOrder(item)}>Add</button>
            </div>
          ))}
        </div>
      ))}

      {order.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h2>Your Order</h2>
          <ul>
            {order.map((item, idx) => (
              <li key={idx}>
                {item.name} (${item.price})
              </li>
            ))}
          </ul>
          <button onClick={sendOrder}>Send Order via WhatsApp</button>
        </div>
      )}
    </div>
  );
}

export default App;
