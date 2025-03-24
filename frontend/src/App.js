import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reservations from "./pages/Reservations";
import ReserveTable from "./pages/ReserveTable";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Reservations />} />  {/* ✅ Default page */}
                <Route path="/reserve" element={<ReserveTable />} />
            </Routes>
        </Router>
    );
}

export default App;



