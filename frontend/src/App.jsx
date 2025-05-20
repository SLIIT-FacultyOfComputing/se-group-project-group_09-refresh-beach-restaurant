import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Menu from "./pages/Menu"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Cart from "./pages/Cart"
import Reservations from "./pages/Reservations"
import AdminDashboard from "./pages/AdminDashboard"
import ForgotPassword from "./pages/ForgotPassword"
import CustomerDashboard from "./pages/CustomerDashboard"
import EditProfile from "./pages/EditProfile"
import { AuthProvider } from "./context/AuthContext"
import AboutPage from "./pages/AboutPage"
import ContactPage from "./pages/ContactPage"
import GalleryPage from "./pages/GalleryPage"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1A3557", // Deep blue/navy
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFD600", // Gold/yellow
      contrastText: "#1A3557",
    },
    background: {
      default: "#f5f6fa", // Light gray background
      paper: "#fff",
    },
    text: {
      primary: "#1A3557", // Deep blue/navy for text
      secondary: "#FFD600", // Gold/yellow for highlights
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#FFD600",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            color: "#FFD600",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
})

function AppContent() {
  const location = useLocation()
  // Hide Navbar on dashboard, admin pages, and menu page
  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/admin") ||
    location.pathname === "/menu"

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}

export default App
