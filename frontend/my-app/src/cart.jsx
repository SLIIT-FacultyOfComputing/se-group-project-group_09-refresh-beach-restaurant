"use client"

import { useState } from "react"
import styled from "styled-components"

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
  font-size: 1.875rem;
  font-weight: 700;
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
  color: #6b7280;
`

const EmptyCartTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`

const EmptyCartText = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
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

// Removed max-height constraint to show all items without scrolling
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
`

const ItemPrice = styled.span`
  font-weight: 500;
`

const ItemDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
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
`

const QuantityText = styled.span`
  width: 2rem;
  text-align: center;
`

const RemoveButton = styled.button`
  background: none;
  border: none;
  height: 2rem;
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
  cursor: pointer;
  
  &:hover {
    background-color: #f3f4f6;
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
  background-color: #0f172a;
  color: white;
  border: none;
  width: 100%;
  padding: 0.75rem 1.5rem;
  margin-top: 1.5rem;
  
  &:hover {
    background-color: #1e293b;
  }
`

const OutlineButton = styled(Button)`
  background-color: transparent;
  color: #0f172a;
  border: 1px solid #e5e7eb;
  width: 100%;
  margin-top: 1rem;
  
  &:hover {
    background-color: #f3f4f6;
  }
`

const DeliveryNote = styled.p`
  font-size: 0.75rem;
  text-align: center;
  color: #6b7280;
  margin-top: 1rem;
`

// Icons
const ShoppingCartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
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

const PlusIcon = () => (
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
    <path d="M12 5v14M5 12h14" />
  </svg>
)

const MinusIcon = () => (
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
    <path d="M5 12h14" />
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

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic tomato sauce with mozzarella cheese and fresh basil",
    price: 3900.0,
    quantity: 1,
    image: "https://simplyhomecooked.com/wp-content/uploads/2023/04/Margherita-Pizza-3.jpg",
  },
  {
    id: 2,
    name: "Battered Prawn",
    description: "Crispy, golden-battered prawns served with a tangy dipping sauce.",
    price: 3400.0,
    quantity: 2,
    image:
      "https://i0.wp.com/jessicasglutenfreekitchen.com/wp-content/uploads/2019/08/IMG_0959-1-1.jpg?fit=1440%2C1440&ssl=1",
  },
  {
    id: 3,
    name: "Roasted Full Chicken",
    description: "Succulent whole roasted chicken, perfectly seasoned and cooked to golden perfection.",
    price: 2400.0,
    quantity: 1,
    image: "https://static.toiimg.com/thumb/53007558.cms?imgsize=518651&width=800&height=800",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.08 // 8% tax
  const deliveryFee = 270.0
  const total = subtotal + tax + deliveryFee

  return (
    <GlobalStyle>
      <Container>
        <Header>
          <ShoppingCartIcon />
          <Title>Your Cart</Title>
        </Header>

        {cartItems.length === 0 ? (
          <EmptyCartContainer>
            <EmptyCartIcon>
              <ShoppingCartIcon />
            </EmptyCartIcon>
            <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
            <EmptyCartText>Looks like you haven't added any items to your cart yet.</EmptyCartText>
            <PrimaryButton>Browse Menu</PrimaryButton>
          </EmptyCartContainer>
        ) : (
          <GridContainer>
            <Card>
              <CardContent>
                <CartContent>
                  {cartItems.map((item) => (
                    <CartItem key={item.id}>
                      <ItemContainer>
                        <ImageContainer>
                          <ItemImage src={item.image || "/placeholder.svg"} alt={item.name} />
                        </ImageContainer>
                        <ItemDetails>
                          <ItemHeader>
                            <ItemName>{item.name}</ItemName>
                            <ItemPrice>Rs. {(item.price * item.quantity).toFixed(2)}</ItemPrice>
                          </ItemHeader>
                          <ItemDescription>{item.description}</ItemDescription>
                          <ItemActions>
                            <QuantityControl>
                              <QuantityButton onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <MinusIcon />
                              </QuantityButton>
                              <QuantityText>{item.quantity}</QuantityText>
                              <QuantityButton onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <PlusIcon />
                              </QuantityButton>
                            </QuantityControl>
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
              </CardContent>
            </Card>

            <div>
              <Card>
                <CardContent>
                  <SummaryTitle>Order Summary</SummaryTitle>
                  <SummaryItem>
                    <SummaryLabel>Subtotal</SummaryLabel>
                    <SummaryValue>Rs. {subtotal.toFixed(2)}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Tax</SummaryLabel>
                    <SummaryValue>Rs. {tax.toFixed(2)}</SummaryValue>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryLabel>Delivery Fee</SummaryLabel>
                    <SummaryValue>Rs. {deliveryFee.toFixed(2)}</SummaryValue>
                  </SummaryItem>
                  <Divider />
                  <TotalItem>
                    <span>Total</span>
                    <span>Rs. {total.toFixed(2)}</span>
                  </TotalItem>
                  <PrimaryButton>Proceed to Checkout</PrimaryButton>
                  <DeliveryNote>Estimated delivery time: 30-45 minutes</DeliveryNote>
                </CardContent>
              </Card>
              <OutlineButton>Continue Shopping</OutlineButton>
            </div>
          </GridContainer>
        )}
      </Container>
    </GlobalStyle>
  )
}

