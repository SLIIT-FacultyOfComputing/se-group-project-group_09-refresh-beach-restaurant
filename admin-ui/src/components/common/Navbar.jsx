"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import LoginModal from "./LoginModal"
import "../../styles/Navbar.css"

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLoginClick = () => {
    setShowLoginModal(true)
  }

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <h1>Refresh Beach</h1>
            <p>Authentic Sri Lankan Cuisine</p>
          </Link>

        

          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
            <li className="nav-item">
              <button className="nav-link" onClick={handleLoginClick}>
                Login
              </button>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">
                About
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
    </>
  )
}

export default Navbar


  
 
     



   
