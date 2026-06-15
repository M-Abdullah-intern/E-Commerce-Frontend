import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import ProductsPage from "../features/products/pages/ProductsPage";
import ProductDetailsPage from "../features/products/pages/ProductDetailsPage";
import CartPage from "../features/cart/pages/CartPage";

export const router = createBrowserRouter([
    // All pages with navbar go under MainLayout
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: "products",
                element: <ProductsPage />,
            },
            {
                path: "products/:id",
                element: <ProductDetailsPage />,
            },
            {
                path: "cart",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "",
                        element: <CartPage />,
                    },
                ],
            },
        ],
    },

    // Pages WITHOUT navbar (standalone)
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
]);