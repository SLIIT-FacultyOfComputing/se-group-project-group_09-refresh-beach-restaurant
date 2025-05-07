"use client"

import { useState, useEffect } from "react"
import styled from "styled-components"
import { useNavigate, useParams } from "react-router-dom"

// Global styles for the font
const GlobalStyle = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
`

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  background-color: #f9f9f9;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  background-color: white;
  border-bottom: 1px solid #eee;
`

const BackButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0;
  color: #333;
`

const OrderInfo = styled.div`
  margin-left: 1rem;
`

const OrderTitle = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
`

const OrderNumber = styled.p`
  font-size: 0.75rem;
  color: #0040ff;
  margin: 0;
`

const SearchContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1.25rem;
`

const SearchIconContainer = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
`

const NotificationIcon = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  position: relative;
`

const NotificationBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background-color: #0040ff;
  color: white;
  font-size: 0.625rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1.5rem;
`

const ProfileImage = styled.img`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  object-fit: cover;
`

const ProfileInfo = styled.div`
  margin-left: 0.5rem;
`

const ProfileName = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
`

const ProfileRole = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin: 0;
`

const MapContainer = styled.div`
  height: 12rem;
  background-color: #e5eef7;
  position: relative;
  overflow: hidden;
`

const MapImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: url('/placeholder.svg?height=200&width=900');
  background-size: cover;
`

const MapRoute = styled.div`
  position: absolute;
  top: 50%;
  left: 20%;
  right: 30%;
  height: 3px;
  background-color: #0040ff;
  z-index: 1;
`

const LocationPoint = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #0040ff;
  border-radius: 50%;
  z-index: 2;
  
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background-color: rgba(0, 64, 255, 0.2);
    border-radius: 50%;
  }
`

const RestaurantPoint = styled(LocationPoint)`
  top: 50%;
  right: 30%;
  transform: translate(50%, -50%);
`

const CustomerPoint = styled(LocationPoint)`
  top: 50%;
  left: 20%;
  transform: translate(-50%, -50%);
`

const DeliveryPoint = styled.div`
  position: absolute;
  top: 40%;
  left: 40%;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 3;
`

const DeliveryImage = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  object-fit: cover;
`

const RestaurantLabel = styled.div`
  position: absolute;
  top: 40%;
  right: 20%;
  background-color: white;
  padding: 0.375rem 0.75rem;
  border-radius: 1.25rem;
  font-size: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 2;
`

const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 18rem;
  background-color: white;
`

const MainContent = styled.div`
  padding: 1.25rem;
`

const SideContent = styled.div`
  background-color: #f9f9f9;
  padding: 1.25rem;
  border-left: 1px solid #eee;
`

const DeliveryStatus = styled.div`
  background-color: #0040ff;
  color: white;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  margin-bottom: 1.5rem;
`

const StatusTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
`

const EstimatedTime = styled.p`
  font-size: 0.875rem;
  margin: 0;
  opacity: 0.9;
`

const DeliveryPersonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
`

const DeliveryPersonAvatar = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.75rem;
  border: 3px solid white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

const DeliveryPersonName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  color: #333;
`

const DeliveryPersonRole = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0 0 1rem 0;
`

const ContactActions = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`

const ContactButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #f0f4ff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #0040ff;
  cursor: pointer;
`

const CustomerInfo = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`

const CustomerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const CustomerAvatar = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
`

const CustomerDetails = styled.div`
  margin-left: 0.75rem;
`

const CustomerName = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.125rem 0;
  color: #333;
`

const CustomerID = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin: 0;
`

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #666;
`

const ContactIcon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #f0f4ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  color: #0040ff;
`

const ContactText = styled.span`
  font-size: 0.875rem;
  color: #333;
`

const SectionTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #333;
`

const HistoryTimeline = styled.div`
  margin-bottom: 1.5rem;
`

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
  position: relative;
  padding-left: 1.5rem;
  
  &:not(:last-child):before {
    content: '';
    position: absolute;
    top: 1.5rem;
    left: 0.4375rem;
    bottom: -0.5rem;
    width: 2px;
    background-color: #e0e0e0;
  }
`

const TimelineDot = styled.div`
  position: absolute;
  left: 0;
  top: 0.25rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: #0040ff;
`

const TimelineContent = styled.div`
  flex: 1;
`

const TimelineTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 0.25rem 0;
  color: #333;
`

const TimelineTime = styled.p`
  font-size: 0.75rem;
  color: #666;
  margin: 0;
`

const ItemsContainer = styled.div`
  margin-bottom: 1.5rem;
`

const ItemsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ItemCard = styled.div`
  display: flex;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  overflow: hidden;
