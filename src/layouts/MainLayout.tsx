import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

export default function MainLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 p-4">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}