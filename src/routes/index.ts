import { useRoutes } from "react-router-dom";
import MainRoutes from "./MainRoutes";
import { useScrollToTop } from "@/hooks";
import AdminRoutes from "./AdminRoutes";

const RoutesComponent = () => {
    useScrollToTop();
    
    return useRoutes([
        MainRoutes,
        AdminRoutes, 
    ]);
}

export default RoutesComponent;