import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../ContextApi/UserContext';

const AdminRoute = ({ children }) => {
    const { signUser } = useContext(UserContext);
    return signUser?.role === "Admin" ? children : <Navigate to="/signin" />;
};

export default AdminRoute;
