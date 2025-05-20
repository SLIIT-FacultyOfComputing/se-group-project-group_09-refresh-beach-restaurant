"use client"

import React, { useEffect, useState } from "react"
import Cookies from "js-cookie"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import {
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Container,
  Paper,
  Divider,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

const getCartKey = (user) => {
  return user && user.email ? `cart_${user.email}` : "cart_guest"
}

const Cart = ({ cartOpen, onClose, onCartUpdate }) => {
  const [cartItems, setCartItems] = useState([])
  const [error, setError] = useState("")
  const [checkoutDialogOpen, setCheckoutDialogOpen] = useState(false)
  const { user: authUser } = useAuth()

  useEffect(() => {
    const cartKey = getCartKey(authUser)
    const cookieCart = Cookies.get(cartKey)
    if (cookieCart) {
      setCartItems(JSON.parse(cookieCart))
    }
  }, [authUser, cartOpen])

  const handleRemoveItem = (indexToRemove) => {
    const cartKey = getCartKey(authUser)
    const updatedCart = cartItems.filter((_, index) => index !== indexToRemove)
    setCartItems(updatedCart)
    Cookies.set(cartKey, JSON.stringify(updatedCart), { expires: 7 })
    if (onCartUpdate) {
      onCartUpdate(updatedCart.reduce((sum, item) => sum + item.quantity, 0))
    }
  }

  const handleCheckout = async () => {
    if (!authUser) {
      setError("Please login to checkout")
      return
    }

    try {
      const order = {
        userEmail: authUser.email,
        userName: authUser.name,
        items: cartItems.map((item) => ({
          itemName: item.name,
          quantity: item.quantity,
          price: item.price,
          customization: item.customization || "",
        })),
        status: "Pending",
      }

      await axios.post("http://localhost:8080/api/cart/checkout", order)

      const cartKey = getCartKey(authUser)
      Cookies.remove(cartKey)
      setCartItems([])
      if (onCartUpdate) {
        onCartUpdate(0)
      }
      setCheckoutDialogOpen(false)
      if (onClose) {
        onClose()
      }
    } catch (err) {
      setError("Failed to process checkout")
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
        <ShoppingCartIcon sx={{ fontSize: 32, mr: 2, color: "#333" }} />
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", color: "#333" }}>
          Shopping Cart
        </Typography>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {cartItems.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 8,
            textAlign: "center",
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 64, mb: 3, color: "#8B0000" }} />
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#333" }}>
            Your cart is empty
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "#666" }}>
            Looks like you haven't added anything to your cart yet.
          </Typography>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              px: 4,
              py: 1.5,
              bgcolor: "#e9ecef",
              color: "#333",
              "&:hover": {
                bgcolor: "#dee2e6",
              },
              boxShadow: "none",
              borderRadius: 1,
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Paper elevation={0} sx={{ border: "1px solid #e0e0e0", borderRadius: 2, overflow: "hidden" }}>
          {cartItems.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <Divider />}
              <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 0.5 }}>
                    Price: RS{item.price}
                  </Typography>
                  <Typography variant="body1">Quantity: {item.quantity}</Typography>
                  {item.customization && (
                    <Box sx={{ mt: 1, p: 1, bgcolor: "grey.100", borderRadius: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                        Special Instructions:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.customization}
                      </Typography>
                    </Box>
                  )}
                </Box>
                <IconButton onClick={() => handleRemoveItem(index)} color="error" size="small" sx={{ ml: 1 }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </React.Fragment>
          ))}

          <Divider />

          <Box sx={{ p: 3 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6">RS{total.toFixed(2)}</Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={() => setCheckoutDialogOpen(true)}
              disabled={!authUser}
              sx={{
                py: 1.5,
                bgcolor: authUser ? "#333" : "#e0e0e0",
                "&:hover": {
                  bgcolor: authUser ? "#000" : "#e0e0e0",
                },
                borderRadius: 1,
              }}
            >
              {authUser ? "Proceed to Checkout" : "Login to Checkout"}
            </Button>
          </Box>
        </Paper>
      )}

      {/* Checkout Confirmation Dialog */}
      <Dialog open={checkoutDialogOpen} onClose={() => setCheckoutDialogOpen(false)}>
        <DialogTitle>Confirm Your Order</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Order Summary:
          </Typography>
          {cartItems.map((item, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <Typography>
                {item.name} x {item.quantity} - RS{(item.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          ))}
          <Typography variant="h6" sx={{ mt: 2 }}>
            Total: RS{total.toFixed(2)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCheckoutDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCheckout} variant="contained" color="primary">
            Confirm Order
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default Cart
