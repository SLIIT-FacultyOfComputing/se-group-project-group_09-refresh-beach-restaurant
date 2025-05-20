"use client"

import { useState, useEffect } from "react"
import Cookies from "js-cookie"
import "./CustomerMenu.css"

const CustomerMenu = () => {
  const [menuItems, setMenuItems] = useState([])
  const [groupedMenu, setGroupedMenu] = useState({})
  const [cart, setCart] = useState([])
  const [selectedType, setSelectedType] = useState("All")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [customizingItem, setCustomizingItem] = useState(null)
  const [showCustomizeModal, setShowCustomizeModal] = useState(false)
  const [customizations, setCustomizations] = useState({})
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [reviewItem, setReviewItem] = useState(null)
  const [reviewText, setReviewText] = useState("")
  const [reviewRating, setReviewRating] = useState(5)
  const [reviews, setReviews] = useState({})

  // Add a new state for the search query near the other state declarations
  const [searchQuery, setSearchQuery] = useState("")

  // Available customization options
  const customizationOptions = [
    { id: 1, name: "Add Cheese", price: 50 },
    { id: 2, name: "Add Pepper", price: 30 },
    { id: 3, name: "Add Jam", price: 40 },
    { id: 4, name: "Extra Spicy", price: 20 },
    { id: 5, name: "Add Avocado", price: 80 },
    { id: 6, name: "Add Bacon", price: 70 },
    { id: 7, name: "Gluten Free", price: 60 },
    { id: 8, name: "Add Sauce", price: 25 },
  ]

  useEffect(() => {
    fetch("http://localhost:8080/api/menu")
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data)
        const grouped = data.reduce((acc, item) => {
          const type = item.foodType || "Others"
          if (!acc[type]) {
            acc[type] = []
          }
          acc[type].push(item)
          return acc
        }, {})
        setGroupedMenu(grouped)
      })
      .catch((error) => console.error("Error fetching menu:", error))

    const savedCart = Cookies.get("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error parsing cart data:", error)
        Cookies.remove("cart")
      }
    }

    // Load saved customizations
    const savedCustomizations = Cookies.get("customizations")
    if (savedCustomizations) {
      try {
        setCustomizations(JSON.parse(savedCustomizations))
      } catch (error) {
        console.error("Error parsing customizations data:", error)
        Cookies.remove("customizations")
      }
    }

    // Load saved reviews
    const savedReviews = Cookies.get("reviews")
    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews))
      } catch (error) {
        console.error("Error parsing reviews data:", error)
        Cookies.remove("reviews")
      }
    }
  }, [])

  const addToCart = (menuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === menuItem.id)
      let updatedCart

      if (existingItem) {
        updatedCart = prevCart.map((item) =>
          item.id === menuItem.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        updatedCart = [
          ...prevCart,
          {
            id: menuItem.id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
            foodType: menuItem.foodType,
            imageUrl: menuItem.imageUrl,
          },
        ]
      }

      Cookies.set("cart", JSON.stringify(updatedCart), {
        expires: 7,
        path: "/",
        domain: "localhost",
        secure: false,
        sameSite: "Lax",
      })

      return updatedCart
    })

    // Show a toast notification instead of an alert
    showToast("Item added to cart successfully!")
  }

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId)
      Cookies.set("cart", JSON.stringify(updatedCart), {
        expires: 7,
        path: "/",
        domain: "localhost",
        secure: false,
        sameSite: "Lax",
      })
      return updatedCart
    })

    // Also remove any customizations for this item
    setCustomizations((prev) => {
      const updated = { ...prev }
      delete updated[itemId]
      Cookies.set("customizations", JSON.stringify(updated), {
        expires: 7,
        path: "/",
        domain: "localhost",
        secure: false,
        sameSite: "Lax",
      })
      return updated
    })
  }

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return

    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
      Cookies.set("cart", JSON.stringify(updatedCart), {
        expires: 7,
        path: "/",
        domain: "localhost",
        secure: false,
        sameSite: "Lax",
      })
      return updatedCart
    })
  }

  const handleCustomize = (itemId) => {
    const item = cart.find((item) => item.id === itemId)
    setCustomizingItem(item)
    setShowCustomizeModal(true)
  }

  const handleReview = (item) => {
    setReviewItem(item)
    setReviewText("")
    setReviewRating(5)
    setShowReviewModal(true)
  }

  const submitReview = () => {
    if (!reviewItem || !reviewText.trim()) return

    const newReview = {
      id: Date.now(),
      itemId: reviewItem.id,
      rating: reviewRating,
      text: reviewText,
      date: new Date().toISOString(),
      userName: "Customer", // In a real app, this would be the logged-in user's name
    }

    setReviews((prev) => {
      const itemReviews = prev[reviewItem.id] || []
      const updated = {
        ...prev,
        [reviewItem.id]: [...itemReviews, newReview],
      }

      // Save to cookies
      Cookies.set("reviews", JSON.stringify(updated), {
        expires: 30,
        path: "/",
        domain: "localhost",
        secure: false,
        sameSite: "Lax",
      })

      return updated
    })

    setShowReviewModal(false)
    showToast("Thank you for your review!")
  }

  const handleCustomizationChange = (optionId) => {
    if (!customizingItem) return

    setCustomizations((prev) => {
      const itemId = customizingItem.id
      const currentItemCustomizations = prev[itemId] || []

      let updatedItemCustomizations
      if (currentItemCustomizations.includes(optionId)) {
        // Remove option if already selected
        updatedItemCustomizations = currentItemCustomizations.filter((id) => id !== optionId)
      } else {
        // Add option if not already selected
        updatedItemCustomizations = [...currentItemCustomizations, optionId]
      }

      const updated = {
        ...prev,
        [itemId]: updatedItemCustomizations,
      }

      // Save to cookies
      Cookies.set("customizations", JSON.stringify(updated), {
        expires: 7,
        path: "/",
        domain: "localhost",
        secure: false,
        sameSite: "Lax",
      })

      return updated
    })
  }

  const saveCustomizations = () => {
    setShowCustomizeModal(false)
    showToast("Customizations saved!")
  }

  const getItemCustomizationPrice = (itemId) => {
    if (!customizations[itemId]) return 0

    return customizations[itemId].reduce((total, optionId) => {
      const option = customizationOptions.find((opt) => opt.id === optionId)
      return total + (option ? option.price : 0)
    }, 0)
  }

  const getItemTotalPrice = (item) => {
    const basePrice = item.price
    const customizationPrice = getItemCustomizationPrice(item.id)
    return (basePrice + customizationPrice) * item.quantity
  }

  const getAverageRating = (itemId) => {
    const itemReviews = reviews[itemId] || []
    if (itemReviews.length === 0) return 0

    const sum = itemReviews.reduce((total, review) => total + review.rating, 0)
    return (sum / itemReviews.length).toFixed(1)
  }

  const handleTypeSelect = (type) => {
    setSelectedType(type)
    // Scroll to top when changing category
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const showToast = (message) => {
    const toast = document.createElement("div")
    toast.className = "toast-notification"
    toast.innerHTML = `<div class="toast-icon">✅</div><div class="toast-message">${message}</div>`
    document.body.appendChild(toast)

    setTimeout(() => {
      toast.classList.add("show")
    }, 100)

    setTimeout(() => {
      toast.classList.remove("show")
      setTimeout(() => {
        document.body.removeChild(toast)
      }, 300)
    }, 3000)
  }

  // Function to get the appropriate icon for each food type - updated to match AdminMenu
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
        return "🍴"
    }
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + getItemTotalPrice(item), 0)
  }

  const renderStars = (rating, interactive = false) => {
    return (
      <div className={`rating-stars ${interactive ? "interactive" : ""}`}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "filled" : ""}`}
            onClick={interactive ? () => setReviewRating(star) : undefined}
          >
            ★
          </span>
        ))}
      </div>
    )
  }

  // Add a search function that filters menu items based on the search query
  const filteredMenuItems = (items) => {
    if (!searchQuery.trim()) return items

    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.foodType && item.foodType.toLowerCase().includes(searchQuery.toLowerCase())),
    )
  }

  // Add an alternative rendering method for the menu card footer that matches the image
  // Replace the existing renderMenuItems function with this updated version

  const renderMenuItems = () => {
    if (selectedType === "All") {
      return Object.keys(groupedMenu)
        .map((type) => {
          const filteredItems = filteredMenuItems(groupedMenu[type])

          // Skip rendering empty categories when searching
          if (searchQuery && filteredItems.length === 0) return null

          return (
            <div key={type} className="food-category-section">
              <h3 className="category-heading">
                <span className="category-icon">{getCategoryIcon(type)}</span>
                {type.toUpperCase()}
              </h3>
              <div className="menu-grid">
                {filteredItems.map((item) => (
                  <div key={item.id} className="menu-card">
                    <div className="menu-image-container">
                      <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="menu-image" />
                      <div className="food-type-badge">
                        <span className="type-icon">{getCategoryIcon(item.foodType)}</span>
                        <span>{item.foodType}</span>
                      </div>
                    </div>
                    <div className="menu-card-content">
                      <h4>{item.name}</h4>
                      <div className="menu-item-rating">
                        {renderStars(getAverageRating(item.id))}
                        <span className="review-count">
                          {reviews[item.id] ? `(${reviews[item.id].length})` : "(0)"}
                        </span>
                      </div>
                      <p className="menu-description">{item.description}</p>
                      <div className="menu-card-footer">
                        <p className="price">LKR {item.price}</p>
                        <div className="menu-card-actions-compact">
                          <button className="action-button review-button" onClick={() => handleReview(item)}>
                            <span>★</span> Review
                          </button>
                          <button className="action-button add-button" onClick={() => addToCart(item)}>
                            <span>🛒</span> Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })
        .filter(Boolean) // Filter out null values (empty categories)
    } else {
      const filteredItems = filteredMenuItems(groupedMenu[selectedType] || [])

      return (
        <div className="food-category-section">
          <h3 className="category-heading">
            <span className="category-icon">{getCategoryIcon(selectedType)}</span>
            {selectedType.toUpperCase()}
          </h3>
          <div className="menu-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="menu-card">
                <div className="menu-image-container">
                  <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} className="menu-image" />
                  <div className="food-type-badge">
                    <span className="type-icon">{getCategoryIcon(item.foodType)}</span>
                    <span>{item.foodType}</span>
                  </div>
                </div>
                <div className="menu-card-content">
                  <h4>{item.name}</h4>
                  <div className="menu-item-rating">
                    {renderStars(getAverageRating(item.id))}
                    <span className="review-count">{reviews[item.id] ? `(${reviews[item.id].length})` : "(0)"}</span>
                  </div>
                  <p className="menu-description">{item.description}</p>
                  <div className="menu-card-footer">
                    <p className="price">LKR {item.price}</p>
                    <div className="menu-card-actions-compact">
                      <button className="action-button review-button" onClick={() => handleReview(item)}>
                        <span>★</span> Review
                      </button>
                      <button className="action-button add-button" onClick={() => addToCart(item)}>
                        <span>🛒</span> Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    }
  }

  const renderCustomizationOptions = () => {
    if (!customizingItem) return null

    const itemCustomizations = customizations[customizingItem.id] || []

    return (
      <div className="customization-options">
        {customizationOptions.map((option) => (
          <label key={option.id} className="customization-option">
            <input
              type="checkbox"
              checked={itemCustomizations.includes(option.id)}
              onChange={() => handleCustomizationChange(option.id)}
            />
            <span className="option-name">{option.name}</span>
            <span className="option-price">LKR {option.price}</span>
          </label>
        ))}
      </div>
    )
  }

  return (
    <div className="customer-menu-container elegant-theme">
      <div className="menu-header">
        <div className="restaurant-branding">
          <h1>Refresh Beach</h1>
          <p>Authentic Sri Lankan Cuisine</p>
        </div>

        <div className="header-search">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for dishes, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search" onClick={() => setSearchQuery("")}>
                ×
              </button>
            )}
          </div>
          {searchQuery && <div className="search-results-info">Showing results for "{searchQuery}"</div>}
        </div>

        <div className="cart-summary" onClick={() => setIsCartOpen(true)}>
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{cart.length}</span>
        </div>
      </div>

      <div className="menu-content">
        <div className="sidebar">
          <div className="sidebar-header">
            <h3>Menu Categories</h3>
          </div>
          <ul className="category-list">
            <li className={selectedType === "All" ? "active" : ""} onClick={() => handleTypeSelect("All")}>
              <span className="category-icon">🍽️</span>
              <span>All Items</span>
            </li>
            {Object.keys(groupedMenu).map((type) => (
              <li key={type} className={selectedType === type ? "active" : ""} onClick={() => handleTypeSelect(type)}>
                <span className="category-icon">{getCategoryIcon(type)}</span>
                <span>{type}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="menu-display">
          <div className="menu-banner">
            <h2>Our Delicious Menu</h2>
            <p>Experience the authentic flavors of Sri Lanka</p>
          </div>
          {renderMenuItems()}
        </div>
      </div>

      {/* Cart Sidebar */}
      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Your Order</h3>
          <button className="close-cart" onClick={() => setIsCartOpen(false)}>
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <p>Your cart is empty</p>
            <button className="browse-menu-btn" onClick={() => setIsCartOpen(false)}>
              Browse Menu
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.imageUrl || "/placeholder.svg"} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">LKR {item.price}</p>
                    {customizations[item.id] && customizations[item.id].length > 0 && (
                      <div className="cart-item-customizations">
                        {customizations[item.id].map((optionId) => {
                          const option = customizationOptions.find((opt) => opt.id === optionId)
                          return option ? (
                            <span key={optionId} className="customization-tag">
                              {option.name} (+LKR {option.price})
                            </span>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <div className="cart-item-buttons">
                      <button className="customize-item" onClick={() => handleCustomize(item.id)}>
                        <span>✏️</span> Customize
                      </button>
                      <button className="remove-item" onClick={() => removeFromCart(item.id)}>
                        <span>🗑️</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total:</span>
                <span>LKR {calculateTotal()}</span>
              </div>
              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>

      {/* Customization Modal */}
      {showCustomizeModal && customizingItem && (
        <div className="customization-modal-overlay">
          <div className="customization-modal">
            <div className="customization-modal-header">
              <h3>Customize Your Order</h3>
              <button className="close-modal" onClick={() => setShowCustomizeModal(false)}>
                ×
              </button>
            </div>

            <div className="customization-modal-content">
              <div className="customization-item-details">
                <div className="customization-item-image">
                  <img src={customizingItem.imageUrl || "/placeholder.svg"} alt={customizingItem.name} />
                </div>
                <div className="customization-item-info">
                  <h4>{customizingItem.name}</h4>
                  <p className="customization-item-type">
                    <span className="type-icon">{getCategoryIcon(customizingItem.foodType)}</span>
                    {customizingItem.foodType}
                  </p>
                  <p className="customization-item-price">Base Price: LKR {customizingItem.price}</p>
                </div>
              </div>

              <div className="customization-section">
                <h4>Select Your Add-ons</h4>
                {renderCustomizationOptions()}
              </div>

              <div className="customization-summary">
                <div className="customization-total">
                  <span>Total Price:</span>
                  <span>LKR {customizingItem.price + getItemCustomizationPrice(customizingItem.id)}</span>
                </div>
              </div>
            </div>

            <div className="customization-modal-footer">
              <button className="cancel-btn" onClick={() => setShowCustomizeModal(false)}>
                Cancel
              </button>
              <button className="save-customization-btn" onClick={saveCustomizations}>
                Save Customizations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && reviewItem && (
        <div className="review-modal-overlay">
          <div className="review-modal">
            <div className="review-modal-header">
              <h3>Write a Review</h3>
              <button className="close-modal" onClick={() => setShowReviewModal(false)}>
                ×
              </button>
            </div>

            <div className="review-modal-content">
              <div className="review-item-details">
                <div className="review-item-image">
                  <img src={reviewItem.imageUrl || "/placeholder.svg"} alt={reviewItem.name} />
                </div>
                <div className="review-item-info">
                  <h4>{reviewItem.name}</h4>
                  <p className="review-item-type">
                    <span className="type-icon">{getCategoryIcon(reviewItem.foodType)}</span>
                    {reviewItem.foodType}
                  </p>
                </div>
              </div>

              <div className="review-form">
                <div className="review-rating-section">
                  <h4>Your Rating</h4>
                  {renderStars(reviewRating, true)}
                </div>

                <div className="review-text-section">
                  <h4>Your Review</h4>
                  <textarea
                    className="review-textarea"
                    placeholder="Share your experience with this dish..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    rows={5}
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="review-modal-footer">
              <button className="cancel-btn" onClick={() => setShowReviewModal(false)}>
                Cancel
              </button>
              <button className="submit-review-btn" onClick={submitReview} disabled={!reviewText.trim()}>
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for when cart is open */}
      {isCartOpen && <div className="overlay" onClick={() => setIsCartOpen(false)}></div>}
    </div>
  )
}

export default CustomerMenu





