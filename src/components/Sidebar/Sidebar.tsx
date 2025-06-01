import { Image, Typography } from 'antd';
import * as Styled from './Sidebar.styled';
import { Link, useLocation, useRoutes } from 'react-router-dom';
import { theme } from '@/themes';
import { symbols } from '@/utils/assets';

const { Title } = Typography;

interface NavbarElement {
    path: string,
    label: string,
    icon: string,
}

const navbarItems: NavbarElement[] = [
    {
        path: '/',
        label: 'Learn',
        icon: symbols.birdhouse,
    },
    {
        path: '/practice',
        label: 'Practice',
        icon: symbols.dumbbell,
    },
    {
        path: '/leaderboard',
        label: 'Leaderboard',
        icon: symbols.trophy,
    },
    {
        path: '/quest',
        label: 'Quest',
        icon: symbols.parchment,
    },
    {
        path: '/shop',
        label: 'Shop',
        icon: symbols.shop,
    },
    {
        path: '/profile',
        label: 'Profile',
        icon: symbols.account,
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
                            <Image src={item.icon} alt={item.label} width={40}/> 
                            <Title level={4}>{item.label}</Title>
                        </Styled.NavbarItemContainer>
                    </Link>
                ))}
            </Styled.SidebarContainer>
        </Styled.SidebarWrapper>
    )
}

export default Sidebar