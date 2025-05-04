import React from "react";

const Cart = ({
  isOpen,
  onClose,
  cart,
  customizations,
  customizationOptions,
  onUpdateQuantity,
  onRemoveItem,
  onCustomize,
  getItemTotalPrice,
  calculateTotal,
  getCategoryIcon
}) => {
    
  const handleCheckout = async () => {
    const cartItemsToSend = cart.map((item) => {
      const customizationText = customizations[item.id]?.map((optionId) => {
        const option = customizationOptions.find((opt) => opt.id === optionId);
        return option ? option.name : "";
      }).join(", ");

      return {
        itemName: item.name,
        quantity: item.quantity,
        price: item.price,
        customization: customizationText || ""
      };
    });

    try {
      const response = await fetch("http://localhost:8080/api/cart/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cartItemsToSend)
      });

      if (response.ok) {
        console.log("Checkout successful!");
        alert("Order placed successfully!");
        setIsCartOpen(false); // Close cart after order
        // clearCart(); // Optional: if you have a clear cart function
      } else {
        console.error("Checkout failed.");
        alert("Checkout failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during checkout.");
    }
  };

 
  return (
    <div className={cart-sidebar ${isOpen ? "open" : ""}}>
      <div className="cart-header">
        <h3>Your Order</h3>
        <button className="close-cart" onClick={onClose}>
          ×
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p>Your cart is empty</p>
          <button className="browse-menu-btn" onClick={onClose}>
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
                        const option = customizationOptions.find((opt) => opt.id === optionId);
                        return option ? (
                          <span key={optionId} className="customization-tag">
                            {option.name} (+LKR {option.price})
                          </span>
                        ) : null;
                      })}
                    </div>
                  )}
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <div className="cart-item-buttons">
                    <button className="customize-item" onClick={() => onCustomize(item.id)}>
                      <span>✏</span> Customize
                    </button>
                    <button className="remove-item" onClick={() => onRemoveItem(item.id)}>
                      <span>🗑</span>
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
            <button className="checkout-btn" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
