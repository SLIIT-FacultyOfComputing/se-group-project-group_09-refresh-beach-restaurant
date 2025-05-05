import "../../styles/AboutSection.css"

function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-text">
          <h2>About Refresh Beach</h2>
          <p>
            Welcome to Refresh Beach, where we bring the authentic flavors of Sri Lanka to your table. Our restaurant is
            dedicated to preserving traditional Sri Lankan cuisine while adding our own unique touch to create an
            unforgettable dining experience.
          </p>
          <p>
            Our chefs use only the freshest local ingredients and traditional spices to create dishes that capture the
            essence of Sri Lankan culinary heritage. From aromatic rice and curry to fresh seafood caught daily, every
            dish tells a story of our rich cultural traditions.
          </p>
          <button className="about-button">Learn More</button>
        </div>

        <div className="about-image">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-puw0Nj9OkmEbW7wOI7zbeHACf53a36.png"
            alt="Refresh Beach Restaurant"
          />
        </div>
      </div>
    </section>
  )
}

export default AboutSection
