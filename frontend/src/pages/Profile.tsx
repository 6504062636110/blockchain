import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState<{ name: string; address: string; carbonCredit: number } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
        <div className="w-20 h-20 bg-black rounded-full mx-auto mb-4"></div>
        <h2 className="text-lg font-bold">Username</h2>
        <p className="text-xl">{user?.name || "Guest"}</p>

        <h2 className="text-lg font-bold mt-2">Address</h2>
        <p className="truncate">{user?.address || "Not provided"}</p>

        <h2 className="text-lg font-bold mt-2">Total Carbon Credits</h2>
        <p className="text-2xl font-bold">{user?.carbonCredit || 0}</p>
      </div>
    </div>
  );
}
