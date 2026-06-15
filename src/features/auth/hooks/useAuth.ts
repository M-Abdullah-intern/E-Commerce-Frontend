import { useMutation } from '@tanstack/react-query';
import { login, register } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

// Hook for user login
export const useLogin = () => {

	const loginStore = useAuthStore((s) => s.login);

	return useMutation({
		mutationFn: login,

		onSuccess: (data) => {
			loginStore(data.token);
		},
	});
};

// Hook for user registration
export const useRegister = () => {

	const registerStore = useAuthStore((s) => s.register);

	return useMutation({
		mutationFn: register,

		onSuccess: (data) => {
			registerStore(data.token);
		},
	});
};