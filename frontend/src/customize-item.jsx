"use client"

import { useState } from "react"
import styled from "styled-components"

// Global styles for the font to match cart page
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

const Card = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`

// Header is now inside the card
const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
`

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  color: #333;
  padding: 0.5rem 0;
  margin-bottom: 0.5rem;
  
  &:hover {
    color: rgb(108, 5, 5);
  }
`

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
  color: rgb(108, 5, 5);
`

const CardContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
`

const ItemContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
`

const ImageContainer = styled.div`
  position: relative;
  height: 6rem;
  width: 6rem;
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

const ItemName = styled.h3`
  font-weight: 600;
  margin-bottom: 0.25rem;
  font-size: 1.25rem;
`

const ItemPrice = styled.div`
  font-weight: 500;
  font-size: 1.125rem;
  margin-top: 0.5rem;
`

const ItemDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
`

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
  margin-top: 1.5rem;
`

const OptionGroup = styled.div`
  margin-bottom: 1.5rem;
`

const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e5e7eb;
  
  &:last-child {
    border-bottom: none;
  }
`

const OptionLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  flex: 1;
`

const RadioInput = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  accent-color: rgb(108, 5, 5);
  cursor: pointer;
`

const CheckboxInput = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  accent-color: rgb(108, 5, 5);
  cursor: pointer;
`

const OptionName = styled.span`
  font-size: 1rem;
