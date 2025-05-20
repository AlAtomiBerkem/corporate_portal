import { logout } from "../helpers/Auth.js";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('accessToken');
            navigate('/login')
        } catch (error) {
            console.error('произошла ошибка при выходе', error);
        }
    }
    return handleLogout;
}

export default useLogout;