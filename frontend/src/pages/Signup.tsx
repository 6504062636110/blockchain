import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({ name: "", birthday: "", phone: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    if (!form.name || !form.birthday || !form.phone) {
      alert("All fields are required!");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center pt-20">
      <h1 className="text-3xl font-bold">SIGN UP</h1>
      <input className="border p-2 mt-2" name="name" placeholder="Name Surname" onChange={handleChange} />
      <input className="border p-2 mt-2" name="birthday" type="date" onChange={handleChange} />
      <input className="border p-2 mt-2" name="phone" placeholder="Phone Number" onChange={handleChange} />
      <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded" onClick={handleConfirm}>
        CONFIRM
      </button>
    </div>
  );
}

export default Signup;
