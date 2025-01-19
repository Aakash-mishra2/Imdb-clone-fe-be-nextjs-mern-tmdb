
// This component will serve all the routes 
import { useRoutes } from 'react-router-dom';
import Layout from '../layout/index'

import AuthGuard from '../components/auth/AuthGuard';  // This Component will ensure that only logged in user access the protected routes
import HomePage from '../pages/HomePage'
import AuthPage from '../pages/AuthPage'
import FavGenres from '../pages/FavGenres';
import MoviePage from '../pages/MoviePage';
import TVSeriesPage from '../pages/TvSeriesPage';
import VideoDetailsPage from '../components/reusable/VideoDetailsPage';
import BookmarkPage from '../pages/BookmarkPage';
import AddNewMovie from '../pages/AddNewMovie';

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
