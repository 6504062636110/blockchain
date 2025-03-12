import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Marketplace from "./pages/Marketplace";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecyclePage from "./pages/RecyclePage";
import Navbar from "./components/ui/Navbar";


function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recycle" element={<RecyclePage />} /> {/* ✅ เพิ่ม Route ของ Recycle */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
