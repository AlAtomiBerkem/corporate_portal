import './styles/AdminTabs.css';

const tabs = ['Новости', 'Документы','Юр. Лица', 'Статьи'];

const AdminTabs = ({ activeTab, onTabChange }) => {
    return (
        <div className="admin-tabs">
            {tabs.map(tab => (
                <button
                    key={tab}
                    className={`tab ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default AdminTabs;