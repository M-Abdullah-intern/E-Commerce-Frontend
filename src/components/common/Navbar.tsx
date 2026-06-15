import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../features/auth/store/authStore";
import { FiShoppingBag } from "react-icons/fi";
import { CiLogout } from "react-icons/ci";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const decodedToken: any = token ? jwtDecode(token) : null;

    return (
        <header className="bg-black text-white px-6 py-3">
            <nav className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FiShoppingBag className="text-xl" />
                    <span className="text-xl font-bold">My App</span>
                </div>

                <ul className="flex items-center gap-6">
                    <li><Link to="/" className="hover:text-gray-400 transition-colors">Home</Link></li>
                    <li><Link to="/products" className="hover:text-gray-400 transition-colors">Products</Link></li>
                    <li><Link to="/cart" className="hover:text-gray-400 transition-colors">Cart</Link></li>
                </ul>

                {isAuthenticated ? (
                    <ul className="flex items-center gap-4">
                        <li className="text-gray-300">Welcome, {decodedToken?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"]}!</li>
                        <li>
                            <button onClick={handleLogout} className="flex items-center gap-1 hover:text-gray-400 transition-colors">
                                <CiLogout className="text-lg" /> Log Out
                            </button>
                        </li>
                    </ul>
                ) : (
                    <ul className="flex items-center gap-4">
                        <li><Link to="/login" className="hover:text-gray-400 transition-colors">Log In</Link></li>
                        <li><Link to="/register" className="hover:text-gray-400 transition-colors">Sign Up</Link></li>
                    </ul>
                )}
            </nav>
        </header>
    );
}
