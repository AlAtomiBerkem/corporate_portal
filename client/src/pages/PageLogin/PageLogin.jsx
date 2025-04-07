import LoginForm from '../../components/LoginForm/LoginForm.jsx';
import './PageLoginSryle.css';
import Header from '../../components/AppHeader/AppHeader.jsx';
import Navbar from '../../components/AppNavbar/AppNavbar.jsx';

const PageLogin = () => {
    return (
        <div className="login-page">
            <Header />
            <Navbar />
                <LoginForm />

        </div>
    );
};

export default PageLogin;