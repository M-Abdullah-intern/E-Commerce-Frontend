import { useMutation } from '@tanstack/react-query';
import { processPayment } from '../api/orderApi';

export const useProcessPayment = () => {
    return useMutation({
        mutationFn: processPayment,
    });
};