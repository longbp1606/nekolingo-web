// import { Image, Typography } from 'antd';
// import * as Styled from './AdminSidebar.styled';
// import { Link, useLocation } from 'react-router-dom';
// import { theme } from '@/themes';
// import { adminSymbols, symbols } from '@/utils/assets';

// const { Title } = Typography;

// interface NavbarElement {
//     path: string,
//     label: string,
//     icon: string,
// }

// // Menu cho Admin
// const adminNavbar: NavbarElement[] = [
//     { path: '/admin/language', label: 'Language', icon: adminSymbols.language },
//     { path: '/admin/course', label: 'Course', icon: adminSymbols.course },
//     { path: '/admin/topic', label: 'Topic', icon: adminSymbols.topic },
//     { path: '/admin/lesson', label: 'Lesson', icon: adminSymbols.lesson },
//     { path: '/admin/vocabulary', label: 'Vocabulary', icon: adminSymbols.vocabulary },
//     { path: '/admin/grammar', label: 'Grammar', icon: adminSymbols.grammar },
//     { path: '/admin/exercise', label: 'Exercise', icon: adminSymbols.exercise },
//     { path: '/admin/user', label: 'User', icon: symbols.account }
// ];

// const activeItem = {
//     color: theme.color.primary,
//     border: `2px solid ${theme.color.primary}`,
//     backgroundColor: theme.color.lightPrimary,
// };

// const AdminSidebar = () => {
//     const location = useLocation();
//     const path = location.pathname;

//     // const role = localStorage.getItem('role'); // hoặc context: useAuth().role

//     // const navbarItems = role === 'admin' ? adminNavbar : customerNavbar;

//     return (
//         <Styled.SidebarWrapper>
//             <Styled.HeaderTitle level={3}>Nekolingo</Styled.HeaderTitle>

//             <Styled.SidebarContainer vertical gap={10}>
//                 {adminNavbar.map((item) => (
//                     <Link to={item.path} key={item.path}>
//                         <Styled.NavbarItemContainer
//                             align='center'
//                             gap={10}
//                             style={path === item.path ? activeItem : {}}
//                         >
//                             <Image src={item.icon} alt={item.label} width={40} preview={false} />
//                             <Title level={4} style={{ color: theme.color.title }}>{item.label}</Title>
//                         </Styled.NavbarItemContainer>
//                     </Link>
//                 ))}
//             </Styled.SidebarContainer>
//         </Styled.SidebarWrapper>
//     );
// };

// export default AdminSidebar;


import { Menu } from "antd";
import {
  BookOutlined,
  GlobalOutlined,
  ReadOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  FileDoneOutlined,
  UserOutlined,
  FileSearchOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { theme } from "@/themes";
import { SidebarHeader, StyledSider } from "./AdminSidebar.styled";



const menuItems = [
  { key: "/admin/language", label: "Language", icon: <GlobalOutlined /> },
  { key: "/admin/course", label: "Course", icon: <ReadOutlined /> },
  { key: "/admin/topic", label: "Topic", icon: <BookOutlined /> },
  { key: "/admin/lesson", label: "Lesson", icon: <AppstoreOutlined /> },
  { key: "/admin/vocabulary", label: "Vocabulary", icon: <FileTextOutlined /> },
  { key: "/admin/grammar", label: "Grammar", icon: <FileDoneOutlined /> },
  { key: "/admin/exercise", label: "Exercise", icon: <FileSearchOutlined /> },
  { key: "/admin/user", label: "User", icon: <UserOutlined /> },
];

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledSider width={260}>
      <SidebarHeader>Nekolingo</SidebarHeader>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={(item) => navigate(item.key)}
        style={{
          paddingTop: 12,
          fontWeight: 600,
          fontSize: 16,
        }}
        theme="light"
        items={menuItems.map((item) => ({
          ...item,
          label: <span style={{ color: theme.color.textPrimary }}>{item.label}</span>,
        }))}
      />
    </StyledSider>
  );
};

export default AdminSidebar;
