import config from "@/config";
import AdminLayout from "@/layouts/AdminLayout"
import Dashboard from "@/pages/Admin/Dashboard";
import Topic from "@/pages/Admin/Topic/Topic";

const AdminRouter = () => {
    return <AdminLayout />;
}

const adminRoutes = {
    children: [
        { path: config.routes.admin.dashboard, element: <Dashboard /> },
        { path: config.routes.admin.topic, element: <Topic /> }, // /admin/topic
        { path: 'grammar', element: <Topic /> },
        { path: 'vocabulary', element: <Topic /> },
        { path: 'category', element: <Topic /> },
        { path: 'language', element: <Topic /> },
        { path: 'course', element: <Topic /> },
        { path: 'lesson', element: <Topic /> },
        { path: 'exercise', element: <Topic /> },
        { path: 'user', element: <Topic /> },
    ]
}

const AdminRoutes = {
    element: <AdminRouter />,
    children: [adminRoutes],
}

export default AdminRoutes;