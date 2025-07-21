import Onboarding from '@/components/Onboarding/Onboarding';
import config from '@/config';
import MainLayout from '@/layouts/MainLayout';
import Exercises from '@/pages/Exercises';
import Home from '@/pages/Home';
import Practice from '@/pages/Practice/Practice';
import Quest from '@/pages/Quest/Quest';
import Leaderboard from '@/pages/Leaderboard/Leaderboard';
import ResultProcess from '@/pages/Result';
import Profile from '@/pages/Profile/Profile';
import Shop from '@/pages/Shop/Shop';
import AllAchievement from '@/pages/Profile/AllAchievement/AllAchievement';
import FriendSearch from '@/pages/FriendSearch/FriendSearch';
import cookieUtils from '@/services/cookieUtils';
import { Navigate } from 'react-router-dom';


const MainRouter = () => {
    const isFinishFirstStep = localStorage.getItem('FIRST_STEP');
    if(!isFinishFirstStep) {
        localStorage.setItem('FIRST_STEP', 'false');
    };

    const role = cookieUtils.getRole();
    if(role === 1) return <Navigate to={config.routes.admin.language} />;
    
    return <MainLayout />;
};

const publicRoutes = {
    children: [
        { path: config.routes.public.welcome, element: <Onboarding /> },
        { path: config.routes.public.home, element: <Home /> },
        { path: config.routes.user.exercise, element: <Exercises /> },
        { path: config.routes.user.result, element: <ResultProcess /> },
        { path: config.routes.user.practice, element: <Practice /> },
        { path: config.routes.user.quest, element: <Quest /> },
        { path: config.routes.user.leaderboard, element: <Leaderboard /> },
        { path: config.routes.user.profile, element: <Profile /> },
        { path: config.routes.user.shop, element: <Shop /> },
        { path: config.routes.user.achievements, element: <AllAchievement /> },
        { path: config.routes.user.search, element: <FriendSearch /> },

    ]
};

const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes],
};

export default MainRoutes;