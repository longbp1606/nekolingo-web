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
import { SidebarHeader, StyledSider } from "./AdminSidebar.styled";

const menuItems = [
  { key: "/admin/language", label: "Language", icon: <GlobalOutlined /> },
  { key: "/admin/course", label: "Course", icon: <ReadOutlined /> },
  { key: "/admin/topic", label: "Topic", icon: <BookOutlined /> },
  { key: "/admin/lesson", label: "Lesson", icon: <AppstoreOutlined /> },
  { key: "/admin/vocabulary", label: "Vocabulary", icon: <FileTextOutlined /> },
  { key: "/admin/grammar", label: "Grammar", icon: <FileDoneOutlined /> },
  { key: "/admin/exercise", label: "Exercise", icon: <FileSearchOutlined /> },
  { key: "/admin/quest", label: "Quest", icon: <FileSearchOutlined /> },
  { key: "/admin/archivement", label: "Archivement", icon: <FileSearchOutlined /> },
  { key: "/admin/user", label: "User", icon: <UserOutlined /> },
];

interface AdminSidebarProps {
  profile: {
    role: number;
  } | null;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ profile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const filteredItems = profile?.role === 2
  ? menuItems.filter(item => item.key !== "/admin/user")
  : menuItems;

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
        items={filteredItems.map((item) => ({
          ...item,
          icon: <span style={{ color: "#fff" }}>{item.icon}</span>,
          label: <span style={{ color: "#fff" }}>{item.label}</span>,
        }))}
      />
    </StyledSider>
  );
};

export default AdminSidebar;
