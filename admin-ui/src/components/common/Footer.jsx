import "../../styles/Footer.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Refresh Beach</h3>
          <p>Authentic Sri Lankan Cuisine</p>
          <p>Bringing the flavors of Sri Lanka to your table since 2010.</p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>📍 123 Beach Road, Colombo, Sri Lanka</p>
          <p>📞 +94 123 456 789</p>
          <p>✉️ info@refreshbeach.com</p>
        </div>

        <div className="footer-section">
          <h3>Opening Hours</h3>
          <p>Monday - Friday: 11am - 10pm</p>
          <p>Saturday - Sunday: 10am - 11pm</p>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="#" className="social-link">
              Facebook
            </a>
            <a href="#" className="social-link">
              Instagram
            </a>
            <a href="#" className="social-link">
              Twitter
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Refresh Beach. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
