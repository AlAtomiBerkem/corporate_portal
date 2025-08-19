import React, { useEffect } from 'react';
import AppHeader from "../components/AppHeader/AppHeader.jsx";
import AppNavbar from "../components/AppNavbar/AppNavbar.jsx";
import AppHeroBlock from "../components/AppHeroBlock/AppHeroBlock.jsx";
import AppUsersBlock from "../components/AppUsersBlock/AppUsersBlock.jsx";
import AppNaturalGasBlock from "../components/AppNaturalGasBlock/AppNaturalGasBlock.jsx";
import AppMaintenance from "../components/AppMaintenance/AppMaintenance.jsx";
import AppContactInfo from "../components/AppContactInfo/AppContactInfo.jsx";
import AppFooter from "../components/AppFooter/AppFooter.jsx";
import FAQ from "../components/AppFAQ/AppFAQ.jsx";

import NewsList from "../components/NewsList/NewsList.jsx";

const MainPage = ({}) => {
    useEffect(() => {
        const usr = window.history.state && window.history.state.usr;

        // Скролл в самый низ: ждём, пока высота страницы стабилизируется (секции/новости догрузятся)
        if (usr?.scrollToBottom) {
            let lastHeight = 0;
            let stableForMs = 0;
            let elapsedMs = 0;
            const intervalMs = 200;
            const maxMs = 6000;
            const stableNeededMs = 600; // считаем стабильно, если 600мс высота не менялась

            const interval = setInterval(() => {
                elapsedMs += intervalMs;
                const currentHeight = document.documentElement.scrollHeight;
                if (currentHeight !== lastHeight) {
                    lastHeight = currentHeight;
                    stableForMs = 0;
                    // Подтягиваемся к низу по мере роста контента
                    window.scrollTo({ top: currentHeight, behavior: 'auto' });
                } else {
                    stableForMs += intervalMs;
                }

                if (stableForMs >= stableNeededMs || elapsedMs >= maxMs) {
                    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                    clearInterval(interval);
                }
            }, intervalMs);

            return () => clearInterval(interval);
        }

        // Скролл к якорю: ждём появления элемента
        if (usr?.scrollToId) {
            const anchorId = usr.scrollToId;
            const tryScroll = () => {
                const el = document.getElementById(anchorId);
                if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    return true;
                }
                return false;
            };

            if (tryScroll()) return;

            let elapsedMs = 0;
            const maxMs = 6000;
            const intervalMs = 150;
            const interval = setInterval(() => {
                elapsedMs += intervalMs;
                if (tryScroll() || elapsedMs >= maxMs) {
                    clearInterval(interval);
                }
            }, intervalMs);

            return () => clearInterval(interval);
        }
    }, []);

    return (
        <div>
            <AppHeader />
            <AppNavbar />
            <AppHeroBlock />
            {/*<AppUsersBlock />*/}
            <NewsList />
            {/*<AppNaturalGasBlock />*/}
            <AppMaintenance />
            <FAQ />
            <AppContactInfo />
            <AppFooter />
        </div>
    );
};

export default MainPage;