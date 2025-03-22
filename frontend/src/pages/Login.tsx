import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      setError("Please enter both username and password!");
    } else {
      setError("");
      // ✅ Simulate user data (replace with real authentication logic)
      const user = { name: "John Doe", username, totalCredit: 50 };

      // For simplicity, you can save the data to Local Storage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect user after successful login
      navigate("/marketplace");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold text-gray-800">WELCOME</h1>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mt-6 border rounded-md text-center text-lg"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError("");
          }}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mt-6 border rounded-md text-center text-lg"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        {/* Login Button */}
        <button
          className="w-full bg-orange-400 text-white py-3 mt-6 text-xl font-semibold rounded-md hover:bg-orange-500 transition"
          onClick={handleLogin}
        >
          LOGIN
        </button>

        {/* Sign Up Link */}
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
