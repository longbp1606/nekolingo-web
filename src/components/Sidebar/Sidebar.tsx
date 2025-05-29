import { Typography } from 'antd';
import * as Styled from './Sidebar.styled';
import { FiHome, FiUser } from 'react-icons/fi';
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaCircleQuestion, FaShop, FaTrophy } from "react-icons/fa6";
import { Link, useLocation, useRoutes } from 'react-router-dom';
import { useState } from 'react';
import { theme } from '@/themes';

const { Title } = Typography;

interface NavbarElement {
    path: string,
    label: string,
    icon: React.ReactNode,
}

const navbarItems: NavbarElement[] = [
    {
        path: '/',
        label: 'Learn',
        icon: <FiHome />,
    },
    {
        path: '/practice',
        label: 'Practice',
        icon: <GiWeightLiftingUp />
    },
    {
        path: '/leaderboard',
        label: 'Leaderboard',
        icon: <FaTrophy />,
    },
    {
        path: '/quest',
        label: 'Quest',
        icon: <FaCircleQuestion />,
    },
    {
        path: '/shop',
        label: 'Shop',
        icon: <FaShop />,
    },
    {
        path: '/profile',
        label: 'Profile',
        icon: <FiUser />,
    }
];

const activeItem = {
    color: theme.color.primary,
    border: `2px solid ${theme.color.primary}`,
    backgroundColor: theme.color.lightPrimary,
}

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname;
    
    return (
        <Styled.SidebarWrapper>
            <Styled.HeaderTitle level={3}>Nekolingo</Styled.HeaderTitle>

            <Styled.SidebarContainer vertical gap={10}>
                {navbarItems.map((item) => (
                    <Link to={item.path} key={item.path}>
                        <Styled.NavbarItemContainer 
                            align='center' 
                            gap={10}
                            style={path === item.path ? activeItem : {}}
                        >
                            {item.icon}
                            <Title level={4}>{item.label}</Title>
                        </Styled.NavbarItemContainer>
                    </Link>
                ))}
            </Styled.SidebarContainer>
        </Styled.SidebarWrapper>
    )
}

export default Sidebar