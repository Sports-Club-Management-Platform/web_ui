import { CleanLayout } from "./layouts/Layout";
import { lazy, Suspense, ReactNode, useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const RedirectPage = lazy(() => import('./pages/RedirectPage'));
const MatchesPage = lazy(() => import('./pages/MatchesPage'));

const routes = [
    {
        path: '/',
        element: <CleanLayout />,
        children: [
            {
                path: '/',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <LandingPage />
                    </Suspense>
                )
            },
            {
                path: '/matches',
                element: (
                    <Suspense fallback={<div>Loading...</div>}>
                        <MatchesPage />
                    </Suspense>
                )
            }
        ],

    },
    {
        path: '/oauth2/idpresponse',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <RedirectPage />
            </Suspense>
        )
    }
];

export { routes }