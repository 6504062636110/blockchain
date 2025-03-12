import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHome } from "react-icons/fa"; 
import { FaRecycle } from "react-icons/fa";

function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-green-700 text-white flex justify-between items-center px-6 py-3 shadow-md z-50">
      {/* โลโก้ GKT */}
      <h2 className="text-3xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-lime-400 text-transparent bg-clip-text drop-shadow-lg">
        <FaRecycle className="text-4xl text-white" /> GKT</h2>

      {/* ✅ ปุ่มอยู่ทางขวา และขนาดเท่ากัน */}
      <div className="flex items-center gap-4 ml-auto">
        <Link to="/marketplace">
          <button className="flex items-center gap-2 bg-black text-white text-lg font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-800 w-48 h-12 text-center justify-center">
            <FaHome className="text-white text-2xl" /> {/* ✅ เปลี่ยนเป็นไอคอนบ้าน */}
            Market Place
          </button>
        </Link>
        <Link to="/recycle">
          <button className="flex items-center gap-2 bg-black text-white text-lg font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-800 w-48 h-12 text-center justify-center">
            ♻️ Recycle
          </button>
        </Link>

        {/* User Icon */}
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
      </div>
    </nav>
  );
}

export default Navbar;
