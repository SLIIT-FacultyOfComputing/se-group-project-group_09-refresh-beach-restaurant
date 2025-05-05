import "../../styles/HeroSection.css"

function HeroSection() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Experience Authentic Sri Lankan Cuisine</h1>
        <p>Indulge in the rich flavors and spices of traditional Sri Lankan dishes</p>
        <div className="hero-buttons">
          <button className="primary-button">View Menu</button>
          <button className="secondary-button">Make Reservation</button>
        </div>
      </div>

      <div className="hero-info">
        <div className="info-card">
          <span className="info-icon">🕒</span>
          <div>
            <h3>Opening Hours</h3>
            <p>Mon-Fri: 11am-10pm</p>
            <p>Sat-Sun: 10am-11pm</p>
          </div>
        </div>

        <div className="info-card">
          <span className="info-icon">📍</span>
          <div>
            <h3>Location</h3>
            <p>123 Beach Road</p>
            <p>Colombo, Sri Lanka</p>
          </div>
        </div>

        <div className="info-card">
          <span className="info-icon">📞</span>
          <div>
            <h3>Contact</h3>
            <p>+94 123 456 789</p>
            <p>info@refreshbeach.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
