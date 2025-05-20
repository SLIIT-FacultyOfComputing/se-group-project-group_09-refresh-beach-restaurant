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

const HeroSection = styled.div`
  height: 300px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://static.vecteezy.com/system/resources/thumbnails/030/033/279/small/burger-fry-souse-banner-free-space-text-mockup-fast-food-top-view-empty-professional-phonography-photo.jpg');
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

const ContactSection = styled.div`
  background-color: #f5f7fa;
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContactTitle = styled.h2`
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

const ContactCardsContainer = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 50px;
  width: 100%;
  max-width: 900px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ContactCard = styled.div`
  flex: 1;
  background-color: ${(props) => props.bgColor || "#0f1e3d"};
  color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`

const CardTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 10px;
  }
`

const CardContent = styled.div`
  font-size: 16px;
`

const ContactItem = styled.div`
  margin-bottom: 15px;
  display: flex;
  align-items: flex-start;
  
  svg {
    margin-right: 10px;
    min-width: 20px;
  }
`

const HoursTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  tr {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  td {
    padding: 8px 0;
    
    &:last-child {
      text-align: right;
    }
  }
`

const FormContainer = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`

const FormTitle = styled.h3`
  font-size: 24px;
  color: #0f1e3d;
  margin-bottom: 20px;
  text-align: center;
`

const FormDescription = styled.p`
  font-size: 14px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Input = styled.input`
  padding: 12px 15px;
  border: 1px solid #444;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  background-color: #3a3a3a;
  
  &::placeholder {
    color: #aaa;
  }
  
  &:focus {
    outline: none;
    border-color: #0f1e3d;
  }
`

const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 1px solid #444;
  border-radius: 5px;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
  color: white;
  background-color: #3a3a3a;
  
  &::placeholder {
    color: #aaa;
  }
  
  &:focus {
    outline: none;
    border-color: #0f1e3d;
  }
`

const SubmitButton = styled.button`
  background-color: rgb(221, 152, 13);
  color: white;
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgb(224, 145, 9);
  }
`

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  margin-top: 60px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`

const Footer = styled.footer`
  background-color: #0f1e3d;
  color: white;
  padding: 20px;
  text-align: center;
  margin-top: 60px;
`

// Main Component
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the form data to your server
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We will get back to you soon.")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <PageContainer>
      <Navbar /> {/* Insert the Navbar component here */}
      <HeroSection>
        <HeroTitle>Contact Us</HeroTitle>
        <HeroSubtitle>
          We'd love to hear from you! Reach out to us with any questions or to make a reservation.
        </HeroSubtitle>
      </HeroSection>
      <ContactSection>
        <ContactTitle>Get In Touch</ContactTitle>

        <ContactCardsContainer>
          <ContactCard bgColor="#0f1e3d">
            <CardTitle>
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
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              Contact Details
            </CardTitle>
            <CardContent>
              <ContactItem>
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
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>384, Galle Road, A2, Hikkaduwa</div>
              </ContactItem>
              <ContactItem>
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <div>0912 277 810</div>
              </ContactItem>
              <ContactItem>
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
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <div>info@refreshblue.com</div>
              </ContactItem>
              <ContactItem>
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>Service options: Outdoor seating · Great cocktails</div>
              </ContactItem>
            </CardContent>
          </ContactCard>

          <ContactCard bgColor="#0f1e3d">
            <CardTitle>
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
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Store Hours
            </CardTitle>
            <CardContent>
              <HoursTable>
                <tbody>
                  <tr>
                    <td>Sunday</td>
                    <td>7 AM–11:30 PM</td>
                  </tr>
                  <tr>
                    <td>Monday</td>
                    <td>7 AM–11:30 PM</td>
                  </tr>
                  <tr>
                    <td>Tuesday</td>
                    <td>7 AM–11:30 PM</td>
                  </tr>
                  <tr>
                    <td>Wednesday</td>
                    <td>7 AM–11:30 PM</td>
                  </tr>
                  <tr>
                    <td>Thursday</td>
                    <td>7 AM–11:30 PM</td>
                  </tr>
                  <tr>
                    <td>Friday</td>
                    <td>7 AM–11:30 PM</td>
                  </tr>
                  <tr>
                    <td>Saturday</td>
                    <td>7 AM–11:30 PM</td>
                  </tr>
                </tbody>
              </HoursTable>
            </CardContent>
          </ContactCard>
        </ContactCardsContainer>

        <FormContainer>
          <FormTitle>Send a Message</FormTitle>
          <FormDescription>
            Have a question or want to make a reservation? Fill out the form below and we'll get back to you as soon as
            possible.
          </FormDescription>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <TextArea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <SubmitButton type="submit">SUBMIT</SubmitButton>
          </Form>
        </FormContainer>

        <MapContainer>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.5376517980384!2d80.09729937462637!3d6.1308089272625865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae177fbcae7226d%3A0x373ddaef09c9dec9!2sRefresh%20Restaurant!5e0!3m2!1sen!2sus!4v1716057600000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </MapContainer>
      </ContactSection>
      <Footer>
        <p>© 2025 Refresh Blue Restaurant. All Rights Reserved.</p>
      </Footer>
    </PageContainer>
  )
}

export default ContactPage
