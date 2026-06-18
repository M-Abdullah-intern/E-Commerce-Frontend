import type { Category } from "../types/category";
import httpClient from "../../../api/httpClient";
import { categoryEndpoints } from "../../../api/endpoints"; 

export const GetCategories = async () => {
    const response = await httpClient.get<Category[]>(categoryEndpoints.GET_CATEGORIES);
    console.log("GetCategories response:", response);       
    return response.data;
}