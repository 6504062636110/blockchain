import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SignUp = () => {
  const [form, setForm] = useState({ name: "", birthday: "", username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (!form.name || !form.birthday || !form.username || !form.password) {
      setError("All fields are required!");
    } else {
      setError("");
      // ✅ Save user data to Local Storage
      const userData = { ...form, totalCredit: 0 };
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/login");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800">SIGN UP</h1>

        {/* Full Name Input */}
        <input
          className="w-full p-3 mt-4 border rounded-md text-lg"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />
        
        {/* Birthday Input */}
        <input
          className="w-full p-3 mt-4 border rounded-md text-lg"
          name="birthday"
          type="date"
          value={form.birthday}
          onChange={handleChange}
        />
        
        {/* Username Input */}
        <input
          className="w-full p-3 mt-4 border rounded-md text-lg"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
        />

        {/* Password Input */}
        <input
          className="w-full p-3 mt-4 border rounded-md text-lg"
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Confirm Button */}
        <Button className="w-full bg-orange-400 text-white py-3 mt-6 text-xl font-semibold rounded-md hover:bg-orange-500 transition"
          onClick={handleConfirm}>
          CONFIRM
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
