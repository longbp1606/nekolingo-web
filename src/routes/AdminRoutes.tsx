import config from "@/config";
import AdminLayout from "@/layouts/AdminLayout"
import Course from "@/pages/Admin/Course/Course";
import Dashboard from "@/pages/Admin/Dashboard";
import Grammar from "@/pages/Admin/Grammar/Grammar";
import Language from "@/pages/Admin/Language/Language";
import Topic from "@/pages/Admin/Topic/Topic";

const AdminRouter = () => {
    return <AdminLayout />;
}

const adminRoutes = {
    children: [
        { path: config.routes.admin.dashboard, element: <Dashboard /> },
        { path: config.routes.admin.topic, element: <Topic /> }, // /admin/topic
        { path: config.routes.admin.grammar, element: <Grammar /> },
        { path: config.routes.admin.vocabulary, element: <Topic /> },
        { path: config.routes.admin.category, element: <Topic /> },
        { path: config.routes.admin.language, element: <Language /> },
        { path: config.routes.admin.course, element: <Course /> },
        { path: config.routes.admin.lesson, element: <Topic /> },
        { path: config.routes.admin.exercise, element: <Topic /> },
        { path: config.routes.admin.user, element: <Topic /> },
    ]
}

const AdminRoutes = {
    element: <AdminRouter />,
    children: [adminRoutes],
}

export default AdminRoutes;