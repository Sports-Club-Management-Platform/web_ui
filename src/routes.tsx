import { CleanLayout } from "./layouts/Layout";
import { lazy, Suspense, ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUserStore } from "@/stores/useUserStore";

function ProtectedRoute({
  children,
  loggedIn = true,
  redirect = import.meta.env.VITE_LOGIN_SIGN_UP,
}: {
  children: ReactNode;
  loggedIn?: boolean;
  redirect?: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useUserStore((state: string) => state);

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

const LandingPage = lazy(() => import("./pages/LandingPage"));
const RedirectPage = lazy(() => import("./pages/RedirectPage"));
const MatchesPage = lazy(() => import("./pages/MatchesPage"));
const TicketPurchasePage = lazy(() => import("./pages/TicketPurchasePage"));
const GeneralError = lazy(() => import("./pages/ErrorPages/GeneralError"));
const MaintenanceError = lazy(
  () => import("./pages/ErrorPages/MaintenanceError")
);
const NotFoundError = lazy(() => import("./pages/ErrorPages/NotFoundError"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));

const routes = [
  {
    path: "/",
    element: <CleanLayout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "/matches",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MatchesPage />
          </Suspense>
        ),
      },
      {
        path: "/ticket-purchase/:gameId",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TicketPurchasePage />
          </Suspense>
        ),
      },
      {
        path: "/checkout-success",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CheckoutPage message="Success! Your order was completed." />
          </Suspense>
        ),
      },
      {
        path: "/checkout-canceled",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CheckoutPage message="Order canceled. Please try again." />
          </Suspense>
        ),
      },
      {
        path: "/error",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <GeneralError />
          </Suspense>
        ),
        exact: true,
      },
      {
        path: "/maintenance",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MaintenanceError />
          </Suspense>
        ),
        exact: true,
      },
      {
        path: "/404",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <NotFoundError />
          </Suspense>
        ),
        exact: true,
      },
      {
        path: "*",
        element: <Navigate to="/404" />,
      },
    ],
  },
  {
    path: "/oauth2/idpresponse",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <RedirectPage />
      </Suspense>
    ),
  },
];

export { routes };
