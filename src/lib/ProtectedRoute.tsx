import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";

interface ProtectedRouteProps {
  children: ReactNode;
  loggedIn?: boolean;
  redirect?: string;
}

export function ProtectedRoute({
  children,
  loggedIn = true,
  redirect = import.meta.env.VITE_LOGIN_SIGN_UP,
}: Readonly<ProtectedRouteProps>) {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useUserStore((state) => state);

  useEffect(() => {
    setIsLoading(false);
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (loggedIn && !token) {
    return <Navigate to={redirect} />;
  } else if (!loggedIn && token) {
    return <Navigate to="/" />;
  }

  return children;
}