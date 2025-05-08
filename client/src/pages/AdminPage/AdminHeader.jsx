import './styles/AdminHeader.css';

const AdminHeader = () => {
    return (
        <header className="admin-header">
            <h1 className="admin-title">Кабинет Администратора</h1>
            <button className="admin-logout-btn">
                <span className="btn-text">Выйти</span>
                <span className="btn-icon">→</span>
            </button>
        </header>
    );
};

export default AdminHeader;