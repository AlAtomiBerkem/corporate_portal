import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../api/auth.js";

export const PrivateRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to='/login' replace />;
}

export default PrivateRoute;