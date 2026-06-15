import httpClient from "../../../api/httpClient";
import { cartEndpoints } from "../../../api/endpoints";

export const getCart = async () => {
    const response = await httpClient.get(cartEndpoints.GET_CART);
    return response.data;
};

export const addItemToCart = async (data: { productId: number; quantity: number }) => {
    const response = await httpClient.post(cartEndpoints.ADD_ITEM, data);
    return response.data;
};

export const updateCartItem = async (data: { cartItemId: number; quantity: number }) => {
    const response = await httpClient.put(cartEndpoints.UPDATE_CART_ITEM(data.cartItemId), {
        quantity: data.quantity,
    });
    return response.data;
};

export const removeCartItem = async (cartItemId: number) => {
    const response = await httpClient.delete(cartEndpoints.REMOVE_CART_ITEM(cartItemId));
    return response.data;
};
