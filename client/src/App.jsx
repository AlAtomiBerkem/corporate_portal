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
import NewsList from "./components/NewsList/NewsList.jsx";
import NewsDetail from "./components/NewsDitail/NewsDitail.jsx";
import PageLegal from "./pages/PageLegal/PageLegal.jsx"
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
                <Route path="/PageLegal" element={<PageLegal />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/news" element={<NewsList />} />
                <Route path="/news/:id" element={<NewsDetail />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;