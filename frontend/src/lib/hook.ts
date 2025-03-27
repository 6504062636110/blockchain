import { useMutation, useQuery } from "@tanstack/react-query";

const backendUrl = import.meta.env.VITE_API;

type Product = {
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
  });
};
