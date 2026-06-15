import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth/store/authStore";

export default function ProtectedRoute() {
  const isAuth = useAuthStore((s) => s.isAuthenticated);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}