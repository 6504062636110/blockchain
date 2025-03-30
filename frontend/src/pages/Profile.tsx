import { useMyBalance, useProfile, useUpdateProfile } from "@/lib/hook";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Profile() {
    const { data: profile } = useProfile();
    const { mutate: updateProfile } = useUpdateProfile();
    const { data: balance } = useMyBalance();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        phoneNumber: "",
        walletAddress: "",
    });

    useEffect(() => {
        if (profile && !("error" in profile)) {
            setFormData({
                name: profile.name || "",
                surname: profile.surname || "",
                phoneNumber: profile.phoneNumber || "",
                walletAddress: profile.walletAddress || "",
            });
        }
    }, [profile]);

    if (profile && "error" in profile) {
        navigate("/login");
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile(formData);
    };

    return (
        <div className="min-h-screen flex items-center justify-center ">
            <div className="bg-white p-6 rounded-xl shadow-lg text-left w-full max-w-xl">
                <h2 className="text-lg font-bold">Username</h2>
                <p className="text-xl font-mono">
                    {profile?.username || "Guest"}
                </p>

                <form onSubmit={handleSubmit}>
                    <h2 className="text-lg font-bold mt-2">Name</h2>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />

                    <h2 className="text-lg font-bold mt-2">Surname</h2>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />

                    <h2 className="text-lg font-bold mt-2">Phone Number</h2>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                    <h2 className="text-lg font-bold mt-4">Wallet Address</h2>
                    <input
                        type="text"
                        name="walletAddress"
                        value={formData.walletAddress || ""}
                        onChange={handleChange}
                        className="border p-2 rounded w-full break-words font-mono text-base"
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                    >
                        Update Profile
                    </button>
                </form>

                <h2 className="text-lg font-bold mt-2 text-center">
                    Total Carbon Credits
                </h2>
                <p className="text-2xl font-bold text-center">{balance}</p>
            </div>
        </div>
    );
}
