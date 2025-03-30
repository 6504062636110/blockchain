import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ ใช้ useNavigate()
import { FaUser, FaHome } from "react-icons/fa";
import { FaRecycle } from "react-icons/fa";
import { useLogout, useProfile } from "@/lib/hook";

function Navbar() {
    const navigate = useNavigate(); // ✅ ใช้ useNavigate() เพื่อเปลี่ยนหน้า
    const { data: profile } = useProfile();
    const { mutate: logout } = useLogout();
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-green-700 text-white flex justify-between items-center px-6 py-3 shadow-md z-50">
            {/* โลโก้ GKT */}
            <h2 className="text-3xl font-extrabold flex items-center gap-2 bg-gradient-to-r from-yellow-300 to-lime-400 text-transparent bg-clip-text drop-shadow-lg">
                <FaRecycle className="text-4xl text-white" /> GKT
            </h2>

            {/* ✅ ปุ่มอยู่ทางขวา และขนาดเท่ากัน */}
            <div className="flex items-center gap-4 ml-auto">
                <button
                    className="text-nowrap flex items-center gap-2 bg-black text-white text-lg font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-800 w-48 h-12 text-center justify-center"
                    onClick={() => navigate("/marketplace")} // ✅ เปลี่ยนไปหน้า Market Place
                >
                    <FaHome className="text-white text-2xl" />
                    Market Place
                </button>
                <button
                    className="flex items-center gap-2 bg-black text-white text-lg font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-gray-800 w-48 h-12 text-center justify-center"
                    onClick={() => navigate("/recycle")} // ✅ เปลี่ยนไปหน้า Recycle
                >
                    ♻️ Recycle
                </button>

                {/* User Icon */}
                <div className="relative">
                    <FaUser
                        className="text-2xl cursor-pointer"
                        onClick={() => setUserMenuOpen(!userMenuOpen)}
                    />
                    {userMenuOpen && (
                        <div className="absolute right-0 mt-2 w-30 bg-white text-black rounded-lg shadow-lg">
                            {profile && !("error" in profile) && (
                                <>
                                    <button
                                        onClick={() => navigate("/profile")}
                                        className="block px-4 py-2 w-full"
                                    >
                                        Profile
                                    </button>

                                    <button
                                        onClick={() => {
                                            logout();
                                        }}
                                        className="block px-4 py-2 w-full"
                                    >
                                        Logout
                                    </button>
                                </>
                            )}

                            {profile && "error" in profile && (
                                <button
                                    onClick={() => navigate("/login")}
                                    className="block px-4 py-2 w-full"
                                >
                                    Login
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
