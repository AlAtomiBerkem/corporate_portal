import { useNavigate } from 'react-router-dom';
import AdminPanel from '../../components/AdminPanel/AdminPanel.jsx';
import './AdminPage.css';
import Header from "../../components/AppHeader/AppHeader.jsx";
import Navbar from "../../components/AppNavbar/AppNavbar.jsx";

const AdminPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            <Header />
            <Navbar />
            <div className="admin-page">
                <header className="admin-header">
                    <h1 className="admin-title">кабинет Администратора</h1>
                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Выйти
                    </button>
                </header>
                <main className="admin-content">
                    <AdminPanel />
                </main>
            </div>
        </div>
    );
};

export default AdminPage;