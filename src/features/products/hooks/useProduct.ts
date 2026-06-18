import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../api/productApi";

export const useProduct = (id: number) => {
    return useQuery({
        queryKey: ["product", id],
        queryFn: () => getProductById(id)
    });
};