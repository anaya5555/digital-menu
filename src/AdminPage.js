// src/AdminPage.js
import React, { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

function AdminPage() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    category: "",
    name: "",
    description: "",
    price: "",
  });

  const menuRef = collection(db, "menuItems");

  // Load existing items from Firestore
  const loadItems = async () => {
    const snapshot = await getDocs(menuRef);
    const list = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(list);
  };

  useEffect(() => {
    loadItems();
  }, []);

  // Add new item
  const addItem = async () => {
    await addDoc(menuRef, {
      category: newItem.category,
      name: newItem.name,
      description: newItem.description,
      price: parseFloat(newItem.price),
    });
    setNewItem({ category: "", name: "", description: "", price: "" });
    loadItems();
  };

  // Delete item
  const deleteItem = async (id) => {
    await deleteDoc(doc(db, "menuItems", id));
    loadItems();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>Admin Dashboard</h1>

      <h2>Add Menu Item</h2>
      <input
        placeholder="Category"
        value={newItem.category}
        onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
      />
      <input
        placeholder="Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        placeholder="Description"
        value={newItem.description}
        onChange={(e) =>
          setNewItem({ ...newItem, description: e.target.value })
        }
      />
      <input
        placeholder="Price"
        type="number"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <button onClick={addItem}>Add</button>

      <h2>Current Menu Items</h2>
      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: "10px" }}>
          <strong>{item.name}</strong> ({item.category}) - ${item.price}
          <br />
          <small>{item.description}</small>
          <br />
          <button onClick={() => deleteItem(item.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
