import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/productApi";

interface ProductFilters {
    search?: string;
    pageNumber?: number;
    pageSize?: number;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: "price" | "name" | "rating";
    sortOrder?: "asc" | "desc";
}

export const useProducts = (filters?: ProductFilters) => {
    return useQuery({
        queryKey: ["products", filters],
        queryFn: () => getProducts(filters),
        placeholderData: (previousData) => previousData,
    });
};