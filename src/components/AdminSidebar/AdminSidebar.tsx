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

const allMenuItems = [
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
  profile: { role: number } | null;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ profile }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Nếu role = 2 (Giáo sư), ẩn quest, archivement, transaction, user
  const filteredItems = allMenuItems.filter(item => {
    if (profile?.role === 2) {
      return ![
        "/admin/quest",
        "/admin/archivement",
        "/admin/transaction",
        "/admin/user",
      ].includes(item.key);
    }
    return true;
  });

  return (
    <StyledSider width={260}>
      <SidebarHeader>Nekolingo</SidebarHeader>
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={(item) => navigate(item.key)}
        style={{ paddingTop: 12, fontWeight: 600, fontSize: 16 }}
        theme="light"
        items={filteredItems.map(item => ({
          ...item,
          icon: <span style={{ color: "#fff" }}>{item.icon}</span>,
          label: <span style={{ color: "#fff" }}>{item.label}</span>,
        }))}
      />
    </StyledSider>
  );
};

export default AdminSidebar;
