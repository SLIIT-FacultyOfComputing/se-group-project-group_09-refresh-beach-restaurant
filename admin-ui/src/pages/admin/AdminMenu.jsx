"use client"

import { useEffect, useState } from "react"
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from "../../menuService"
import "./AdminMenu.css"

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    foodType: "",
  })

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    const response = await getMenuItems()
    setMenuItems(response.data)
  }

  const handleInputChange = (e) => {
    setNewMenuItem({ ...newMenuItem, [e.target.name]: e.target.value })
  }

  const handleAddMenuItem = async () => {
    await createMenuItem(newMenuItem)
    fetchMenuItems()
    setNewMenuItem({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      foodType: "",
    })
  }

  const handleEditMenuItem = async (id) => {
    const item = menuItems.find((m) => m.id === id)
    const updatedName = prompt("Update Name:", item.name)
    const updatedDescription = prompt("Update Description:", item.description)
    const updatedPrice = prompt("Update Price:", item.price)
    const updatedImage = prompt("Update Image URL:", item.imageUrl)
    const updatedType = prompt("Update Food Type:", item.foodType)

    if (updatedName && updatedDescription && updatedPrice && updatedImage && updatedType) {
      await updateMenuItem(id, {
        name: updatedName,
        description: updatedDescription,
        price: Number.parseFloat(updatedPrice),
        imageUrl: updatedImage,
        foodType: updatedType,
      })
      fetchMenuItems()
    }
  }

  const handleDeleteMenuItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteMenuItem(id)
      fetchMenuItems()
    }
  }

  // Function to get the appropriate icon for each food type
  const getCategoryIcon = (type) => {
    switch (type?.toLowerCase()) {
      case "breakfast":
        return "☕"
      case "cocktails":
        return "🍸"
      case "salads":
        return "🥗"
      case "chopsuey":
        return "🥢"
      case "vegetarian meals":
        return "🥬"
      case "indian food":
        return "🍛"
      case "italian food":
        return "🍝"
      case "prawns":
        return "🦐"
      case "lobster":
        return "🦞"
      case "crab":
        return "🦀"
      case "cuttle fish":
        return "🦑"
      case "fish":
        return "🐟"
      case "beef":
        return "🥩"
      case "chicken":
        return "🍗"
      case "sri lanka special":
        return "🇱🇰"
      case "pancake":
        return "🥞"
      case "fruits":
        return "🍎"
      case "sri lanka desserts":
        return "🍮"
      case "beverages":
        return "🥤"
      case "fresh fruit juices":
        return "🧃"
      default:
        return "📋"
    }
  }

  // Food type options with icons
  const foodTypeOptions = [
    { value: "BREAKFAST", label: "BREAKFAST", icon: "☕" },
    { value: "COCKTAILS", label: "COCKTAILS", icon: "🍸" },
    { value: "SALADS", label: "SALADS", icon: "🥗" },
    { value: "CHOPSUEY", label: "CHOPSUEY", icon: "🥢" },
    { value: "VEGETARIAN MEALS", label: "VEGETARIAN MEALS", icon: "🥬" },
    { value: "INDIAN FOOD", label: "INDIAN FOOD", icon: "🍛" },
    { value: "ITALIAN FOOD", label: "ITALIAN FOOD", icon: "🍝" },
    { value: "PRAWNS", label: "PRAWNS", icon: "🦐" },
    { value: "LOBSTER", label: "LOBSTER", icon: "🦞" },
    { value: "CRAB", label: "CRAB", icon: "🦀" },
    { value: "CUTTLE FISH", label: "CUTTLE FISH", icon: "🦑" },
    { value: "FISH", label: "FISH", icon: "🐟" },
    { value: "BEEF", label: "BEEF", icon: "🥩" },
    { value: "CHICKEN", label: "CHICKEN", icon: "🍗" },
    { value: "SRI LANKA SPECIAL", label: "SRI LANKA SPECIAL", icon: "🇱🇰" },
    { value: "PANCAKE", label: "PANCAKE", icon: "🥞" },
    { value: "FRUITS", label: "FRUITS", icon: "🍎" },
    { value: "SRI LANKA DESSERTS", label: "SRI LANKA DESSERTS", icon: "🍮" },
    { value: "BEVERAGES", label: "BEVERAGES", icon: "🥤" },
    { value: "FRESH FRUIT JUICES", label: "FRESH FRUIT JUICES", icon: "🧃" },
  ]

  return (
    <div className="admin-container elegant-theme">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Refresh Beach</h2>
          <p>Admin Dashboard</p>
        </div>
        <ul className="admin-nav">
          <li className="active">
            <span className="admin-icon">🍽️</span> Menu Management
          </li>
          <li>
            <span className="admin-icon">📊</span> Dashboard
          </li>
          <li>
            <span className="admin-icon">🛒</span> Orders
          </li>
          <li>
            <span className="admin-icon">👥</span> Customers
          </li>
          <li>
            <span className="admin-icon">⚙️</span> Settings
          </li>
        </ul>
      </div>

      <div className="admin-content">
        <header className="admin-header">
          <h1>Menu Management</h1>
          <div className="admin-user">
            <span>Admin User</span>
            <button className="logout-btn">Logout</button>
          </div>
        </header>

        {/* Add New Menu Item Form */}
        <div className="admin-card">
          <h3>Add New Menu Item</h3>
          <div className="admin-form">
            <div className="form-row">
              <div className="form-group">
                <label>Food Name</label>
                <input
                  type="text"
                  name="name"
                  value={newMenuItem.name}
                  onChange={handleInputChange}
                  placeholder="Enter food name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  value={newMenuItem.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Price (LKR)</label>
                <input
                  type="number"
                  name="price"
                  value={newMenuItem.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  required
                />
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={newMenuItem.imageUrl}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                  required
                />
              </div>
              <div className="form-group">
                <label>Food Type</label>
                <select
                  name="foodType"
                  value={newMenuItem.foodType}
                  onChange={handleInputChange}
                  required
                  className="food-type-select"
                >
                  <option value="">Select Type</option>
                  {foodTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.icon} {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-actions">
              <button onClick={handleAddMenuItem} className="add-btn">
                Add Menu Item
              </button>
            </div>
          </div>
        </div>

        {/* List of Menu Items */}
        <div className="admin-card">
          <h3>Menu Items</h3>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="menu-item-image" />
                    </td>
                    <td>
                      <span className="food-type">
                        <span className="type-icon">{getCategoryIcon(item.foodType)}</span>
                        {item.foodType}
                      </span>
                    </td>
                    <td>{item.name}</td>
                    <td className="description-cell">{item.description}</td>
                    <td>LKR {item.price}</td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn" onClick={() => handleEditMenuItem(item.id)}>
                          Edit
                        </button>
                        <button className="delete-btn" onClick={() => handleDeleteMenuItem(item.id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMenu;
