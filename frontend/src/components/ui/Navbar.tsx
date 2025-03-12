import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import MarketPlaceButton from "./MarketPlaceButton"; 


function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-green-700 text-white flex justify-between items-center px-6 py-3 shadow-md z-50">
      <h2 className="text-xl font-bold">GKT</h2>

      <div className="flex gap-4">
        <MarketPlaceButton />
        {/* ✅ ปุ่มนำไปหน้า Recycle */}
        <Link to="/recycle">
          <button className="bg-black text-white px-4 py-2 rounded-xl shadow-md hover:bg-gray-800">
            ♻️ Recycle
          </button>
        </Link>
      </div>

      <div className="relative">
        <FaUser
          className="text-2xl cursor-pointer hover:text-gray-400"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        />
        {userMenuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg">
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
            <Link to="/login" className="block px-4 py-2 hover:bg-gray-200">Login</Link>
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">Log Out</button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
