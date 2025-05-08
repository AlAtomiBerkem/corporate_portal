import { useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminTabs from './AdminTabs';
import AppHeader from "../../components/AppHeader/AppHeader";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import NewsSection from './NewsSection';
import DocsSection from './DocumentsSection';
import ArticleSection from "./ArticleSection";
import LegalArticlesSection from "./LegalArticlesSection.jsx";
import './styles/AdminPage.css';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('Новости');

    return (
        <div className="admin-app-container">
            <AppHeader />
            <AppNavbar />

            <div className="admin-page">
                <AdminHeader />

                <main className="admin-container">
                    <AdminTabs
                        activeTab={activeTab}
                        onTabChange={setActiveTab}
                    />

                    <div className="admin-content">
                        {activeTab === 'Новости' && <NewsSection />}
                        {activeTab === 'Документы' && <DocsSection />}
                        {activeTab === 'Статьи' && <ArticleSection />}
                        {activeTab === 'Юр. Лица' && <LegalArticlesSection />}

                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminPage;