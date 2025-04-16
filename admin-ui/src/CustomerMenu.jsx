import { useState, useEffect } from "react";
import "./CustomerMenu.css"; // Import CSS file for styling
import Navbar from "./Navbar";

const CustomerMenu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/menu") // Ensure API is running
      .then((response) => response.json())
      .then((data) => setMenuItems(data))
      .catch((error) => console.error("Error fetching menu items:", error));
  }, []);

  return (
    <div className="customer-menu-container">
      <Navbar />
      <h2 className="menu-heading">Our Menu</h2>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-card">
            <img src={item.imageUrl} alt={item.name} className="menu-image" />
            <h3 className="menu-title">{item.name}</h3>
            <p className="menu-description">{item.description}</p>
            <p className="menu-price"><strong>Price: LKR {item.price}</strong></p>
            <button className="order-btn">Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerMenu;
