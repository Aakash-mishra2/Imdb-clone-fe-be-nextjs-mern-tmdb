import { useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
interface AppProviderProps {
    children: ReactNode;
}

export const AuthGuard: React.FC<AppProviderProps> = ({ children }) => {
    const isAuthenticated = useSelector((state: any) => state.account.isAuthenticated);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    return children;
};

export default AuthGuard;
