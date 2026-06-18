import httpClient from '../../../api/httpClient';
import { shipmentEndpoints } from '../../../api/endpoints';
import type { CreateAddressData } from '../types/CreateAddressData';

export const getAddress = async () => {
    const response = await httpClient.get(shipmentEndpoints.GET_ADDRESSES);
    return response.data;
};

export const createAddress = async (addressData: CreateAddressData) => {
    const response = await httpClient.post(shipmentEndpoints.POST_ADDRESS, addressData);
    return response.data;
};