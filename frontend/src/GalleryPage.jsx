"use client"

import { useState, useEffect } from "react"
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

const HeroSection = styled.div`
  height: 300px;
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
`

const HeroTitle = styled.h1`
  font-size: 48px;
  margin-bottom: 10px;
  font-weight: 700;
`

const HeroSubtitle = styled.p`
  font-size: 20px;
  max-width: 600px;
`

const GallerySection = styled.div`
  padding: 60px 20px;
  background-color: #f5f7fa;
`

const SectionTitle = styled.h2`
  font-size: 36px;
  color: #0f1e3d;
  margin-bottom: 40px;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: #00b4d8;
  }
`

const CategoryTabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 10px;
`

const CategoryTab = styled.button`
  padding: 10px 20px;
  background-color: ${(props) => (props.active ? "#0f1e3d" : "white")};
  color: ${(props) => (props.active ? "white" : "#0f1e3d")};
  border: 1px solid #0f1e3d;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${(props) => (props.active ? "#0f1e3d" : "#f0f0f0")};
  }
`

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`

const GalleryItem = styled.div`
  position: relative;
  height: 250px;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    
    .overlay {
      opacity: 1;
    }
  }
`

const GalleryImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${GalleryItem}:hover & {
    transform: scale(1.05);
  }
`

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  padding: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
  color: white;
`

const ImageTitle = styled.h3`
  font-size: 18px;
  margin: 0 0 5px;
`

const ImageDescription = styled.p`
  font-size: 14px;
  margin: 0;
`

const LoadMoreButton = styled.button`
  background-color: #0f1e3d;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  display: block;
  margin: 0 auto;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #1a3366;
  }
`

const LightboxOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const LightboxContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`

const LightboxImage = styled.img`
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
`

const LightboxClose = styled.button`
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
`

const LightboxNavigation = styled.div`
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-50%);
`

const LightboxButton = styled.button`
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`

const LightboxCaption = styled.div`
  color: white;
  text-align: center;
  padding: 15px;
`

const Footer = styled.footer`
  background-color: #0f1e3d;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: 60px;
