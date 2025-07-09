import { useEffect, useState } from "react";

import { useAuth } from "../../auth/hooks/useAuth";
import { Navigate, Outlet } from "react-router";
import LoadingSpinner from "./LoadingSpinner";
export default function ProtectedRoute() {
    const { isLogin } = useAuth();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    useEffect(() => {
        if (isLogin !== null) {
            setIsCheckingAuth(false);
        }
    }, [isLogin]);
    if (isCheckingAuth) {
        return <LoadingSpinner></LoadingSpinner>;
    }
    if (!isLogin) {
        console.log("Usuario no autenticado", { isLogin });
        return <Navigate to="/auth" replace />;
    }
    return <Outlet />;
}
