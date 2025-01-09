import { useUserStore } from "@/stores/useUserStore";
import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
    children: ReactNode;
    loggedIn?: boolean;
    redirect?: string;
    };

export function AdminRoute({
    children,
    loggedIn = true,
    redirect = import.meta.env.VITE_LOGIN_SIGN_UP,
}: Readonly<AdminRouteProps>) {
    const { token } = useUserStore((state) => state);
    const admin = useUserStore((state) => state.admin);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, [token]);

    if (isLoading) {
        return <div>Carregando a Página, por favor aguarde</div>;
    }

    if (loggedIn && (!token || !admin)) {
        return <Navigate to={redirect} />;
    } else if (!loggedIn && token && admin) {
        return <Navigate to="/" />;
    }

    return children;

}
    