import "../../styles/FeaturedItems.css"

function FeaturedItems() {
  // Mock data for featured menu items
  const featuredItems = [
    {
      id: 1,
      name: "Avocado Salad",
      category: "SALADS",
      price: 1400,
      description:
        "A refreshing salad featuring ripe avocado slices, crisp greens, and fresh vegetables, drizzled with a light vinaigrette for a healthy and delicious bite",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-puw0Nj9OkmEbW7wOI7zbeHACf53a36.png",
    },
    {
      id: 2,
      name: "Mixed Salad",
      category: "SALADS",
      price: 1198,
      description:
        "A simple yet flavorful salad of fresh tomatoes and crisp onions, lightly seasoned to enhance its natural taste — a perfect side to any meal.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-puw0Nj9OkmEbW7wOI7zbeHACf53a36.png",
    },
    {
      id: 3,
      name: "Tuna Fish or Prawn Salad",
      category: "SALADS",
      price: 1500,
      description: "Fresh tuna or succulent prawns served on a bed of mixed greens with a zesty dressing.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-puw0Nj9OkmEbW7wOI7zbeHACf53a36.png",
    },
    {
      id: 4,
      name: "Sri Lankan Rice and Curry",
      category: "MAIN",
      price: 1800,
      description: "Traditional Sri Lankan rice served with an assortment of flavorful curries and condiments.",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-puw0Nj9OkmEbW7wOI7zbeHACf53a36.png",
    },
  ]

  return (
    <section className="featured-items">
      <div className="section-header">
        <h2>Featured Menu Items</h2>
        <p>Discover our most popular dishes</p>
      </div>

      <div className="items-grid">
        {featuredItems.map((item) => (
          <div key={item.id} className="menu-item-card">
            <div className="item-image">
              <img src={item.image || "/placeholder.svg"} alt={item.name} />
              <span className="item-category">{item.category}</span>
            </div>

            <div className="item-content">
              <h3>{item.name}</h3>
              <p className="item-description">{item.description}</p>

              <div className="item-footer">
                <span className="item-price">LKR {item.price}</span>
                <div className="item-actions">
                  <button className="review-button">★ Review</button>
                  <button className="add-button">+ Add</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

     
    </section>
  )
}

export default FeaturedItems
