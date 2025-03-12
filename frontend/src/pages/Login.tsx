import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleLogin = () => {
    if (phone.trim() === "") {
      setError("Please fill out the information completely.!");
    } else {
      setError("");
      navigate("/marketplace");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800">WELCOME</h1>

        {/* Phone Input */}
        <input
          type="text"
          placeholder="PHONE NUMBER"
          className="w-full p-3 mt-6 border rounded-md text-center text-lg"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError(""); 
          }}
        />
        
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Login Button */}
        <button
          className="w-full bg-orange-400 text-white py-3 mt-6 text-xl font-semibold rounded-md hover:bg-orange-500 transition"
          onClick={handleLogin}
        >
          LOGIN
        </button>

        {/* Sign Up Button */}
        <button
          className="w-full bg-blue-500 text-white py-3 mt-4 text-lg font-semibold rounded-md hover:bg-blue-600 transition"
          onClick={() => navigate("/signup")}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
}

export default Login;
