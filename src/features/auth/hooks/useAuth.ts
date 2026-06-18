import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

// Hook for user login
export const useLogin = () => {
	const navigate = useNavigate();
	const loginStore = useAuthStore((s) => s.login);

	return useMutation({
		mutationFn: login,

		onSuccess: (data) => {
			loginStore(data.token);
			navigate('/');
		},
		onError: (error) => {
			console.error("Login failed:", error);
		}
	});
};

// Hook for user registration
export const useRegister = () => {


	const navigate = useNavigate();
	const registerStore = useAuthStore((s) => s.register);

	return useMutation({
		mutationFn: register,

		onSuccess: (data) => {
			registerStore(data.token);
			navigate('/');
		},

		onError: (error) => {
			console.error("Registration failed:", error);
        },
	});
};