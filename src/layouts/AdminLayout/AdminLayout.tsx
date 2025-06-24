import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/themes";
import AdminSidebar from "@/components/AdminSidebar";

const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh;
    // background-color: ${theme.color.border};
`;

const MainContent = styled.div`
    flex: 1;
    margin-left: 256px;
    padding: 24px;
    overflow: auto;
`;

const AdminLayout = () => {
    return (
        <LayoutContainer>
            {/* <AdminSidebar /> */}
            <AdminSidebar/>
            <MainContent>
                <Outlet />
            </MainContent>
        </LayoutContainer>
    )
}

export default AdminLayout