import './styles/AppStyle.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from "./pages/MainPage.jsx";
import PageContent from "./pages/PageContent/PageContent.jsx";
import PageNotFound from "./pages/PageNotFound/PageNotFound.jsx";
import PageTechnicalWork from "./pages/PageTechnicalWork/PageTechnicalWork.jsx";
import PageLogin from "./pages/PageLogin/PageLogin.jsx";
import AdminPage from "./pages/AdminPage/AdminPage.jsx";
import Documents from "./components/Documents/Documents.jsx";
import PrivateRoute from './helpers/PrivateRoute.jsx'
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/PageContent" element={<PageContent />} />
                <Route path="/PageTechnicalWork" element={<PageTechnicalWork />} />
                <Route path="/login" element={<PageLogin />} />
                <Route path="/admin" element={
                    <PrivateRoute>
                    <AdminPage />
                    </PrivateRoute>
                } />
                <Route path="/documents" element={<Documents />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;