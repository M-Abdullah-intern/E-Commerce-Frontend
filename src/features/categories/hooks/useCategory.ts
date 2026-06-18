import { useQuery } from '@tanstack/react-query';
import { GetCategories } from '../api/categoryApi';

export const useCategory = () => {
    return useQuery({
        queryKey: ["category"],
        queryFn: () => GetCategories(),
    });
};