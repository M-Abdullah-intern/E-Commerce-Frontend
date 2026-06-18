import { useQuery } from '@tanstack/react-query';
import { getUserOrders } from '../api/orderApi';

export const useGetUserOrders = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: getUserOrders,
    });
};