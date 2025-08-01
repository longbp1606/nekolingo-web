import config from "@/config";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import VerifyConfirm from "@/pages/Auth/Verify/VerifyConfirm";
import VerifyResult from "@/pages/Auth/Verify/VerifyResult";
import { Outlet } from "react-router-dom"

const AuthRouter = () => {
    return <Outlet />;
}

const authRoutes = {
    children: [
        { path: config.routes.public.login, element: <Login/>},
        { path: config.routes.public.register, element: <Register/>},
        { path: config.routes.public.verify, element: <VerifyConfirm /> },
        { path: config.routes.public.verifyResult, element: <VerifyResult /> }
    ]
}

const AuthRoutes = {
    element: <AuthRouter />,
    children: [authRoutes],
}

export default AuthRoutes;