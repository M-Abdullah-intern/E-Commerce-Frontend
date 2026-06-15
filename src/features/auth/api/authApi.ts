import httpClient from '../../../api/httpClient';
import { authEndpoints } from '../../../api/endpoints';

// Register a new user
export const register = async (data: {
    name: string;
    email: string;
    password: string;
}) => {
    const res = await httpClient.post(authEndpoints.REGISTER, data);
    return res.data;
};

// Login a user
export const login = async (data: {
    email: string;
    password: string;
}) => {
    const res = await httpClient.post(authEndpoints.LOGIN, data);
    return res.data;
};