`

const OptionPrice = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  margin-left: auto;
  padding-right: 1rem;
`

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
`

const QuantityButton = styled.button`
  background: none;
  border: none;
  height: 2.5rem;
  width: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  
  &:hover {
    background-color: #f3f4f6;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const QuantityText = styled.span`
  width: 2.5rem;
  text-align: center;
  font-size: 1rem;
`

const SpecialInstructions = styled.div`
  margin-top: 1.5rem;
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  font-family: inherit;
  font-size: 0.875rem;
  resize: none;
  height: 6rem;
  margin-top: 0.5rem;
  
  &:focus {
    outline: none;
    border-color: rgb(108, 5, 5);
  }
`

const Divider = styled.hr`
  border: 0;
  height: 1px;
  background-color: #e5e7eb;
  margin: 1.5rem 0;
`

const TotalSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
`

const TotalPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`

const PrimaryButton = styled.button`
  background-color: rgb(108, 5, 5);
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
  
  &:hover {
    background-color: rgb(156, 15, 15);
  }
`

const OutlineButton = styled.button`
  background-color: white;
  color: #333;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  flex: 1;
  
  &:hover {
    background-color: #f3f4f6;
  }
`

// Icons
const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

// Main component
const CustomizeItem = ({ onClose, onAddToCart, itemData }) => {
  // If no item data is provided, use default data
  const defaultItem = {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic tomato sauce with mozzarella cheese and fresh basil",
    price: 3900.0,
    imageUrl: "/placeholder.svg",
    quantity: 1,
  }

  const [item, setItem] = useState(itemData || defaultItem)
  const [selectedSize, setSelectedSize] = useState("medium")
  const [selectedCrust, setSelectedCrust] = useState("regular")
  const [toppings, setToppings] = useState([])
  const [extras, setExtras] = useState([])
  const [quantity, setQuantity] = useState(item.quantity || 1)
  const [specialInstructions, setSpecialInstructions] = useState("")
  const [loading, setLoading] = useState(false)

  // Define customization options based on item type
  // These could be fetched from an API in a real application
  const getCustomizationOptions = () => {
    // Pizza options
    if (item.name.toLowerCase().includes("pizza")) {
      return {
        sizes: [
          { id: "small", name: 'Small (8")', price: -500.0 },
          { id: "medium", name: 'Medium (10")', price: 0 },
          { id: "large", name: 'Large (12")', price: 800.0 },
          { id: "extra-large", name: 'Extra Large (14")', price: 1500.0 },
        ],
        crusts: [
          { id: "regular", name: "Regular Crust", price: 0 },
          { id: "thin", name: "Thin Crust", price: 0 },
          { id: "thick", name: "Thick Crust", price: 200.0 },
          { id: "stuffed", name: "Cheese Stuffed Crust", price: 500.0 },
        ],
        toppings: [
          { id: "extra-cheese", name: "Extra Cheese", price: 300.0 },
          { id: "mushrooms", name: "Mushrooms", price: 200.0 },
          { id: "pepperoni", name: "Pepperoni", price: 350.0 },
          { id: "onions", name: "Onions", price: 150.0 },
          { id: "bell-peppers", name: "Bell Peppers", price: 150.0 },
          { id: "olives", name: "Olives", price: 200.0 },
          { id: "chicken", name: "Grilled Chicken", price: 400.0 },
        ],
        extras: [
          { id: "garlic-dip", name: "Garlic Dip", price: 150.0 },
          { id: "chili-flakes", name: "Chili Flakes", price: 50.0 },
          { id: "oregano", name: "Oregano", price: 50.0 },
          { id: "parmesan", name: "Parmesan Cheese", price: 100.0 },
        ],
      }
    }
    // Chicken options
    else if (item.name.toLowerCase().includes("chicken")) {
      return {
        sizes: [
          { id: "quarter", name: "Quarter Chicken", price: -1000.0 },
          { id: "half", name: "Half Chicken", price: 0 },
          { id: "full", name: "Full Chicken", price: 1000.0 },
        ],
        crusts: [], // No crust options for chicken
        toppings: [
          { id: "extra-sauce", name: "Extra Sauce", price: 200.0 },
          { id: "extra-seasoning", name: "Extra Seasoning", price: 100.0 },
        ],
        extras: [
          { id: "garlic-bread", name: "Garlic Bread", price: 300.0 },
          { id: "coleslaw", name: "Coleslaw", price: 250.0 },
          { id: "fries", name: "French Fries", price: 350.0 },
          { id: "mashed-potatoes", name: "Mashed Potatoes", price: 300.0 },
        ],
      }
    }
    // Prawn/seafood options
    else if (item.name.toLowerCase().includes("prawn")) {
      return {
        sizes: [
          { id: "small", name: "Small Portion", price: -500.0 },
          { id: "regular", name: "Regular Portion", price: 0 },
          { id: "large", name: "Large Portion", price: 800.0 },
        ],
        crusts: [], // No crust options for prawns
        toppings: [
          { id: "extra-prawns", name: "Extra Prawns", price: 600.0 },
          { id: "extra-sauce", name: "Extra Sauce", price: 150.0 },
        ],
        extras: [
          { id: "tartar-sauce", name: "Tartar Sauce", price: 100.0 },
          { id: "lemon-wedges", name: "Lemon Wedges", price: 50.0 },
          { id: "garlic-butter", name: "Garlic Butter", price: 150.0 },
          { id: "fries", name: "French Fries", price: 350.0 },
        ],
      }
    }
    // Default options for other items
    else {
      return {
        sizes: [
          { id: "small", name: "Small", price: -300.0 },
          { id: "regular", name: "Regular", price: 0 },
          { id: "large", name: "Large", price: 500.0 },
        ],
        crusts: [],
        toppings: [],
        extras: [
          { id: "extra-sauce", name: "Extra Sauce", price: 150.0 },
          { id: "fries", name: "Side of Fries", price: 350.0 },
        ],
      }
    }
  }

  const options = getCustomizationOptions()

  // Toggle topping selection
  const toggleTopping = (toppingId) => {
    if (toppings.includes(toppingId)) {
      setToppings(toppings.filter((id) => id !== toppingId))
    } else {
      setToppings([...toppings, toppingId])
    }
  }

  // Toggle extra selection
  const toggleExtra = (extraId) => {
    if (extras.includes(extraId)) {
      setExtras(extras.filter((id) => id !== extraId))
    } else {
      setExtras([...extras, extraId])
    }
  }

  // Calculate total price
  const calculateTotal = () => {
    let total = item.price

    // Add size price
    const selectedSizeOption = options.sizes.find((option) => option.id === selectedSize)
    if (selectedSizeOption) {
      total += selectedSizeOption.price
    }

    // Add crust price if applicable
    const selectedCrustOption = options.crusts.find((option) => option.id === selectedCrust)
    if (selectedCrustOption) {
      total += selectedCrustOption.price
    }

    // Add toppings price
    toppings.forEach((toppingId) => {
      const topping = options.toppings.find((option) => option.id === toppingId)
      if (topping) {
        total += topping.price
      }
    })

    // Add extras price
    extras.forEach((extraId) => {
      const extra = options.extras.find((option) => option.id === extraId)
      if (extra) {
        total += extra.price
      }
    })

    // Multiply by quantity
    total *= quantity

    return total
  }

  // Format price
  const formatPrice = (price) => {
    return `LKR ${price.toFixed(2)}`
  }

  // Handle add to cart
  const handleAddToCart = () => {
    setLoading(true)

    // Create customized item object
    const customizedItem = {
      ...item,
      quantity: quantity,
      customizations: {
        size: selectedSize,
        crust: selectedCrust,
        toppings: toppings,
        extras: extras,
        specialInstructions: specialInstructions,
      },
      totalPrice: calculateTotal(),
    }

    // Simulate API call
    setTimeout(() => {
      if (onAddToCart) {
        onAddToCart(customizedItem)
      }
      setLoading(false)
      if (onClose) {
        onClose()
      }
    }, 500)
  }

  return (
    <GlobalStyle>
      <Container>
        <Card>
          {/* Header is now inside the card */}
          <CardHeader>
            <BackButton onClick={onClose}>
              <BackIcon />
              Back to Cart
            </BackButton>
            <Title>Customize Your Order</Title>
          </CardHeader>

          <CardContent>
            <ItemContainer>
              <ImageContainer>
                <ItemImage src={item.imageUrl || "/placeholder.svg"} alt={item.name} />
              </ImageContainer>
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemDescription>{item.description}</ItemDescription>
                <ItemPrice>{formatPrice(item.price)}</ItemPrice>
              </ItemDetails>
            </ItemContainer>

            {options.sizes.length > 0 && (
              <OptionGroup>
                <SectionTitle>Choose Size</SectionTitle>
                {options.sizes.map((option) => (
                  <OptionItem key={option.id}>
                    <OptionLabel>
                      <RadioInput
                        type="radio"
                        name="size"
                        checked={selectedSize === option.id}
                        onChange={() => setSelectedSize(option.id)}
                      />
                      <OptionName>{option.name}</OptionName>
                    </OptionLabel>
                    <OptionPrice>
                      {option.price === 0
                        ? ""
                        : option.price > 0
                          ? `+${formatPrice(option.price)}`
                          : formatPrice(option.price)}
                    </OptionPrice>
                  </OptionItem>
                ))}
              </OptionGroup>
            )}

            {options.crusts.length > 0 && (
              <OptionGroup>
                <SectionTitle>Choose Crust</SectionTitle>
                {options.crusts.map((option) => (
                  <OptionItem key={option.id}>
                    <OptionLabel>
                      <RadioInput
                        type="radio"
                        name="crust"
                        checked={selectedCrust === option.id}
                        onChange={() => setSelectedCrust(option.id)}
                      />
                      <OptionName>{option.name}</OptionName>
                    </OptionLabel>
                    <OptionPrice>{option.price === 0 ? "" : `+${formatPrice(option.price)}`}</OptionPrice>
                  </OptionItem>
                ))}
              </OptionGroup>
            )}

            {options.toppings.length > 0 && (
              <OptionGroup>
                <SectionTitle>Add Extra Toppings</SectionTitle>
                {options.toppings.map((option) => (
                  <OptionItem key={option.id}>
                    <OptionLabel>
                      <CheckboxInput
                        type="checkbox"
                        checked={toppings.includes(option.id)}
                        onChange={() => toggleTopping(option.id)}
                      />
                      <OptionName>{option.name}</OptionName>
                    </OptionLabel>
                    <OptionPrice>+{formatPrice(option.price)}</OptionPrice>
                  </OptionItem>
                ))}
              </OptionGroup>
            )}

            {options.extras.length > 0 && (
              <OptionGroup>
                <SectionTitle>Add Extras</SectionTitle>
                {options.extras.map((option) => (
                  <OptionItem key={option.id}>
                    <OptionLabel>
                      <CheckboxInput
                        type="checkbox"
                        checked={extras.includes(option.id)}
                        onChange={() => toggleExtra(option.id)}
                      />
                      <OptionName>{option.name}</OptionName>
                    </OptionLabel>
                    <OptionPrice>+{formatPrice(option.price)}</OptionPrice>
                  </OptionItem>
                ))}
              </OptionGroup>
            )}

            <OptionGroup>
              <SectionTitle>Quantity</SectionTitle>
              <QuantityControl>
                <QuantityButton onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                  -
                </QuantityButton>
                <QuantityText>{quantity}</QuantityText>
                <QuantityButton onClick={() => setQuantity(quantity + 1)}>+</QuantityButton>
              </QuantityControl>
            </OptionGroup>

            <SpecialInstructions>
              <SectionTitle>Special Instructions</SectionTitle>
              <TextArea
                placeholder="Add any special requests or instructions here..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
              />
            </SpecialInstructions>

            <Divider />

            <TotalSection>
              <TotalPrice>Total: {formatPrice(calculateTotal())}</TotalPrice>
            </TotalSection>

            <ButtonContainer>
              <OutlineButton onClick={onClose}>Cancel</OutlineButton>
              <PrimaryButton onClick={handleAddToCart} disabled={loading}>
                {loading ? "Adding..." : "Add to Cart"}
              </PrimaryButton>
            </ButtonContainer>
          </CardContent>
        </Card>
      </Container>
    </GlobalStyle>
  )
}

export default CustomizeItem
