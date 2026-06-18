import httpClient from '../../../api/httpClient';
import { orderEndpoints, paymentEndpoints } from '../../../api/endpoints';
import type { PlaceOrderData, PaymentData } from '../types/order';

export const placeOrder = async (data: PlaceOrderData) => {
    const response = await httpClient.post(orderEndpoints.PLACE_ORDER, data);
    return response.data;
};

export const getUserOrders = async () => {
    const response = await httpClient.get(orderEndpoints.GET_USER_ORDERS);
    return response.data;
};

export const processPayment = async (data: PaymentData) => {
    const response = await httpClient.post(paymentEndpoints.PAYMENT, data);
    return response.data;
};