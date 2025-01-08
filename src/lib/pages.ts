import { lazy } from "react";

export const LandingPage = lazy(() => import("../pages/LandingPage"));
export const RedirectPage = lazy(() => import("../pages/RedirectPage"));
export const MatchesPage = lazy(() => import("../pages/MatchesPage"));
export const ManagementPage = lazy(() => import("../pages/ManagementPage"));
export const TicketPurchasePage = lazy(() => import("../pages/TicketPurchasePage"));
export const GeneralError = lazy(() => import("../pages/ErrorPages/GeneralError"));
export const MaintenanceError = lazy(() => import("../pages/ErrorPages/MaintenanceError"));
export const NotFoundError = lazy(() => import("../pages/ErrorPages/NotFoundError"));
export const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
