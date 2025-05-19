import { useState } from 'react';
import AdminHeader from './AdminHeader.jsx';
import AdminTabs from './AdminTabs.jsx';
import AppHeader from "../../components/AppHeader/AppHeader.jsx";
import AppNavbar from "../../components/AppNavbar/AppNavbar.jsx";
import NewsSection from './getContentComp/NewsSection.jsx';
import DocsSection from './getContentComp/DocumentsSection.jsx';
import ArticleSection from "./getContentComp/ArticleSection.jsx";
import LegalArticlesSection from "./getContentComp/LegalArticlesSection.jsx";
import './styles/AdminPage.css';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('Новости');

    return (
        <div className="admin-app-container">
            <AppHeader />
            <AppNavbar />

            <div className="admin-page" id='myButton'>
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