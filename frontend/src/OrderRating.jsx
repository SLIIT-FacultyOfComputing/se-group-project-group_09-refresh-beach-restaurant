"use client"

import { useState } from "react"
import styled from "styled-components"
import { Star, Send } from "lucide-react"

// Styled Components
const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
  font-family: 'Inter', sans-serif;
`

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
  font-weight: 600;
`

const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`

const OrderImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  background-color: #f3f4f6;
  margin-right: 1rem;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const OrderDetails = styled.div`
  flex: 1;
`

const OrderName = styled.h3`
  font-size: 1rem;
  margin: 0 0 0.25rem 0;
  color: #111;
`

const OrderDate = styled.p`
  font-size: 0.875rem;
  color: #666;
  margin: 0;
`

const RatingSection = styled.div`
  margin-bottom: 1.5rem;
`

const RatingLabel = styled.p`
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #555;
`

const StarsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`

const StarIcon = styled.div`
  cursor: pointer;
  color: ${(props) => (props.filled ? "#FFB800" : "#D1D5DB")};
  transition: transform 0.2s, color 0.2s;
  
  &:hover {
    transform: scale(1.1);
  }
`

const CommentSection = styled.div`
  margin-bottom: 1.5rem;
`

const CommentLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #555;
`

const CommentTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #4F46E5;
  }
`

const CharCount = styled.div`
  text-align: right;
  font-size: 0.75rem;
  color: ${(props) => (props.isLimit ? "#EF4444" : "#6B7280")};
  margin-top: 0.25rem;
`

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #4338CA;
  }
  
  &:disabled {
    background-color: #9CA3AF;
    cursor: not-allowed;
  }
`

const SuccessMessage = styled.div`
  background-color: #ECFDF5;
  color: #065F46;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
  display: ${(props) => (props.visible ? "block" : "none")};
`

// Main Component
const OrderRating = ({ orderDetails = { id: "ORD-12345", name: "Margherita Pizza", date: "August 15, 2023" } }) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [comment, setComment] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const maxCommentLength = 500

  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log({
      orderId: orderDetails.id,
      rating,
      comment,
    })

    // Show success message
    setSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setRating(0)
      setComment("")
      setSubmitted(false)
    }, 3000)
  }

  return (
    <Container>
      <Title>Rate Your Order</Title>

      <OrderInfo>
        <OrderImage>
          <img src="/placeholder.svg?height=60&width=60" alt={orderDetails.name} />
        </OrderImage>
        <OrderDetails>
          <OrderName>{orderDetails.name}</OrderName>
          <OrderDate>Ordered on {orderDetails.date}</OrderDate>
        </OrderDetails>
      </OrderInfo>

      <RatingSection>
        <RatingLabel>How would you rate this order?</RatingLabel>
        <StarsContainer>
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              filled={star <= (hoverRating || rating)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
            >
              <Star size={24} fill={star <= (hoverRating || rating) ? "#FFB800" : "none"} />
            </StarIcon>
          ))}
        </StarsContainer>
      </RatingSection>

      <CommentSection>
        <CommentLabel htmlFor="comment">Share your experience (optional)</CommentLabel>
        <CommentTextarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Tell us what you liked or didn't like about your order..."
          maxLength={maxCommentLength}
        />
        <CharCount isLimit={comment.length >= maxCommentLength}>
          {comment.length}/{maxCommentLength}
        </CharCount>
      </CommentSection>

      <SubmitButton disabled={rating === 0 || submitted} onClick={handleSubmit}>
        <Send size={16} />
        Submit Review
      </SubmitButton>

      <SuccessMessage visible={submitted}>
        Thank you for your feedback! Your review has been submitted successfully.
      </SuccessMessage>
    </Container>
  )
}

export default OrderRating
