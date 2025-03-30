import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reservations from "./pages/Table_Reservation/Reservations";
import ReserveTable from "./pages/Table_Reservation/ReserveTable";
import MyReservations from "./pages/Table_Reservation/MyReservations";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Reservations />} />  {/* ✅ Default page */}
                <Route path="/reserve" element={<ReserveTable />} />
                <Route path="/my-reservations" element={<MyReservations />} />
            </Routes>
        </Router>
    );
}

export default App;



