import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/themes";
import AdminSidebar from "@/components/AdminSidebar";
import { getProfile } from "@/services/authAPI";
import { useEffect, useState } from "react";
import { Avatar, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDocumentTitle } from "@/hooks";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F1F4F9;
`;

const MainArea = styled.div`
  flex: 1;
  margin-left: 256px;
  display: flex;
  flex-direction: column;
`;

const HeaderBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  padding: 0 24px;
  box-shadow: 0 2px 4px ${theme.color.shadowDropdown};
`;

const PageTitle = styled(Typography.Title)`
  && {
    margin: 0;
    font-size: 20px;
    font-weight: 700;
    color: ${theme.color.title};
  }
`;

const MainContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow: auto;
  background-color: #F1F4F9;
`;

export type UserType = {
  id: string;
  email: string;
  role: number;
  currentLevel: number;
  xp: number;
  streakDays: number;
  is_primiere: boolean;
}


const AdminLayout = () => {
  const [profile, setProfile] = useState<UserType | null>(null);
    useDocumentTitle('Nekolingo');


  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setProfile(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const location = useLocation();

  // Extract last part of the path to show as screen name
  const screenTitle = location.pathname.split("/").pop()?.replace(/-/g, " ");


  return (
    <LayoutContainer>
      <AdminSidebar />
      <MainArea>
        <HeaderBar>
          <PageTitle level={4}>
            {screenTitle ? screenTitle.charAt(0).toUpperCase() + screenTitle.slice(1) : "Dashboard"}
          </PageTitle>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar size="large" icon={<UserOutlined />} />
            <Typography.Text strong>
              {profile?.email || "Admin"}
            </Typography.Text>
          </div>
        </HeaderBar>
        <MainContent>
          <Outlet />
        </MainContent>
      </MainArea>
    </LayoutContainer>
  )
}

export default AdminLayout