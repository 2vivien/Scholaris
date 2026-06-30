import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    allowedRoles?: string[];
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
    const { isAuthenticated, user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-slate-50">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-600" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        const match = location.pathname.match(/^\/(user|parent|prof|ecole-dashboard)\/feed\/topics\/([^/]+)(?:\/([^/]+))?$/);
        if (match) {
            const [, , topicId, slug] = match;
            let targetPrefix = '/user';
            if (user.role === 'parent') targetPrefix = '/parent';
            else if (user.role === 'enseignant') targetPrefix = '/prof';
            else if (user.role === 'admin_ecole' || user.role === 'super_admin') targetPrefix = '/ecole-dashboard';
            
            const targetPath = `${targetPrefix}/feed/topics/${topicId}${slug ? '/' + slug : ''}`;
            return <Navigate to={targetPath} replace />;
        }
        return <Navigate to="/" replace />;
    }

    if (user) {
        const pathParts = location.pathname.split('/');
        const pathPrefix = pathParts[1];
        let expectedPrefix = '';
        if (user.role === 'user') expectedPrefix = 'user';
        else if (user.role === 'parent') expectedPrefix = 'parent';
        else if (user.role === 'enseignant') expectedPrefix = 'prof';
        else if (user.role === 'admin_ecole' || user.role === 'super_admin') expectedPrefix = 'ecole-dashboard';

        if (pathPrefix && expectedPrefix && pathPrefix !== expectedPrefix && ['user', 'parent', 'prof', 'ecole-dashboard'].includes(pathPrefix)) {
            const match = location.pathname.match(/^\/(user|parent|prof|ecole-dashboard)\/feed\/topics\/([^/]+)(?:\/([^/]+))?$/);
            if (match) {
                const [, , topicId, slug] = match;
                const targetPath = `/${expectedPrefix}/feed/topics/${topicId}${slug ? '/' + slug : ''}`;
                return <Navigate to={targetPath} replace />;
            }
            return <Navigate to={`/${expectedPrefix}`} replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
