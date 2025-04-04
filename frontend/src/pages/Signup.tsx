import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/lib/hook";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
    const { mutate: register, isPending } = useRegister();
    const { toast } = useToast();

    const handleConfirm = async () => {
        if (
            !form.name ||
            !form.surname ||
            !form.phone ||
            !form.username ||
            !form.password
        ) {
            setError("All fields are required!");
        } else {
            setError("");

            register(form, {
                onSuccess: (data) => {
                    console.log(data);
                    toast({
                        title: "Registration successful!",
                    });
                    navigate("/marketplace");
                },
                onError: (error: any) => {
                    setError(error?.message || "Registration failed!");
                },
            });
        }
    };
    const [form, setForm] = useState({
        name: "",
        surname: "",
        phone: "",
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center w-96">
                <h1 className="text-3xl font-bold text-gray-800">SIGN UP</h1>

                {/* Name Input */}
                <input
                    className="w-full p-3 mt-4 border rounded-md text-lg"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                />

                {/* Surname Input */}
                <input
                    className="w-full p-3 mt-4 border rounded-md text-lg"
                    name="surname"
                    placeholder="Surname"
                    value={form.surname}
                    onChange={handleChange}
                />

                {/* Phone Number Input */}
                <input
                    className="w-full p-3 mt-4 border rounded-md text-lg"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
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
                <Button
                    disabled={isPending}
                    className="w-full bg-orange-400 text-white py-3 mt-6 text-xl font-semibold rounded-md hover:bg-orange-500 transition"
                    onClick={handleConfirm}
                >
                    CONFIRM
                </Button>
            </div>
        </div>
    );
};

export default SignUp;
