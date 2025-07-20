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
// import { theme } from "@/themes";
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
          icon: <span style={{ color: "#fff" }}>{item.icon}</span>,
          label: <span style={{ color: "#fff" }}>{item.label}</span>,
        }))}
      />
    </StyledSider>
  );
};

export default AdminSidebar;
