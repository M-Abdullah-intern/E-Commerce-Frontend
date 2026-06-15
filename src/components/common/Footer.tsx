import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <p className="text-sm">© 2026 My App. All rights reserved.</p>
                    <div className="flex items-center gap-4 text-sm">
                        <Link to="/about" className="hover:text-white transition-colors">About</Link>
                        <span className="text-gray-700">·</span>
                        <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
                        <span className="text-gray-700">·</span>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
