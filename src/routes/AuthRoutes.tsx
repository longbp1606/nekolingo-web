import config from "@/config";
import Login from "@/pages/Auth/Login";
import { Outlet } from "react-router-dom"

const AuthRouter = () => {
    return <Outlet />;
}

const authRoutes = {
    children: [
        { path: config.routes.public.login, element: <Login/>},
    ]
}

const AuthRoutes = {
    element: <AuthRouter />,
    children: [authRoutes],
}

export default AuthRoutes;