import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const backendUrl = import.meta.env.VITE_API;

export type Product = {
    Product_ID: number;
    ProductName: string;
    CreditPerUnit: number;
    Category_ID: number;
};

export const useProducts = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}/product`);
            return (await response.json())["products"] as Product[];
        },
    });
};

export const useLogin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: { username: string; password: string }) => {
            const response = await fetch(`${backendUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const response = await fetch(`${backendUrl}/logout`, {
                method: "POST",
                credentials: "include",
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};

export const useRecycle = () => {
    return useMutation({
        mutationFn: async (data: { amount: number }) => {
            const response = await fetch(`${backendUrl}/recycle`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });
            return response.json();
        },
    });
};

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
            const json = (await fetchData.json()) as
                | {
                      cusId: number;
                      username: string;
                      name: string;
                      surname: string;
                      phoneNumber: string;
                      walletAddress: string;
                  }
                | {
                      error: string;
                  };
            return json;
        },
    });
};

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (
            data: Partial<{
                name: string;
                surname: string;
                phoneNumber: string;
                walletAddress: string;
            }>,
        ) => {
            const response = await fetch(`${backendUrl}/profile`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });
            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] });
        },
    });
};

export const useMyBalance = () => {
    return useQuery({
        queryKey: ["balance"],
        queryFn: async () => {
            const response = await fetch(`${backendUrl}/getbalance`, {
                method: "GET",
                credentials: "include",
            });
            return (await response.json())["balance"] as number;
        },
    });
};
