"use client"

import { useState } from "react"
import styled from "styled-components"
import Navbar from "../components/Navbar";


// Styled Components
const PageContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`

const Header = styled.header`
  background-color: #0f1e3d;
  padding: 15px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
`

const LogoText = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: white;
  margin: 0;
  
  span {
    color: #00b4d8;
    font-style: italic;
  }
`

const Nav = styled.nav`
  display: flex;
  gap: 30px;
`

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #00b4d8;
  }
  
  &.active {
    color: #00b4d8;
  }
`

const HeroSection = styled.div`
  height: 400px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant10.jpg');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  margin-top: 70px;
  position: relative;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 20px;
`

const HeroTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  font-weight: 700;
`

const HeroSubtitle = styled.p`
  font-size: 20px;
  max-width: 800px;
  line-height: 1.5;
`

const SectionTitleContainer = styled.div`
  text-align: center;
  width: 100%;
  margin: 40px 0;
`

const SectionTitle = styled.h2`
  font-size: 32px;
  color: #0f1e3d;
  margin: 0 0 20px;
  text-align: center;
  position: relative;
  display: inline-block;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    right: 0;
    width: 80px;
    height: 3px;
    background-color: #00b4d8;
    margin: 0 auto;
  }
`

const StorySection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin: 60px 0;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const StoryImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`

const StoryContent = styled.div`
  padding: 20px;
`

const StoryTitle = styled.h3`
  font-size: 28px;
  color: #0f1e3d;
  margin-bottom: 20px;
`

const StoryText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin-bottom: 20px;
`

const AchievementsSection = styled.div`
  background-color: white;
  padding: 40px;
  margin: 60px 0;
  text-align: center;
`

const AchievementsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 30px auto;
  max-width: 800px;
  text-align: left;
`

const AchievementItem = styled.li`
  margin-bottom: 15px;
  padding-left: 30px;
  position: relative;
  color: #555;
  
  &:before {
    content: '•';
    color: #00b4d8;
    font-size: 24px;
    position: absolute;
    left: 0;
    top: -5px;
  }
`

const ContactInfo = styled.div`
  margin: 60px 0;
  padding: 40px;
  text-align: center;
  background-color: white;
`

const ContactText = styled.p`
  font-size: 16px;
  margin-bottom: 15px;
  color: #555;
`

const Footer = styled.footer`
  background-color: #0f1e3d;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: 60px;
`

const CarouselSection = styled.div`
  background-color: #0f1e3d;
  padding: 40px;
  margin: 40px 0;
  border-radius: 0;
  color: white;
`

const CarouselContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  position: relative;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const MainImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 400px;
  border-radius: 0;
`

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  font-size: 24px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.5);
  }
  
  &.left {
    left: 10px;
  }
  
  &.right {
    right: 10px;
  }
`

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const WelcomeBadge = styled.div`
  background-color: white;
  color: #ff3366;
  padding: 5px 15px;
  border-radius: 20px;
  display: inline-block;
  font-weight: 600;
  margin-bottom: 20px;
  width: fit-content;
`

const RestaurantTitle = styled.h2`
  font-size: 36px;
  margin: 0 0 20px;
  color: white;
`

const RestaurantDescription = styled.p`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #e0e0e0;
`

const LocationBadge = styled.div`
  background-color: #ff3366;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  display: inline-block;
  font-weight: 500;
  margin-top: 20px;
  width: fit-content;
