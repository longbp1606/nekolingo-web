import config from "@/config";
import AdminLayout from "@/layouts/AdminLayout"
import Dashboard from "@/pages/Admin/Dashboard";

const AdminRouter = () => {
    return <AdminLayout />;
}

const adminRoutes = {
    children: [
        { path: config.routes.admin.dashboard, element: <Dashboard />}
    ]
}

const AdminRoutes = {
    element: <AdminRouter />,
    children: [adminRoutes],
}

export default AdminRoutes;