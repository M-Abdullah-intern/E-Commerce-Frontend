import { useState } from 'react';
import { useLogin } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';
import { FaKey, FaArrowLeft } from 'react-icons/fa';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginMutation = useLogin();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ email, password });
        navigate(-1);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl">

                <div className="flex items-center gap-2">
                    <FaArrowLeft className="text-gray-500 cursor-pointer" size={16} />
                    <span
                        className="text-gray-500 cursor-pointer text-sm hover:text-black transition-colors"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </span>
                </div>

                <div className="text-center">
                    <div className="flex justify-center mb-2">
                        <FaKey className="text-black" size={24} />
                    </div>
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent placeholder:text-gray-400"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {loginMutation.isError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
                            Login failed. Please check your credentials.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loginMutation.isPending}
                        className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loginMutation.isPending ? "Loading..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-medium text-black hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}