`

// Main Component
const GalleryPage = () => {
  const [activeCategory, setActiveCategory] = useState("all")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [visibleImages, setVisibleImages] = useState(9)

  // Gallery categories
  const categories = [
    { id: "all", name: "All" },
    { id: "restaurant", name: "Restaurant" },
    { id: "food", name: "Food" },
    { id: "events", name: "Events" },
    { id: "beach", name: "Beach Views" },
  ]

  // Gallery images with updated URLs
  const galleryImages = [
    // Restaurant images
    {
      id: 1,
      category: "restaurant",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant10.jpg",
      title: "Evening Ambiance",
      description: "The magical atmosphere of our restaurant in the evening",
    },
    {
      id: 2,
      category: "restaurant",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant15.jpg",
      title: "Beachfront Dining",
      description: "Enjoy your meal with a breathtaking view of the ocean",
    },
    {
      id: 3,
      category: "restaurant",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant6.jpg",
      title: "Outdoor Seating",
      description: "Relax and dine in our beautiful outdoor seating area",
    },
    {
      id: 4,
      category: "restaurant",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant27.jpg",
      title: "Restaurant Interior",
      description: "The elegant interior design of our restaurant",
    },
    {
      id: 5,
      category: "restaurant",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant9.jpg",
      title: "Dining Experience",
      description: "Experience the unique atmosphere of our restaurant",
    },
    {
      id: 6,
      category: "restaurant",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant7.jpg",
      title: "Restaurant View",
      description: "Another perspective of our beautiful restaurant",
    },
    {
      id: 7,
      category: "restaurant",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant41.jpg",
      title: "Dining Area",
      description: "Our spacious and comfortable dining area",
    },
    {
      id: 8,
      category: "restaurant",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant18.jpg",
      title: "Restaurant Ambiance",
      description: "The perfect setting for a memorable dining experience",
    },

    // Food images
    {
      id: 9,
      category: "food",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant13.jpg",
      title: "Seafood Specialty",
      description: "One of our delicious seafood specialties",
    },
    {
      id: 10,
      category: "food",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant17.jpg",
      title: "Fresh Catch",
      description: "Fresh seafood caught daily by local fishermen",
    },
    {
      id: 11,
      category: "food",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant12.jpg",
      title: "Signature Dish",
      description: "One of our most popular signature dishes",
    },
    {
      id: 12,
      category: "food",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant23.jpg",
      title: "Culinary Delight",
      description: "A culinary masterpiece from our talented chefs",
    },
    {
      id: 13,
      category: "food",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant33.jpg",
      title: "Gourmet Experience",
      description: "Experience our gourmet cuisine",
    },
    {
      id: 14,
      category: "food",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant38.jpg",
      title: "Local Flavors",
      description: "Taste the authentic flavors of Sri Lanka",
    },
    {
      id: 15,
      category: "food",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-tissamaharama-restaurant50.jpg",
      title: "Chef's Special",
      description: "A special creation by our executive chef",
    },
    {
      id: 16,
      category: "food",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-tissamaharama-restaurant51.jpg",
      title: "Dessert Selection",
      description: "Our delicious dessert selection",
    },

    // Beach view images
    {
      id: 17,
      category: "beach",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant15.jpg",
      title: "Ocean View",
      description: "Breathtaking ocean view from our restaurant",
    },
    {
      id: 18,
      category: "beach",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant4.jpg",
      title: "Beach Sunset",
      description: "Beautiful sunset view from our beachfront location",
    },
    {
      id: 19,
      category: "beach",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant18.jpg",
      title: "Beachside Dining",
      description: "Enjoy your meal with the sound of waves",
    },
    {
      id: 20,
      category: "beach",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant9.jpg",
      title: "Coastal Beauty",
      description: "The stunning coastal view from our restaurant",
    },
    {
      id: 21,
      category: "beach",
      image: "https://media-cdn.tripadvisor.com/media/photo-s/0a/08/36/8d/view-seafood-platter.jpg",
      title: "Seafood with a View",
      description: "Enjoy fresh seafood with an amazing ocean view",
    },

    // Events images
    {
      id: 22,
      category: "events",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5qSGfHM_CjpoG_k1GQxWrGz_fpByczp9E93mW9PsPPD6wRG5cmDROsamo_DV7JnvxFU&usqp=CAU",
      title: "Beach Event",
      description: "A special event hosted at our beachfront venue",
    },
    {
      id: 23,
      category: "events",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhtZtitnNrOCkQZiyEJ1ow2_2nNntB4pzWxpOYkFnqycGUFNnyg3geZEJzT4c_3sPk3lA&usqp=CAU",
      title: "Private Celebration",
      description: "Host your private celebrations at our restaurant",
    },
    {
      id: 24,
      category: "events",
      image:
        "https://www.refreshhikkaduwa.com/images/REFRESH/restaurant-hikkaduwa/main_slider/refresh-hikkaduwa-restaurant10.jpg",
      title: "Evening Event",
      description: "The perfect setting for your evening events",
    },
  ]

  // Filter images based on active category
  const filteredImages =
    activeCategory === "all" ? galleryImages : galleryImages.filter((image) => image.category === activeCategory)

  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setVisibleImages(9) // Reset visible images when changing category
  }

  // Open lightbox
  const openLightbox = (index) => {
    setCurrentImage(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
  }

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto" // Restore scrolling
  }

  // Navigate to previous image in lightbox
  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? filteredImages.length - 1 : prev - 1))
  }

  // Navigate to next image in lightbox
  const nextImage = () => {
    setCurrentImage((prev) => (prev === filteredImages.length - 1 ? 0 : prev + 1))
  }

  // Load more images
  const loadMoreImages = () => {
    setVisibleImages((prev) => Math.min(prev + 6, filteredImages.length))
  }

  // Handle keyboard navigation in lightbox
  const handleKeyDown = (e) => {
    if (!lightboxOpen) return

    if (e.key === "Escape") {
      closeLightbox()
    } else if (e.key === "ArrowLeft") {
      prevImage()
    } else if (e.key === "ArrowRight") {
      nextImage()
    }
  }

  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [lightboxOpen])

  return (
    <PageContainer>
      <Navbar /> {/* Use the Navbar component instead of the Header */}
      <HeroSection>
        <HeroTitle>Our Gallery</HeroTitle>
        <HeroSubtitle>
          Explore our beautiful restaurant, delicious food, and memorable events through our photo gallery
        </HeroSubtitle>
      </HeroSection>
      <GallerySection>
        <SectionTitle>Photo Gallery</SectionTitle>

        <CategoryTabs>
          {categories.map((category) => (
            <CategoryTab
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </CategoryTab>
          ))}
        </CategoryTabs>

        <GalleryGrid>
          {filteredImages.slice(0, visibleImages).map((image, index) => (
            <GalleryItem key={image.id} onClick={() => openLightbox(index)}>
              <GalleryImage src={image.image} alt={image.title} />
              <ImageOverlay className="overlay">
                <ImageTitle>{image.title}</ImageTitle>
                <ImageDescription>{image.description}</ImageDescription>
              </ImageOverlay>
            </GalleryItem>
          ))}
        </GalleryGrid>

        {visibleImages < filteredImages.length && <LoadMoreButton onClick={loadMoreImages}>Load More</LoadMoreButton>}
      </GallerySection>
      {lightboxOpen && (
        <LightboxOverlay onClick={closeLightbox}>
          <LightboxContent onClick={(e) => e.stopPropagation()}>
            <LightboxClose onClick={closeLightbox}>&times;</LightboxClose>
            <LightboxImage
              src={filteredImages[currentImage].image || "/placeholder.svg"}
              alt={filteredImages[currentImage].title}
            />
            <LightboxNavigation>
              <LightboxButton onClick={prevImage}>&lsaquo;</LightboxButton>
              <LightboxButton onClick={nextImage}>&rsaquo;</LightboxButton>
            </LightboxNavigation>
            <LightboxCaption>
              <h3>{filteredImages[currentImage].title}</h3>
              <p>{filteredImages[currentImage].description}</p>
            </LightboxCaption>
          </LightboxContent>
        </LightboxOverlay>
      )}
      <Footer>
        <p>© 2025 Refresh Blue Restaurant. All Rights Reserved.</p>
      </Footer>
    </PageContainer>
  )
}

export default GalleryPage
