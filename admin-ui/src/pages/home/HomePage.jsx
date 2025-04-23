"use client"
import Navbar from "../../components/common/Navbar"
import HeroSection from "../../components/home/HeroSection"
import FeaturedItems from "../../components/home/FeaturedItems"
import AboutSection from "../../components/home/AboutSection"
import Footer from "../../components/common/Footer"
import "../../styles/HomePage.css"

function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      <HeroSection />
      <FeaturedItems />
      <AboutSection />
      <Footer />
    </div>
  )
}

export default HomePage
