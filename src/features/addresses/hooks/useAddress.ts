import { useQuery } from '@tanstack/react-query';
import { getAddress } from '../api/addressApi';

export const useAddress = () => {
    return useQuery({
        queryKey: ['addresses'],
        queryFn: getAddress,
    });
};