`

const ItemImage = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
`

const ItemDetails = styled.div`
  flex: 1;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ItemTop = styled.div``

const ItemTag = styled.span`
  font-size: 0.625rem;
  text-transform: uppercase;
  color: #0040ff;
  font-weight: 600;
  margin-bottom: 0.25rem;
  display: block;
`

const ItemName = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
  color: #333;
`

const ItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ItemQuantity = styled.span`
  font-size: 0.875rem;
  color: #666;
`

const ItemPrices = styled.div`
  text-align: right;
`

const ItemPrice = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
  display: block;
`

const ItemTotalPrice = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #333;
  display: block;
`

// Order summary section
const OrderSummarySection = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #eee;
`

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const SummaryLabel = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
`

const SummaryValue = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`

const TotalItem = styled(SummaryItem)`
  font-weight: 600;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid #eee;
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

const SearchIconSvg = () => (
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
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const BellIcon = () => (
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
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

const BagIcon = () => (
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
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const PhoneIcon = () => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

const MessageIcon = () => (
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
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
)

const MapPinIcon = () => (
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
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const MoreIcon = () => (
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
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
)

// Main component
const OrderTracking = () => {
  const navigate = useNavigate()
  const { orderId } = useParams()
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Sample data for fallback
  const [orderStatus, setOrderStatus] = useState("delivery")
  const [estimatedTime, setEstimatedTime] = useState("5 - 8 min")

  // Handle back button click
  const handleBackClick = () => {
    navigate("/cart")
  }

  // Load order data from localStorage
  useEffect(() => {
    setLoading(true)
    try {
      const savedOrder = localStorage.getItem("currentOrder")
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder)
        setOrderData(parsedOrder)
      }
    } catch (error) {
      console.error("Error loading order data:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  const orderHistory = [
    {
      status: "Your Order on Delivery",
      time: "09:23 AM",
      byPerson: "by Courier",
      active: true,
    },
    {
      status: "Driver Arrived at Restaurant",
      time: "09:23 AM",
      active: true,
    },
    {
      status: "Preparing Your Order",
      time: "09:17 AM",
      active: true,
    },
    {
      status: "Placed Order",
      time: "09:13 AM",
      active: true,
    },
  ]

  // Use order items from localStorage or fallback to sample data
  const orderItems = orderData?.items || [
    {
      id: 1,
      name: "Margherita Pizza",
      image: "https://simplyhomecooked.com/wp-content/uploads/2023/04/Margherita-Pizza-3.jpg",
      tag: "NEW",
      quantity: 2,
      price: 3900,
      totalPrice: 7800,
    },
    {
      id: 2,
      name: "Battered Prawn",
      image:
        "https://i0.wp.com/jessicasglutenfreekitchen.com/wp-content/uploads/2019/08/IMG_0959-1-1.jpg?fit=1440%2C1440&ssl=1",
      tag: "NEW",
      quantity: 1,
      price: 3400,
      totalPrice: 3400,
    },
  ]

  // Get order totals from localStorage or calculate from items
  const orderTotals = orderData?.totals || {
    subtotal: orderItems.reduce((sum, item) => sum + (item.totalPrice || item.price * item.quantity), 0),
    deliveryFee: 270.0,
    total: orderItems.reduce((sum, item) => sum + (item.totalPrice || item.price * item.quantity), 0) + 270.0,
  }

  return (
    <GlobalStyle>
      <Container>
        <Header>
          <BackButton onClick={handleBackClick}>
            <BackIcon />
          </BackButton>
          <OrderInfo>
            <OrderTitle>Order Details</OrderTitle>
            <OrderNumber>Order / #{orderData?.orderId || orderId || "2034945456"}</OrderNumber>
          </OrderInfo>
          <SearchContainer>
            <SearchIconContainer>
              <SearchIconSvg />
            </SearchIconContainer>
            <NotificationIcon>
              <BellIcon />
              <NotificationBadge>3</NotificationBadge>
            </NotificationIcon>
            <NotificationIcon>
              <BagIcon />
              <NotificationBadge>1</NotificationBadge>
            </NotificationIcon>
          </SearchContainer>
          <ProfileContainer>
            <ProfileImage
              src="https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D"
              alt="Profile"
            />
            <ProfileInfo>
              <ProfileName>Mahima Linash</ProfileName>
            </ProfileInfo>
          </ProfileContainer>
        </Header>

        <MapContainer>
          <MapImage />
          <MapRoute />
          <CustomerPoint />
          <RestaurantPoint />
          <DeliveryPoint>
            <DeliveryImage
              src="https://www.shutterstock.com/image-photo/professional-delivery-guy-employee-man-600nw-2265620153.jpg"
              alt="Delivery Person"
            />
          </DeliveryPoint>
          <RestaurantLabel>Refresh Beach Restaurant</RestaurantLabel>
        </MapContainer>

        <ContentContainer>
          <MainContent>
            <HistoryTimeline>
              <SectionTitle>History</SectionTitle>
              {orderHistory.map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineDot />
                  <TimelineContent>
                    <TimelineTitle>
                      {item.status} {item.byPerson && item.byPerson}
                    </TimelineTitle>
                    <TimelineTime>{item.time}</TimelineTime>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </HistoryTimeline>

            <ItemsContainer>
              <ItemsHeader>
                <SectionTitle>Items</SectionTitle>
                <MoreButton>
                  <MoreIcon />
                </MoreButton>
              </ItemsHeader>

              <ItemsList>
                {orderItems.map((item) => (
                  <ItemCard key={item.id}>
                    <ItemImage src={item.imageUrl || item.image} alt={item.name} />
                    <ItemDetails>
                      <ItemTop>
                        <ItemTag>{item.tag || "ITEM"}</ItemTag>
                        <ItemName>{item.name}</ItemName>
                      </ItemTop>
                      <ItemBottom>
                        <ItemQuantity>x{item.quantity}</ItemQuantity>
                        <ItemPrices>
                          <ItemPrice>LKR {item.price.toFixed(2)}</ItemPrice>
                          <ItemTotalPrice>
                            LKR {(item.totalPrice || item.price * item.quantity).toFixed(2)}
                          </ItemTotalPrice>
                        </ItemPrices>
                      </ItemBottom>
                    </ItemDetails>
                  </ItemCard>
                ))}
              </ItemsList>
            </ItemsContainer>

            {/* Order Summary Section */}
            <OrderSummarySection>
              <SectionTitle>Order Summary</SectionTitle>
              <SummaryItem>
                <SummaryLabel>Subtotal</SummaryLabel>
                <SummaryValue>LKR {orderTotals.subtotal.toFixed(2)}</SummaryValue>
              </SummaryItem>
              <SummaryItem>
                <SummaryLabel>Delivery Fee</SummaryLabel>
                <SummaryValue>LKR {orderTotals.deliveryFee.toFixed(2)}</SummaryValue>
              </SummaryItem>
              <TotalItem>
                <SummaryLabel>Total</SummaryLabel>
                <SummaryValue>LKR {orderTotals.total.toFixed(2)}</SummaryValue>
              </TotalItem>
            </OrderSummarySection>
          </MainContent>

          <SideContent>
            <DeliveryStatus>
              <StatusTitle>On Delivery</StatusTitle>
              <EstimatedTime>Estimated Time: {estimatedTime}</EstimatedTime>
            </DeliveryStatus>

            <DeliveryPersonContainer>
              <DeliveryPersonAvatar
                src="https://www.shutterstock.com/image-photo/professional-delivery-guy-employee-man-600nw-2265620153.jpg"
                alt="Delivery Person"
              />
              <DeliveryPersonName>Shenal Silva</DeliveryPersonName>
              <DeliveryPersonRole>Courier</DeliveryPersonRole>

              <ContactActions>
                <ContactButton>
                  <PhoneIcon />
                </ContactButton>
                <ContactButton>
                  <MessageIcon />
                </ContactButton>
                <ContactButton>
                  <MapPinIcon />
                </ContactButton>
              </ContactActions>
            </DeliveryPersonContainer>

            <CustomerInfo>
              <CustomerHeader>
                <CustomerAvatar
                  src="https://sjc.microlink.io/xPbr9wdfnTB72hh34ZtFnMmBDhDGrxKiERGtk7Quu2UiAXK0QbVvp2yUN_P-QZaAbTChPSkMpeBvDQRuZS8qDw.jpeg"
                  alt="Customer"
                />
                <CustomerDetails>
                  <CustomerName>Mahima Linash</CustomerName>
                  <CustomerID>#234 - 9234234</CustomerID>
                </CustomerDetails>
              </CustomerHeader>

              <ContactInfo>
                <ContactIcon>
                  <PhoneIcon />
                </ContactIcon>
                <ContactText>+94 712345691</ContactText>
              </ContactInfo>

              <ContactInfo>
                <ContactIcon>
                  <MessageIcon />
                </ContactIcon>
                <ContactText>mahima1223@gmail.com</ContactText>
              </ContactInfo>
            </CustomerInfo>
          </SideContent>
        </ContentContainer>
      </Container>
    </GlobalStyle>
  )
}

export default OrderTracking
