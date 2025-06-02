import Onboarding from '@/components/Onboarding/Onboarding';
import config from '@/config';
import MainLayout from '@/layouts/MainLayout';
import Exercises from '@/pages/Exercises';
import Home from '@/pages/Home';

const MainRouter = () => {
    return <MainLayout />;
};

const publicRoutes = {
    children: [
        { path: config.routes.public.welcome, element: <Onboarding />},
        { path: config.routes.public.home, element: <Home />},
        { path: config.routes.user.exercise, element: <Exercises />},
    ]
};

const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes],
};

export default MainRoutes;