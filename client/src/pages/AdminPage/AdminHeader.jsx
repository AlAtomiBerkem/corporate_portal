import './styles/AdminHeader.css';
import { useLogout } from '../../hooks/useLogout.js';

const AdminHeader = () => {

    const handleLogout = useLogout();
    return (
        <header className="admin-header">
            <h1 className="admin-title">Кабинет Администратора</h1>
            <button
                className="admin-logout-btn"
                onClick={handleLogout}
            >
                <span className="btn-text">Выйти</span>
                <span className="btn-icon">→</span>
            </button>
        </header>
    );
};

export default AdminHeader;