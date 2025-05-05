"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../../styles/LoginModal.css"

function LoginModal({ onClose }) {
  const [activeTab, setActiveTab] = useState("customer")
  const [isLogin, setIsLogin] = useState(true)
  const [customerFormData, setCustomerFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  })
  const [adminFormData, setAdminFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleCustomerChange = (e) => {
    setCustomerFormData({
      ...customerFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleAdminChange = (e) => {
    setAdminFormData({
      ...adminFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleCustomerSubmit = (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (isLogin) {
      // Login logic
      if (!customerFormData.email || !customerFormData.password) {
        setError("Please fill in all fields")
        setLoading(false)
        return
      }

      // Accept any email for customer login
      setTimeout(() => {
        console.log("Customer logging in with:", customerFormData.email)
        localStorage.setItem("customerAuthenticated", "true")
        localStorage.setItem("customerUser", customerFormData.email)
        setLoading(false)
        onClose()
        navigate("/customer/dashboard")
      }, 1000)
    } else {
      // Signup logic
      if (
        !customerFormData.name ||
        !customerFormData.email ||
        !customerFormData.password ||
        !customerFormData.confirmPassword
      ) {
        setError("Please fill in all fields")
        setLoading(false)
        return
      }

      if (customerFormData.password !== customerFormData.confirmPassword) {
        setError("Passwords do not match")
        setLoading(false)
        return
      }

      // Accept any email for customer signup
      setTimeout(() => {
        console.log("Customer signing up with:", customerFormData)
        localStorage.setItem("customerAuthenticated", "true")
        localStorage.setItem("customerUser", customerFormData.email)
        setLoading(false)
        onClose()
        navigate("/customer/dashboard")
      }, 1000)
    }
  }

  const handleAdminSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // No authentication check - allow any admin login
    setTimeout(() => {
      console.log("Admin logging in with:", adminFormData.username)
      localStorage.setItem("adminAuthenticated", "true")
      localStorage.setItem("adminUser", adminFormData.username || "Admin")
      setLoading(false)
      onClose()
      navigate("/admin/menu")
    }, 1000)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="modal-tabs">
          <button
            className={`tab-button ${activeTab === "customer" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("customer")
              setError("")
            }}
          >
            Customer
          </button>
          <button
            className={`tab-button ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("admin")
              setError("")
            }}
          >
            Admin
          </button>
        </div>

        {activeTab === "customer" && (
          <div className="tab-content">
            <div className="modal-header">
              <h2>{isLogin ? "Customer Login" : "Create Account"}</h2>
              <p>Access the Refresh Beach menu</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleCustomerSubmit}>
              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={customerFormData.name}
                    onChange={handleCustomerChange}
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={customerFormData.email}
                  onChange={handleCustomerChange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={customerFormData.password}
                  onChange={handleCustomerChange}
                  placeholder="Enter your password"
                />
              </div>

              {!isLogin && (
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={customerFormData.confirmPassword}
                    onChange={handleCustomerChange}
                    placeholder="Confirm your password"
                  />
                </div>
              )}

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <div className="modal-footer">
              <p>
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button className="toggle-form-button" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        )}

        {activeTab === "admin" && (
          <div className="tab-content">
            <div className="modal-header">
              <h2>Admin Login</h2>
              <p>Access the admin dashboard</p>
            </div>

            <form onSubmit={handleAdminSubmit}>
              <div className="form-group">
                <label htmlFor="adminUsername">Username</label>
                <input
                  type="text"
                  id="adminUsername"
                  name="username"
                  value={adminFormData.username}
                  onChange={handleAdminChange}
                  placeholder="Enter any username or email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="adminPassword">Password</label>
                <input
                  type="password"
                  id="adminPassword"
                  name="password"
                  value={adminFormData.password}
                  onChange={handleAdminChange}
                  placeholder="Enter any password"
                />
              </div>

              <button type="submit" className="submit-button" disabled={loading}>
                {loading ? "Processing..." : "Login"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginModal
