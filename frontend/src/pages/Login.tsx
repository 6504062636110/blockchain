import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (phone.trim() === "") {
      setError("Please enter your phone number!");
    } else {
      setError("");
      // ✅ บันทึกข้อมูลผู้ใช้ลง Local Storage
      const user = { name: "John Doe", birthday: "1990-01-01", phone, totalCredit: 50 };
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/marketplace");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800">WELCOME</h1>

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-3 mt-6 border rounded-md text-center text-lg"
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            setError("");
          }}
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* ✅ ปุ่ม Login */}
        <button className="w-full bg-orange-400 text-white py-3 mt-6 text-xl font-semibold rounded-md hover:bg-orange-500 transition"
          onClick={handleLogin}>
          LOGIN
        </button>

        {/* ✅ ปุ่ม Sign Up อยู่แน่นอน */}
        <p className="mt-4 text-gray-600">
          Don't have an account?
          <button 
            className="text-blue-600 font-semibold ml-2 hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
