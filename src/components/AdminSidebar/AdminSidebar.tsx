// import { Image, Typography } from 'antd';
// import * as Styled from './Sidebar.styled';
// import { Link, useLocation } from 'react-router-dom';
// import { theme } from '@/themes';
// import { symbols } from '@/utils/assets';

// const { Title } = Typography;

// interface NavbarElement {
//     path: string,
//     label: string,
//     icon: string,
// }

// const navbarItems: NavbarElement[] = [
//     {
//         path: '/',
//         label: 'Learn',
//         icon: symbols.birdhouse,
//     },
//     {
//         path: '/practice',
//         label: 'Practice',
//         icon: symbols.dumbbell,
//     },
//     {
//         path: '/leaderboard',
//         label: 'Leaderboard',
//         icon: symbols.trophy,
//     },
//     {
//         path: '/quest',
//         label: 'Quest',
//         icon: symbols.parchment,
//     },
//     {
//         path: '/shop',
//         label: 'Shop',
//         icon: symbols.shop,
//     },
//     {
//         path: '/profile',
//         label: 'Profile',
//         icon: symbols.account,
//     }
// ];

// const activeItem = {
//     color: theme.color.primary,
//     border: `2px solid ${theme.color.primary}`,
//     backgroundColor: theme.color.lightPrimary,
// }

// const Sidebar = () => {
//     const location = useLocation();
//     const path = location.pathname;
    
//     return (
//         <Styled.SidebarWrapper>
//             <Styled.HeaderTitle level={3}>Nekolingo</Styled.HeaderTitle>

//             <Styled.SidebarContainer vertical gap={10}>
//                 {navbarItems.map((item) => (
//                     <Link to={item.path} key={item.path}>
//                         <Styled.NavbarItemContainer 
//                             align='center' 
//                             gap={10}
//                             style={path === item.path ? activeItem : {}}
//                         >
//                             <Image src={item.icon} alt={item.label} width={40} preview={false}/> 
//                             <Title level={4} style={{ color: theme.color.title }}>{item.label}</Title>
//                         </Styled.NavbarItemContainer>
//                     </Link>
//                 ))}
//             </Styled.SidebarContainer>
//         </Styled.SidebarWrapper>
//     )
// }

// export default Sidebar

import { Image, Typography } from 'antd';
import * as Styled from './AdminSidebar.styled';
import { Link, useLocation } from 'react-router-dom';
import { theme } from '@/themes';
import { adminSymbols, symbols } from '@/utils/assets';

const { Title } = Typography;

interface NavbarElement {
    path: string,
    label: string,
    icon: string,
}

// Menu cho Admin
const adminNavbar: NavbarElement[] = [
    { path: '/admin/topic', label: 'Topic', icon: adminSymbols.topic },
    { path: '/admin/grammar', label: 'Grammar', icon: adminSymbols.grammar },
    { path: '/admin/vocabulary', label: 'Vocabulary', icon: adminSymbols.vocabulary },
    // { path: '/admin/vocab-topic', label: 'VocabTopic', icon: adminSymbols.category },
    { path: '/admin/language', label: 'Language', icon: adminSymbols.language },
    { path: '/admin/course', label: 'Course', icon: adminSymbols.course },
    { path: '/admin/lesson', label: 'Lesson', icon: adminSymbols.lesson },
    { path: '/admin/exercise', label: 'Exercise', icon: adminSymbols.exercise },
    { path: '/admin/user', label: 'User', icon: symbols.account }
];

const activeItem = {
    color: theme.color.primary,
    border: `2px solid ${theme.color.primary}`,
    backgroundColor: theme.color.lightPrimary,
};

const AdminSidebar = () => {
    const location = useLocation();
    const path = location.pathname;

    // const role = localStorage.getItem('role'); // hoặc context: useAuth().role

    // const navbarItems = role === 'admin' ? adminNavbar : customerNavbar;

    return (
        <Styled.SidebarWrapper>
            <Styled.HeaderTitle level={3}>Nekolingo</Styled.HeaderTitle>

            <Styled.SidebarContainer vertical gap={10}>
                {adminNavbar.map((item) => (
                    <Link to={item.path} key={item.path}>
                        <Styled.NavbarItemContainer
                            align='center'
                            gap={10}
                            style={path === item.path ? activeItem : {}}
                        >
                            <Image src={item.icon} alt={item.label} width={40} preview={false} />
                            <Title level={4} style={{ color: theme.color.title }}>{item.label}</Title>
                        </Styled.NavbarItemContainer>
                    </Link>
                ))}
            </Styled.SidebarContainer>
        </Styled.SidebarWrapper>
    );
};

export default AdminSidebar;