`

const ThumbnailContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  padding: 10px 0;
  margin-top: 20px;
  scrollbar-width: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

const Thumbnail = styled.img`
  width: 100px;
  height: 70px;
  object-fit: cover;
  cursor: pointer;
  opacity: ${(props) => (props.active ? "1" : "0.6")};
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
`

// Main Component
const AboutPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Updated carousel items with actual images
  const carouselItems = [
    {
      id: 1,
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant10.jpg",
      title: "Evening Ambiance",
      description:
        "Experience the magical atmosphere of our restaurant in the evening with ambient lighting and comfortable seating.",
    },
    {
      id: 2,
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant15.jpg",
      title: "Beachfront Dining",
      description: "Enjoy your meal with a breathtaking view of the ocean and sunset.",
    },
    {
      id: 3,
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant28.jpg",
      title: "Culinary Excellence",
      description: "Our executive chef brings 20 years of culinary excellence to every dish we serve.",
    },
    {
      id: 4,
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant29.jpg",
      title: "Spacious Venue",
      description: "Host your special occasions in our beautiful beachfront venue with ample space.",
    },
    {
      id: 5,
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant46.jpg",
      title: "Fresh Seafood",
      description: "Try our unique seafood dishes crafted with local ingredients and traditional recipes.",
    },
    {
      id: 6,
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant6.jpg",
      title: "Tropical Paradise",
      description: "We source our ingredients from local farmers and fishermen to support the community.",
    },
  ]

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? carouselItems.length - 1 : prevIndex - 1))
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
  }

  return (
    <PageContainer>
      <Navbar />
      <HeroSection>
        <HeroContent>
          <HeroTitle>About Us</HeroTitle>
          <HeroSubtitle>
            Nestled along the stunning coastline of Hikkaduwa, Refresh Beach Restaurant is a vibrant destination for
            food lovers and beachgoers alike. Since 1986, we've been serving up the finest seafood and international
            cuisine with warm hospitality and unforgettable ocean views. Whether you're here for a hearty breakfast, a
            sunset dinner, or refreshing cocktails by the waves, we offer an experience that captures the true essence
            of Sri Lankan beachside dining.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <SectionTitleContainer>
        <SectionTitle>Discover Refresh Blue</SectionTitle>
      </SectionTitleContainer>

      <CarouselSection>
        <CarouselContainer>
          <MainImageContainer>
            <MainImage src={carouselItems[currentImageIndex].image} alt={carouselItems[currentImageIndex].title} />
            <ArrowButton className="left" onClick={prevImage}>
              &#8249;
            </ArrowButton>
            <ArrowButton className="right" onClick={nextImage}>
              &#8250;
            </ArrowButton>
          </MainImageContainer>

          <ContentContainer>
            <WelcomeBadge>WELCOME TO</WelcomeBadge>
            <RestaurantTitle>The Refresh Beach Restaurant</RestaurantTitle>
            <RestaurantDescription>
              We have established 1995 & have well experienced in the field of restaurants. We have the largest
              restaurant in Down South and more than 250 heads can be served at the same time. All kind of Food and
              Beverages (more than 550 varieties), also available in our restaurant.
            </RestaurantDescription>
            <LocationBadge>NO:384, HIKKADUWA,SRI LANKA</LocationBadge>
          </ContentContainer>
        </CarouselContainer>

        <ThumbnailContainer>
          {carouselItems.map((item, index) => (
            <Thumbnail
              key={item.id}
              src={item.image}
              alt={`Thumbnail ${index + 1}`}
              active={index === currentImageIndex}
              onClick={() => goToImage(index)}
            />
          ))}
        </ThumbnailContainer>
      </CarouselSection>

      <StorySection>
        <StoryImage
          src="https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant10.jpg"
          alt="Restaurant History"
        />
        <StoryContent>
          <StoryTitle>Our Journey</StoryTitle>
          <StoryText>
            Established in 1995, Refresh Blue started as a small beachside cafe serving fresh seafood to locals and
            tourists. Over the years, we've grown into one of the most beloved dining destinations in the area, known
            for our exceptional cuisine and breathtaking ocean views.
          </StoryText>
          <StoryText>
            Our founder, Chef Michael, had a vision to create a restaurant that celebrated the bounty of the sea while
            providing a relaxing atmosphere where guests could truly unwind and connect with nature. That vision
            continues to guide everything we do today.
          </StoryText>
        </StoryContent>
      </StorySection>

      <AchievementsSection>
        <SectionTitle>Our Achievements</SectionTitle>
        <AchievementsList>
          <AchievementItem>We are approved by the Ceylon Tourist Board as an "A" Grade Restaurant</AchievementItem>
          <AchievementItem>We have a AAA Five Star Specialty award on the plate</AchievementItem>
          <AchievementItem>Certified for Hygienic Coffee for Espresso Coffee & Espresso Cappuccino</AchievementItem>
          <AchievementItem>
            We are established in 1995 and have over 25 years of experience in the industry
          </AchievementItem>
          <AchievementItem>
            Our restaurant has been featured in Food & Travel Magazine, Conde Nast Traveler, and other major
            publications
          </AchievementItem>
          <AchievementItem>
            We are the largest restaurant in town and can serve more than 250 guests at once
          </AchievementItem>
        </AchievementsList>
      </AchievementsSection>

      <ContactInfo>
        <SectionTitle>Visit Us</SectionTitle>
        <ContactText>TELEPHONE: +94 91 277 5731, +94 91 277 5610, +94 77 736 5876</ContactText>
        <ContactText>OPENING HOURS: Daily from 7:00 a.m to midnight</ContactText>
        <ContactText>Beach Road, Hikkaduwa, Sri Lanka</ContactText>
      </ContactInfo>

      <Footer>
        <p>© 2025 Refresh Blue Restaurant. All Rights Reserved.</p>
      </Footer>
    </PageContainer>
  )
}

export default AboutPage
