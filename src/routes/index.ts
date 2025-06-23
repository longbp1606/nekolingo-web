import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import { useScrollToTop } from "@/hooks";
import AdminRoutes from "./AdminRoutes";
import AuthRoutes from "./AuthRoutes";

const RoutesComponent = () => {
    useScrollToTop();
    
    return useRoutes([
        MainRoutes,
        AdminRoutes,
        AuthRoutes, 
    ]);
}

export default RoutesComponent;