"use client";


import { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  Divider,
  Paper,
  Stack,
} from "@mui/material";
import { ShoppingCart, Add as AddIcon, Remove as RemoveIcon, Delete as DeleteIcon } from "@mui/icons-material";

// Sample cart data


const initialCartItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic tomato sauce with mozzarella cheese and fresh basil",
    price: 3900.00,
    quantity: 1,
    image: "https://simplyhomecooked.com/wp-content/uploads/2023/04/Margherita-Pizza-3.jpg",
  },
  {
    id: 2,
    name: "Battered Prawn",
    description: "Crispy, golden-battered prawns served with a tangy dipping sauce.",
    price: 3400.00,
    quantity: 2,
    image:
        "https://i0.wp.com/jessicasglutenfreekitchen.com/wp-content/uploads/2019/08/IMG_0959-1-1.jpg?fit=1440%2C1440&ssl=1",
  },
  {
    id: 3,
    name: "Chicken Tikka Masala",
    description: "Tender chicken pieces cooked in a rich, creamy spiced tomato sauce.",
    price: 2400.00,
    quantity: 1,
    image: "https://bellyfull.net/wp-content/uploads/2021/05/Chicken-Tikka-Masala-blog.jpg",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = 270.00;
  const total = subtotal + tax + deliveryFee;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 4 }}>
        <ShoppingCart sx={{ fontSize: 32 }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Your Cart
        </Typography>
      </Box>

      {cartItems.length === 0 ? (
        <Paper sx={{ textAlign: "center", py: 8, px: 2 }}>
          <ShoppingCart sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Typography color="text.secondary" paragraph>
            Looks like you haven't added any items to your cart yet.
          </Typography>
          <Button variant="contained" size="large">
            Browse Menu
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ maxHeight: "calc(100vh - 350px)", overflow: "auto", pr: 1 }}>
                  {cartItems.map((item) => (
                    <Box key={item.id} sx={{ mb: 3 }}>
                      <Box sx={{ display: "flex", gap: 2 }}>
                        <Box
                          component="img"
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          sx={{ height: 80, width: 80, objectFit: "cover", borderRadius: 1 }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="subtitle1">{item.name}</Typography>
                            <Typography variant="subtitle1" fontWeight="medium">
                              Rs. {(item.price * item.quantity).toFixed(2)}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {item.description}
                          </Typography>
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Paper variant="outlined" sx={{ display: "flex", alignItems: "center", borderRadius: 1 }}>
                              <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography sx={{ width: 32, textAlign: "center" }}>{item.quantity}</Typography>
                              <IconButton size="small" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Paper>
                            <IconButton color="error" size="small" onClick={() => removeItem(item.id)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                      <Divider sx={{ mt: 3 }} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Order Summary
                </Typography>
                <Stack spacing={2}>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">Subtotal</Typography>
                    <Typography>Rs. {subtotal.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">Tax</Typography>
                    <Typography>Rs. {tax.toFixed(2)}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography color="text.secondary">Delivery Fee</Typography>
                    <Typography>Rs. {deliveryFee.toFixed(2)}</Typography>
                  </Box>
                  <Divider />
                  <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Total
                    </Typography>
                    <Typography variant="subtitle1" fontWeight="bold">
                      Rs. {total.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
                <Button variant="contained" fullWidth size="large" sx={{ mt: 3 }}>
                  Proceed to Checkout
                </Button>
                <Typography variant="caption" align="center" color="text.secondary" sx={{ display: "block", mt: 2 }}>
                  Estimated delivery time: 30-45 minutes
                </Typography>
              </CardContent>
            </Card>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              Continue Shopping
            </Button>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
