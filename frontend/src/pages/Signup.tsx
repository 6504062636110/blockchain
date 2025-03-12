import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", birthday: "", phone: "" });
  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleConfirm = () => {
    if (!form.name || !form.birthday || !form.phone) {
      setError("Please fill out the information completely.!");
    } else {
      setError(""); 
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800">SIGN UP</h1>

        {/* Name Input */}
        <input
          type="text"
          name="name"
          placeholder="NAME SURNAME"
          className="w-full p-3 mt-4 border rounded-md text-lg"
          value={form.name}
          onChange={handleChange}
        />

        {/* Birthday Input */}
        <input
          type="date"
          name="birthday"
          className="w-full p-3 mt-4 border rounded-md text-lg"
          value={form.birthday}
          onChange={handleChange}
        />

        {/* Phone Number Input */}
        <input
          type="text"
          name="phone"
          placeholder="PHONE NUMBER"
          className="w-full p-3 mt-4 border rounded-md text-lg"
          value={form.phone}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Confirm Button */}
        <button
          className="w-full bg-orange-400 text-white py-3 mt-6 text-xl font-semibold rounded-md hover:bg-orange-500 transition"
          onClick={handleConfirm}
        >
          CONFIRM
        </button>
      </div>
    </div>
  );
}

export default Signup;
