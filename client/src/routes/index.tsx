import React from 'react';
import { useRoutes } from 'react-router-dom';
import Layout from '../layout/index' // This Component allows only logged in user to access protected routes

const AuthGuard = React.lazy(() => import('../components/auth/AuthGuard'));
const HomePage = React.lazy(() => import('../pages/HomePage'));
const AuthPage = React.lazy(() => import('../pages/AuthPage'));
const FavGenres = React.lazy(() => import('../pages/FavGenres'));
const MoviePage = React.lazy(() => import('../pages/MoviePage'));
const TVSeriesPage = React.lazy(() => import('../pages/TvSeriesPage'));
const VideoDetailsPage = React.lazy(() => import('../components/reusable/VideoDetailsPage'));
const BookmarkPage = React.lazy(() => import('../pages/BookmarkPage'));
const AddNewMovie = React.lazy(() => import('../pages/AddNewMovie'));
const EditMovie = React.lazy(() => import('../pages/EditMovie'));

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            children: [
                { element: <AuthPage />, index: true },
                {
                    path: 'fav-genres',
                    element:
                        <AuthGuard>
                            <FavGenres />
                        </AuthGuard>,
                },
                {
                    path: 'add-movie',
                    element:
                        <AuthGuard>
                            <AddNewMovie />
                        </AuthGuard>
                },
                {
                    path: 'edit-movie',
                    element:
                        <AuthGuard>
                            <EditMovie />
                        </AuthGuard>
                }
            ]
        },

        {
            path: 'home',
            element:
                <AuthGuard>
                    <Layout />
                </AuthGuard>,
            children: [
                {
                    path: '', element: <HomePage />,
                },
                {
                    path: 'movies', element: <MoviePage />
                },
                {
                    path: 'tv-series', element: <TVSeriesPage />
                },
                {
                    path: 'video/details', element: <VideoDetailsPage />
                },
                {
                    path: 'bookmark', element: <BookmarkPage />
                },
            ]
        },
    ]);
}
