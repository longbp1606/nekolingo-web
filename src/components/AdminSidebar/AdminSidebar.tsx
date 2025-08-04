import { Menu } from "antd";
import {
  BookOutlined,
  GlobalOutlined,
  ReadOutlined,
  UserOutlined,
  TagOutlined,
  ProfileOutlined,
  FontSizeOutlined,
  QuestionCircleOutlined,
  TrophyOutlined,
  CheckCircleOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { SidebarHeader, StyledSider } from "./AdminSidebar.styled";

const menuItems = [
  { key: "/admin/language", label: "Ngôn ngữ", icon: <GlobalOutlined /> },
  { key: "/admin/course", label: "Khóa học", icon: <ReadOutlined /> },
  { key: "/admin/topic", label: "Chủ đề", icon: <TagOutlined /> },
  { key: "/admin/lesson", label: "Bài học", icon: <BookOutlined /> },
  { key: "/admin/vocabulary", label: "Từ vựng", icon: <ProfileOutlined /> },
  { key: "/admin/grammar", label: "Ngữ pháp", icon: <FontSizeOutlined /> },
  { key: "/admin/exercise", label: "Câu hỏi", icon: <QuestionCircleOutlined /> },
  { key: "/admin/quest", label: "Nhiệm vụ", icon: <TrophyOutlined /> },
  { key: "/admin/archivement", label: "Thành tựu", icon: <CheckCircleOutlined /> },
  { key: "/admin/transaction", label: "Giao dịch", icon: <MoneyCollectOutlined /> },
  { key: "/admin/user", label: "Người dùng", icon: <UserOutlined /> },
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
