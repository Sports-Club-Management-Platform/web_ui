import { CleanLayout } from "./layouts/Layout";
import { AdminLayout } from "./layouts/AdminLayout";
import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import {
  LandingPage,
  RedirectPage,
  MatchesPage,
  ManagementPage,
  TicketPurchasePage,
  GeneralError,
  MaintenanceError,
  NotFoundError,
  CheckoutPage
} from "@/lib/pages";
import { AdminRoute } from "@/lib/AdminRoute";

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
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "/management/tickets",
        element: (
            <Suspense fallback={<div>Loading...</div>}>
              <AdminRoute>
                <ManagementPage />
              </AdminRoute>
            </Suspense>
        ),
      },
    ],
  },
];

export { routes };
