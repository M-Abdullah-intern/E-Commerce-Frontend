import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";

export default function NotFoundPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
            <div className="text-7xl font-bold text-gray-200 mb-4">404</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Page Not Found
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
                <FiHome />
                Back to Home
            </Link>
        </div>
    );
}
