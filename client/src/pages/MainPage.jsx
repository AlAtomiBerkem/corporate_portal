import React from 'react';
import AppHeader from "../components/AppHeader/AppHeader.jsx";
import AppNavbar from "../components/AppNavbar/AppNavbar.jsx";
import AppHeroBlock from "../components/AppHeroBlock/AppHeroBlock.jsx";
import AppUsersBlock from "../components/AppUsersBlock/AppUsersBlock.jsx";
import AppNaturalGasBlock from "../components/AppNaturalGasBlock/AppNaturalGasBlock.jsx";
import AppMaintenance from "../components/AppMaintenance/AppMaintenance.jsx";
import AppContactInfo from "../components/AppContactInfo/AppContactInfo.jsx";
import AppFooter from "../components/AppFooter/AppFooter.jsx";
import FAQ from "../components/AppFAQ/AppFAQ.jsx";
// import NewsList from "../components/NewsList/NewsList.jsx";

const MainPage = () => {
    return (
        <div>
            <AppHeader />
            <AppNavbar />
            <AppHeroBlock />
            <AppUsersBlock />
            {/*<NewsList />*/}
            {/*<AppNaturalGasBlock />*/}
            <AppMaintenance />
            <FAQ />
            <AppContactInfo />
            <AppFooter />
        </div>
    );
};

export default MainPage;