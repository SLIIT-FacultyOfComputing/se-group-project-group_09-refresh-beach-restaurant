import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import CartPage from "./cart"
import CustomizeItem from "./customize-item"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<CartPage />} />
        <Route path="/customize-item/:itemId" element={<CustomizeItem />} />
        <Route path="/" element={<Navigate to="/cart" replace />} />
      </Routes>
    </Router>
  )
}

export default App



