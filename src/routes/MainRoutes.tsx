import config from '@/config';
import MainLayout from '@/layouts/MainLayout';
import Exercises from '@/pages/Exercises';
import Home from '@/pages/Home';
import ResultProcess from '@/pages/Result';

const MainRouter = () => {
    return <MainLayout />;
};

const publicRoutes = {
    children: [
        { path: config.routes.public.home, element: <Home /> },
        { path: config.routes.user.exercise, element: <Exercises /> },
        { path: config.routes.user.result, element: <ResultProcess /> },
    ]
};

const MainRoutes = {
    path: '/',
    element: <MainRouter />,
    children: [publicRoutes],
};

export default MainRoutes;