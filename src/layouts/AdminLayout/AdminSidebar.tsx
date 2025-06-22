import { Image, Typography } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '@/themes';
import { Flex } from 'antd';
import config from '@/config';

const { Title } = Typography;

interface NavbarElement {
    path: string,
    label: string,
    icon?: string,
}

const navbarItems: NavbarElement[] = [
    {
        path: config.routes.admin.dashboard,
        label: 'Dashboard',
    },
    {
        path: config.routes.admin.lesson,
        label: 'Lessons',
    },
    {
        path: config.routes.admin.user,
        label: 'Users',
    },
];

const activeItem = {
    color: theme.color.primary,
    border: `2px solid ${theme.color.primary}`,
    backgroundColor: theme.color.lightPrimary,
}

// Styled components
const SidebarWrapper = styled.div`
    background-color: ${theme.color.white};
    border-right: 1px solid ${theme.color.borderSchedule};
    height: 100vh;
    width: 256px;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 0 16px;
`;

const HeaderTitle = styled(Title)`
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 16px;
    font-family: 'Quicksand';
    padding-top: 16px;
    font-size: 16px;
    color: ${theme.color.primary};
`;

const SidebarContainer = styled(Flex)``;

const NavbarItemContainer = styled(Flex)`
    padding: 12px 16px;
    border-radius: 8px;
    margin-bottom: 8px;
    
    & h4.ant-typography {
        font-weight: 700;
        margin-left: 8px;
        font-family: 'Quicksand';
        color: ${theme.color.textPrimary};
        margin: 0;
    }
`;

const AdminSidebar = () => {
    const location = useLocation();
    const path = location.pathname;
    
    return (
        <SidebarWrapper>
            <HeaderTitle level={3}>Admin Panel</HeaderTitle>

            <SidebarContainer vertical gap={10}>
                {navbarItems.map((item) => (
                    <Link to={item.path} key={item.path}>
                        <NavbarItemContainer 
                            align='center' 
                            gap={10}
                            style={path === item.path ? activeItem : {}}
                        >
                            <Title level={4} style={{ color: theme.color.title }}>{item.label}</Title>
                        </NavbarItemContainer>
                    </Link>
                ))}
            </SidebarContainer>
        </SidebarWrapper>
    )
}

export default AdminSidebar;