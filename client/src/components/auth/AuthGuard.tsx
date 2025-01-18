// This Component will ensure that only logged in user access the protected routes

import { useEffect, ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useSelector } from 'react-redux';

//Defing the type of children is will accept
interface AppProviderProps {
    children: ReactNode;
}

export const AuthGuard: React.FC<AppProviderProps> = ({ children }) => {
    //const { isAuthenticated } = useContext(AppContext);
    const isAuthenticated = useSelector((state: any) => state.account.isAuthenticated);
    const navigate = useNavigate();

    //If not authenticated then send him to the login page else serve the requested route
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return children;
};

export default AuthGuard;
