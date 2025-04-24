import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../ContextApi/UserContext';

const ProtectedRoute = ({ children }) => {
    const { signUser } = useContext(UserContext);
    return signUser?.role === "User" ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;
