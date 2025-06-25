import Sidebar from '@/components/Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <>
            <Sidebar />
            <div style={{ paddingLeft: "256px" }}>
                <Outlet />
            </div>
        </>
    );
};

export default AdminLayout;
