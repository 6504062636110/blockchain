import { useQuery } from "@tanstack/react-query";

export default function Profile() {
  const { data: profile } = useProfile();

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80">
        {/* <div className="w-20 h-20 bg-black rounded-full mx-auto mb-4"></div> */}
        <h2 className="text-lg font-bold">Username</h2>
        <p className="text-xl">{profile?.username || "Guest"}</p>

        {/* <h2 className="text-lg font-bold mt-2">Address</h2> */}
        {/* <p className="truncate">{profile?.walletAddress || "Not provided"}</p> */}

        <h2 className="text-lg font-bold mt-2">Total Carbon Credits</h2>
        <p className="text-2xl font-bold">{0}</p>
        {/* TODO: Add carbon credit count */}
      </div>
    </div>
  );
}

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const backendUrl = import.meta.env.VITE_API;
      console.log("backendUrl", backendUrl);
      const fetchData = await fetch(`${backendUrl}/profile`, {
        method: "GET",
        credentials: "include",
      });
      const json = (await fetchData.json()) as {
        cusId: number;
        username: string;
        name: string;
        surname: string;
        phoneNumber: string;
        walletAddress: string;
      };
      return json;
    },
  });
};
