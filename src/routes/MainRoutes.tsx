import Onboarding from '@/components/Onboarding/Onboarding';
import config from '@/config';
import MainLayout from '@/layouts/MainLayout';
import Exercises from '@/pages/Exercises';
import Home from '@/pages/Home';
import Practice from '@/pages/Practice/Practice';
import Quest from '@/pages/Quest/Quest';
import ResultProcess from '@/pages/Result';

const MainRouter = () => {
    return <MainLayout />;
};

const publicRoutes = {
    children: [
        { path: config.routes.public.welcome, element: <Onboarding />},
        { path: config.routes.public.home, element: <Home />},
        { path: config.routes.user.exercise, element: <Exercises />},
        { path: config.routes.user.result, element: <ResultProcess /> },
        { path: config.routes.user.practice, element: <Practice /> },
        { path: config.routes.user.quest, element: <Quest /> },
    ]
};

const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes],
};

export default MainRoutes;