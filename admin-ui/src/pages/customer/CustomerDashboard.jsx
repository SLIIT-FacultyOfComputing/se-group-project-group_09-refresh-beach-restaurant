"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/CustomerDashboard.css"

// Replace the lucide-react icons with simple emoji or text alternatives
const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("customerAuthenticated")
    navigate("/")
  }

  const handleMenuClick = () => {
    navigate("/customer/menu")
  }

  const renderContent = () => {
    switch (activeTab) {
      case "menu":
        return handleMenuClick()
      case "reservations":
        return (
          <div className="dashboard-content-placeholder">
            <h2>My Reservations</h2>
            <p>You have no upcoming reservations.</p>
            <button className="primary-button">Make a Reservation</button>
          </div>
        )
      case "profile":
        return (
          <div className="dashboard-content-placeholder">
            <h2>My Profile</h2>
            <div className="profile-info">
              <div className="profile-avatar">
                <span>JD</span>
              </div>
              <div className="profile-details">
                <h3>John Doe</h3>
                <p>john.doe@example.com</p>
                <p>+94 123 456 789</p>
              </div>
            </div>
            <button className="primary-button">Edit Profile</button>
          </div>
        )
      case "favorites":
        return (
          <div className="dashboard-content-placeholder">
            <h2>My Favorites</h2>
            <p>You haven't added any favorites yet.</p>
            <button className="primary-button" onClick={() => setActiveTab("menu")}>
              Browse Menu
            </button>
          </div>
        )
      default:
        return (
          <div className="dashboard-content-placeholder">
            <h2>Welcome</h2>
            <p>Explore your account, make reservations, or browse our menu.</p>
            <div className="dashboard-quick-actions">
              <button className="action-card" onClick={() => setActiveTab("reservations")}>
                <span className="icon">📅</span>
                <span>Make a Reservation</span>
              </button>
              <button className="action-card" onClick={() => setActiveTab("menu")}>
                <span className="icon">🍽️</span>
                <span>Browse Menu</span>
              </button>
              <button className="action-card" onClick={() => setActiveTab("profile")}>
                <span className="icon">👤</span>
                <span>Update Profile</span>
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="customer-dashboard">
      <header className="dashboard-header">
        <div className="restaurant-logo">
          <h1>Refresh Beach</h1>
          <p>Authentic Sri Lankan Cuisine</p>
        </div>
        <div className="user-actions">
          <span className="user-greeting"></span>
          <button className="logout-button" onClick={handleLogout}>
            <span className="icon">🚪</span>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-container">
        <nav className="dashboard-nav">
          <ul>
            <li className={activeTab === "reservations" ? "active" : ""}>
              <button onClick={() => setActiveTab("reservations")}>
                <span className="icon">📅</span>
                <span>Reservations</span>
              </button>
            </li>
            <li className={activeTab === "profile" ? "active" : ""}>
              <button onClick={() => setActiveTab("profile")}>
                <span className="icon">👤</span>
                <span>My Profile</span>
              </button>
            </li>
            <li className={activeTab === "menu" ? "active" : ""}>
              <button onClick={() => setActiveTab("menu")}>
                <span className="icon">🍽️</span>
                <span>Customer Menu</span>
              </button>
            </li>
            <li className={activeTab === "favorites" ? "active" : ""}>
              <button onClick={() => setActiveTab("favorites")}>
                <span className="icon">❤️</span>
                <span>Favorites</span>
              </button>
            </li>
          </ul>
        </nav>

        <main className="dashboard-content">{renderContent()}</main>
      </div>
    </div>
  )
}

export default CustomerDashboard
