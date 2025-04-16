import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminMenu from "./AdminMenu";
import CustomerMenu from "./CustomerMenu";
import 'bootstrap/dist/css/bootstrap.min.css';
import Cart from "./Cart";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminMenu />} />
        <Route path="/customer" element={<CustomerMenu />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
