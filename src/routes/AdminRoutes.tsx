import config from "@/config";
import AdminLayout from "@/layouts/AdminLayout"
import Dashboard from "@/pages/Admin/Dashboard";
import Grammar from "@/pages/Admin/Grammar/Grammar";
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
        { path: config.routes.admin.language, element: <Topic /> },
        { path: config.routes.admin.course, element: <Topic /> },
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