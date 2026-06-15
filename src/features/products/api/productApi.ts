import httpClient from "../../../api/httpClient";
import { productEndpoints } from "../../../api/endpoints";

export const getProducts = async (params: {
    pageNumber?: number;
    pageSize?: number;
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: string;
}) => {
    const response = await httpClient.get(productEndpoints.GET_PRODUCTS, {
        params,
    });

    return response.data;
};

export const getProductById = async (id: number ) => {
    const response = await httpClient.get(productEndpoints.GET_BY_ID(id));
    return response.data;
};