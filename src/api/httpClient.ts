import axios from "axios";
import { getToken } from "../utils/token";

const httpClient = axios.create({
    baseURL: "https://localhost:7142/api",
});

httpClient.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default httpClient;