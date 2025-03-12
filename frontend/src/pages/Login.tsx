import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!phone) {
      alert("Please sign up first!");
    } else {
      navigate("/marketplace");
    }
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <h1 className="text-3xl font-bold">WELCOME</h1>
      <input
        className="border p-2 mt-4"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded" onClick={handleLogin}>
        LOGIN
      </button>
      <p className="mt-2">Sign up?</p>
    </div>
  );
}

export default Login;
