"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/AdminLogin.css"

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setCredentials({
      ...credentials,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // No authentication check - allow any login
      localStorage.setItem("adminAuthenticated", "true")
      localStorage.setItem("adminUser", credentials.username || "Admin")

      // Redirect to admin dashboard
      setTimeout(() => {
        navigate("/admin/menu")
      }, 1000)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h2>Admin Login</h2>
          <p>Enter any credentials to access the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              placeholder="Enter any username or email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter any password"
            />
          </div>

          <button type="submit" className="admin-login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>
            Return to <a href="/">Home Page</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin
