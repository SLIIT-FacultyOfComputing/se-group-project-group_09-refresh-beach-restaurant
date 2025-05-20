"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import CustomizeItem from "./customize-item"

// Modal overlay for the customization component
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  overflow-y: auto;
`

// Global styles for the font
const GlobalStyle = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
`

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  padding: 10px;
`

const EmptyCartContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  text-align: center;
  padding: 4rem 1rem;
`

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: rgb(156, 2, 2);
`

const EmptyCartTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const EmptyCartText = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

const CardContent = styled.div`
  padding: 1.5rem;
`

const CartContent = styled.div`
  padding-right: 0.5rem;
`

const CartItem = styled.div`
  margin-bottom: 1.5rem;
`

const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
`

const ImageContainer = styled.div`
  position: relative;
  height: 5rem;
  width: 5rem;
  flex-shrink: 0;
  border-radius: 0.25rem;
  overflow: hidden;
`

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ItemDetails = styled.div`
  flex-grow: 1;
`

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const ItemName = styled.h3`
  font-weight: 500;
  margin-bottom: 0.02rem;
`

const ItemPrice = styled.span`
  font-weight: 500;
`

const ItemDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
`

const ItemActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
`

const QuantityButton = styled.button`
  background: none;
  border: none;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const QuantityText = styled.span`
  width: 2rem;
  text-align: center;
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  color:rgb(136, 28, 28);
  cursor: pointer;
  font-size: 0.875rem;
  
  &:hover {
    text-decoration: underline;
  }
`

const CustomizeButton = styled.button`
  background-color:rgb(108, 5, 5);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    background-color:rgb(156, 15, 15);
  }
`

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #e5e7eb;
  margin-top: 1.5rem;
`

const SummaryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`

const SummaryLabel = styled.span`
  color: #6b7280;
`

const SummaryValue = styled.span``

const TotalItem = styled(SummaryItem)`
  font-weight: 600;
`

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
`

const PrimaryButton = styled(Button)`
  background-color:rgb(108, 5, 5);
  color: white;
  border: none;
  
  width: 100%;
  padding: 0.75rem 1.5rem;
  margin-top: 1.5rem;
  
  &:hover {
    background-color: rgb(156, 15, 15);
  }
`

const OutlineButton = styled(Button)`
  background-color: rgb(222, 225, 233);
  color: #0f172a;
  border: 3px solid #e5e7eb;
  width: 30%;
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 500;
  
  &:hover {
    background-color: rgb(178, 180, 190);
  }
`

const DeliveryNote = styled.p`
  font-size: 0.75rem;
  text-align: center;
  color: #6b7280;
  margin-top: 1rem;
`

const ErrorContainer = styled.div`
  background-color: #fee2e2;
  border: 1px solid #ef4444;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1.5rem;
  color: #b91c1c;
`

const RetryButton = styled(Button)`
  background-color: #0f172a;
  color: white;
  border: none;
  margin-top: 0.5rem;
  
  &:hover {
    background-color: #1e293b;
  }
`

// Display customizations if any
const CustomizationDetails = styled.div`
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
  padding-left: 0.5rem;
  border-left: 2px solid #e5e7eb;
`

const CustomizationItem = styled.div`
  margin-bottom: 0.25rem;
`

// Loading indicator
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  color: white;
  flex-direction: column;
`

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

// Icons
const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
)

const CustomizeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ marginRight: "0.5rem" }}
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

export default function CartPage() {
  const navigate = useNavigate()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [usingMockData, setUsingMockData] = useState(false)
  // Add state for tracking which item is being customized
  const [customizingItem, setCustomizingItem] = useState(null)
  // Add state for checkout processing
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Fetch cart items from backend using fetch API
  const fetchCartItems = async () => {
    setLoading(true)
    setError(null)

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      const response = await fetch("http://localhost:8080/cart", {
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Server error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()

      if (Array.isArray(data)) {
        setCartItems(data)
        setUsingMockData(false)
      } else {
        throw new Error("Invalid data structure received from API")
      }
    } catch (error) {
      console.error("Error fetching cart data:", error)
      // Use mock data as fallback
      setCartItems(mockCartItems)
      setUsingMockData(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCartItems()
  }, [])

  // Update quantity in the backend and locally
  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return

    // First update locally for immediate UI feedback
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))

    // If using mock data, don't try to update the backend
    if (usingMockData) return

    try {
      const response = await fetch(`http://localhost:8080/cart/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })

      if (!response.ok) {
        throw new Error("Failed to update quantity")
      }
    } catch (error) {
      console.error("Error updating item quantity:", error)
    }
  }

  // Remove item from the backend and update
  const removeItem = async (id) => {
    // First update locally for immediate UI feedback
    setCartItems(cartItems.filter((item) => item.id !== id))

    // If using mock data, don't try to update the backend
    if (usingMockData) return

    try {
      const response = await fetch(`http://localhost:8080/cart/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove item")
      }
    } catch (error) {
      console.error("Error removing item:", error)
    }
  }

  // Handle customization
  const handleCustomize = (item) => {
    console.log(`Customize item: ${item.id}`)
    setCustomizingItem(item)
  }

  // Handle adding customized item to cart
  const handleAddCustomizedItem = (customizedItem) => {
    // Replace the original item with the customized one
    setCartItems(cartItems.map((item) => (item.id === customizedItem.id ? customizedItem : item)))

    // If not using mock data, update the backend
    if (!usingMockData) {
      try {
        fetch(`http://localhost:8080/cart/${customizedItem.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customizedItem),
        }).catch((error) => {
          console.error("Error updating customized item:", error)
        })
      } catch (error) {
        console.error("Error updating customized item:", error)
      }
    }

    // Close the customization modal
    setCustomizingItem(null)
  }

  // Helper function to calculate cart totals
  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => {
      // If the item has a totalPrice from customization, use that
      if (item.totalPrice) {
        return sum + item.totalPrice
      }
      // Otherwise use the regular price * quantity
      return sum + item.price * item.quantity
    }, 0)

    const deliveryFee = 270.0
    const total = subtotal + deliveryFee

    return { subtotal, deliveryFee, total }
  }

  const { subtotal, deliveryFee, total } = calculateTotals()

  // Handle checkout process
  const handleCheckout = async () => {
    setIsCheckingOut(true)

    try {
      // If you have a backend, you would submit the order here
      // For now, we'll simulate a backend call with setTimeout

      // Calculate item totals for each item
      const itemsWithTotals = cartItems.map((item) => {
        const itemTotal = item.totalPrice || item.price * item.quantity
        return {
          ...item,
          totalPrice: itemTotal,
        }
      })

      // Create an order object with the cart items and totals
      const order = {
        items: itemsWithTotals,
        totals: calculateTotals(),
        orderId: "ORD" + Math.floor(Math.random() * 1000000),
        orderDate: new Date().toISOString(),
        status: "processing",
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store order data in localStorage to pass to order tracking page
      localStorage.setItem("currentOrder", JSON.stringify(order))

      // Navigate to the order tracking page with the order ID
      navigate(`/order-tracking/${order.orderId}`)
    } catch (error) {
      console.error("Error during checkout:", error)
      alert("There was an error processing your order. Please try again.")
    } finally {
      setIsCheckingOut(false)
    }
  }

  // Helper function to format customization options for display
  const formatCustomizationOption = (option) => {
    if (!option) return null

    // For size and crust, get the readable name from the options
    if (typeof option === "string") {
      return option.charAt(0).toUpperCase() + option.slice(1).replace(/-/g, " ")
    }

    // For arrays (toppings, extras), join them with commas
    if (Array.isArray(option) && option.length > 0) {
      return option.map((opt) => opt.charAt(0).toUpperCase() + opt.slice(1).replace(/-/g, " ")).join(", ")
    }

    return null
  }

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <GlobalStyle>
      <Container>
        <Header>
          <ShoppingCartIcon />
          <Title>Shopping Cart</Title>
        </Header>

        {error && (
          <ErrorContainer>
            <p>{error}</p>
            <RetryButton onClick={fetchCartItems}>Retry Connection</RetryButton>
          </ErrorContainer>
        )}

        {cartItems.length === 0 ? (
          <EmptyCartContainer>
            <EmptyCartIcon>
              <ShoppingCartIcon />
            </EmptyCartIcon>
            <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
            <EmptyCartText>Looks like you haven't added anything to your cart yet.</EmptyCartText>
            <OutlineButton>Continue Shopping</OutlineButton>
          </EmptyCartContainer>
        ) : (
          <GridContainer>
            <CartContent>
              {cartItems.map((item) => (
                <CartItem key={item.id}>
                  <ItemContainer>
                    <ImageContainer>
                      <ItemImage src={item.imageUrl || "/placeholder.svg"} alt={item.name} />
                    </ImageContainer>
                    <ItemDetails>
                      <ItemHeader>
                        <ItemName>{item.name}</ItemName>
                        <ItemPrice>
                          LKR {item.totalPrice ? item.totalPrice.toFixed(2) : (item.price * item.quantity).toFixed(2)}
                        </ItemPrice>
                      </ItemHeader>
                      <ItemDescription>{item.description}</ItemDescription>

                      {/* Display customizations if any */}
                      {item.customizations && (
                        <CustomizationDetails>
                          {item.customizations.size && (
                            <CustomizationItem>
                              Size: {formatCustomizationOption(item.customizations.size)}
                            </CustomizationItem>
                          )}
                          {item.customizations.crust && (
                            <CustomizationItem>
                              Crust: {formatCustomizationOption(item.customizations.crust)}
                            </CustomizationItem>
                          )}
                          {item.customizations.toppings && item.customizations.toppings.length > 0 && (
                            <CustomizationItem>
                              Extra Toppings: {formatCustomizationOption(item.customizations.toppings)}
                            </CustomizationItem>
                          )}
                          {item.customizations.extras && item.customizations.extras.length > 0 && (
                            <CustomizationItem>
                              Extras: {formatCustomizationOption(item.customizations.extras)}
                            </CustomizationItem>
                          )}
                          {item.customizations.specialInstructions && (
                            <CustomizationItem>
                              Special Instructions: {item.customizations.specialInstructions}
                            </CustomizationItem>
                          )}
                        </CustomizationDetails>
                      )}

                      <ItemActions>
                        <QuantityControl>
                          <QuantityButton
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </QuantityButton>
                          <QuantityText>{item.quantity}</QuantityText>
                          <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</QuantityButton>
                        </QuantityControl>
                        <CustomizeButton onClick={() => handleCustomize(item)}>
                          <CustomizeIcon />
                          Customize Item
                        </CustomizeButton>
                        <RemoveButton onClick={() => removeItem(item.id)}>
                          <TrashIcon />
                        </RemoveButton>
                      </ItemActions>
                    </ItemDetails>
                  </ItemContainer>
                  <Divider />
                </CartItem>
              ))}
            </CartContent>
            <Card>
              <CardContent>
                <SummaryTitle>Order Summary</SummaryTitle>
                <SummaryItem>
                  <SummaryLabel>Subtotal</SummaryLabel>
                  <SummaryValue>LKR {subtotal.toFixed(2)}</SummaryValue>
                </SummaryItem>
                <SummaryItem>
                  <SummaryLabel>Delivery Fee</SummaryLabel>
                  <SummaryValue>LKR {deliveryFee.toFixed(2)}</SummaryValue>
                </SummaryItem>
                <Divider />
                <TotalItem>
                  <SummaryLabel>Total</SummaryLabel>
                  <SummaryValue>LKR {total.toFixed(2)}</SummaryValue>
                </TotalItem>
                <PrimaryButton onClick={handleCheckout} disabled={isCheckingOut}>
                  {isCheckingOut ? "Processing..." : "Checkout"}
                </PrimaryButton>
                <DeliveryNote>Estimated delivery time: 30-60 minutes, depending on location.</DeliveryNote>
              </CardContent>
            </Card>
          </GridContainer>
        )}

        {/* Customization modal */}
        {customizingItem && (
          <ModalOverlay>
            <CustomizeItem
              itemData={customizingItem}
              onClose={() => setCustomizingItem(null)}
              onAddToCart={handleAddCustomizedItem}
            />
          </ModalOverlay>
        )}

        {/* Checkout loading overlay */}
        {isCheckingOut && (
          <LoadingOverlay>
            <LoadingSpinner />
            <p>Processing your order...</p>
          </LoadingOverlay>
        )}
      </Container>
    </GlobalStyle>
  )
}
