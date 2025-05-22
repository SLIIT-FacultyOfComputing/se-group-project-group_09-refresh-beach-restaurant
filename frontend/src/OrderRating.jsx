"use client"

import { useState } from "react"
import styled from "styled-components"

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background-image: url('https://sjc.microlink.io/NwcZoFNWaJ9wiXSeBVgWQjN4Vrp0EtJQn4SSWpaay9ORyknw3GvuXQ9H92iaDsk9JhPt3wZc3gB_CNXN-alQVw.jpeg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 40px 20px;
`

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px;
  font-family: 'Poppins', sans-serif;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`

const Header = styled.header`
  text-align: center;
  margin-bottom: 30px;
`

const Logo = styled.h1`
  color: #00264d; /* Dark blue as requested */
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`

const Tagline = styled.p`
  color: #003366; /* Slightly lighter dark blue */
  font-size: 1.2rem;
  font-style: italic;
`

const Section = styled.section`
  margin-bottom: 40px;
  padding: 25px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 8px;
  border-left: 4px solid #00264d;
`

const SectionTitle = styled.h2`
  color: #00264d; /* Dark blue */
  margin-bottom: 20px;
  font-size: 1.8rem;
`

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

const RatingQuestion = styled.p`
  font-size: 1.2rem;
  color: #00264d;
  margin-bottom: 10px;
  font-weight: 500;
`

const StarsContainer = styled.div`
  display: flex;
  gap: 10px;
`

const Star = styled.span`
  font-size: 2.5rem;
  cursor: pointer;
  color: ${(props) => (props.filled ? "#ffc107" : "#e0e0e0")};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`

const RatingFeedback = styled.p`
  font-size: 1.1rem;
  color: #003366;
  font-weight: 500;
  height: 1.5rem;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

const Label = styled.label`
  font-weight: 500;
  color: #00264d;
`

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccd7e0;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #00264d;
    box-shadow: 0 0 0 2px rgba(0, 38, 77, 0.2);
  }
`

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #ccd7e0;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #00264d;
    box-shadow: 0 0 0 2px rgba(0, 38, 77, 0.2);
  }
`

const Button = styled.button`
  background-color: #00264d;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #003366;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`

const CommentsList = styled.div`
  margin-top: 30px;
`

const CommentCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 3px solid #00264d;
`

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`

const CommentAuthor = styled.h4`
  margin: 0;
  color: #00264d;
`

const CommentDate = styled.span`
  color: #003366;
  font-size: 0.9rem;
`

const CommentRating = styled.div`
  display: flex;
  margin-bottom: 10px;
  color: #ffc107;
`

const CommentText = styled.p`
  margin: 0;
  color: #00264d;
  line-height: 1.5;
`

const NoComments = styled.p`
  text-align: center;
  color: #003366;
  font-style: italic;
  margin-top: 20px;
`

// Main Component
function OrderRatingPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "Vidath",
      date: "2025-01-15",
      rating: 5,
      text: "The seafood platter was absolutely amazing! Fresh ingredients and beautiful presentation. The beach view made the experience even better.",
    },
    {
      id: 2,
      name: "Shenal",
      date: "2025-03-12",
      rating: 4,
      text: "Great food and atmosphere. The coconut shrimp was delicious. Service was a bit slow but still enjoyable overall.",
    },
  ])

  const ratingTexts = [
    "",
    "Poor - Not what I expected",
    "Fair - Could be better",
    "Good - Satisfied with my order",
    "Very Good - Exceeded expectations",
    "Excellent - Absolutely perfect!",
  ]

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating)
  }

  const handleMouseEnter = (hoveredValue) => {
    setHoveredRating(hoveredValue)
  }

  const handleMouseLeave = () => {
    setHoveredRating(0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (rating === 0) {
      alert("Please select a rating before submitting")
      return
    }

    const newComment = {
      id: comments.length + 1,
      name,
      date: new Date().toISOString().split("T")[0],
      rating,
      text: comment,
    }

    setComments([newComment, ...comments])

    // Reset form
    setName("")
    setEmail("")
    setComment("")
    setRating(0)
  }

  return (
    <PageWrapper>
      <PageContainer>
        <Header>
          <Logo>Refresh Beach Restaurant</Logo>
          <Tagline>Ocean views, fresh flavors</Tagline>
        </Header>

        <Section>
          <SectionTitle>Rate Your Order</SectionTitle>
          <RatingContainer>
            <RatingQuestion>How would you rate your recent order?</RatingQuestion>
            <StarsContainer>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  filled={(hoveredRating || rating) >= star}
                  onClick={() => handleRatingClick(star)}
                  onMouseEnter={() => handleMouseEnter(star)}
                  onMouseLeave={handleMouseLeave}
                >
                  ★
                </Star>
              ))}
            </StarsContainer>
            <RatingFeedback>
              {hoveredRating || rating ? ratingTexts[hoveredRating || rating] : "Click to rate"}
            </RatingFeedback>
          </RatingContainer>
        </Section>

        <Section>
          <SectionTitle>Leave Your Feedback</SectionTitle>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="comment">Your Comment</Label>
              <TextArea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} required />
            </FormGroup>

            <Button type="submit" disabled={rating === 0}>
              Submit Feedback
            </Button>
          </Form>
        </Section>

        <Section>
          <SectionTitle>Customer Reviews</SectionTitle>
          <CommentsList>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment.id}>
                  <CommentHeader>
                    <CommentAuthor>{comment.name}</CommentAuthor>
                    <CommentDate>{comment.date}</CommentDate>
                  </CommentHeader>
                  <CommentRating>
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>{i < comment.rating ? "★" : "☆"}</span>
                    ))}
                  </CommentRating>
                  <CommentText>{comment.text}</CommentText>
                </CommentCard>
              ))
            ) : (
              <NoComments>No comments yet. Be the first to leave a review!</NoComments>
            )}
          </CommentsList>
        </Section>
      </PageContainer>
    </PageWrapper>
  )
}

export default OrderRatingPage
