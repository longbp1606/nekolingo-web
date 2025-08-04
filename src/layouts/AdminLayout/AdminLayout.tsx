/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { theme } from "@/themes";
import AdminSidebar from "@/components/AdminSidebar";
import { getProfile } from "@/services/authAPI";
import { useEffect, useState } from "react";
import { Avatar, Dropdown, MenuProps, Select, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDocumentTitle } from "@/hooks";
import { getListCourses } from "@/services/courseAPI";
import cookieUtils from "@/services/cookieUtils";
import config from '@/config';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #F1F4F9;
  padding: 16px;
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

// const SegmentedWrapper = styled.div`
//   padding: 16px 24px;

//   .ant-segmented {
//     background-color: white;
//     border-radius: 8px;
//     border: 1px solid ${theme.color.primary}50;
//   }

//   .ant-segmented-item {
//     font-weight: 500;
//     padding: 6px 16px;
//     border-radius: 8px;
//     transition: all 0.3s ease;
//   }

//   .ant-segmented-item-selected {
//     background-color: ${theme.color.primary};
//     color: white;
//   }

//   .ant-segmented-thumb {
//     background-color: ${theme.color.primary};
//     border-radius: 8px !important;
//   }
// `;


const MainContent = styled.div`
  flex: 1;
  padding: 24px;
  overflow: auto;
  background-color: #F1F4F9;
`;

const Account = styled.div`
  display: flex;
  align-items: center; 
  gap: 12px;
  padding: 6px 10px;
  

  &&:hover {
    cursor: pointer;
    background: ${theme.color.primary}30;
    border: 1px solid ${theme.color.primary};
    border-radius: 8px;
  }
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

interface AdminProps {
  selectedCourse: any;
  setSelectedCourse: any;
}

const AdminLayout: React.FC<AdminProps> = ({ selectedCourse, setSelectedCourse }) => {
  const [selectedCourseState, setSelectedCourseState] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserType | null>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const navigate = useNavigate();

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
    const fetchCourses = async () => {
      try {
        const res = await getListCourses(1, 10);
        const courseList = res.data.courses || [];
        setCourses(courseList);

        if (courseList.length > 0) {
          const firstCourseId = courseList[0]._id;
          setSelectedCourseState(firstCourseId);
          setSelectedCourse(firstCourseId);
        }
      } catch {
        console.log("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    fetchProfile();
  }, []);

  const location = useLocation();

  const screenTitle = location.pathname.split("/").pop()?.replace(/-/g, " ");
  const onSegmentChange = (value: string | number) => {
    console.log("Selected course ID:", value);
    setSelectedCourseState(value as string);
    setSelectedCourse(value as string);
  };

  const logout = () => {
    cookieUtils.clear();
    navigate(config.routes.public.login);
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <div onClick={logout} style={{ cursor: 'pointer' }}>
          Đăng xuất
        </div>
      ),
    }
  ];

  const titleMap: Record<string, string> = {
    language: "Ngôn ngữ",
    course: "Khóa học",
    topic: "Chủ đề",
    lesson: "Bài học",
    vocabulary: "Từ vựng",
    grammar: "Ngữ pháp",
    exercise: "Câu hỏi",
    quest: "Nhiệm vụ",
    archivement: "Thành tựu",
    transaction: "Giao dịch",
    user: "Người dùng",
  };
  

  return (
    <LayoutContainer>
      <AdminSidebar profile={profile}/>
      <MainArea>
        <HeaderBar>
          <PageTitle level={4}>
          {screenTitle && titleMap[screenTitle] ? titleMap[screenTitle] : ""}
          </PageTitle>

          {["/admin/topic", "/admin/lesson", "/admin/exercise"].includes(location.pathname) && (
            <Select
              options={courses.map(c => ({
                label: c.title,
                value: c._id,
              }))}
              value={selectedCourseState ?? undefined}
              onChange={onSegmentChange}
              style={{ minWidth: 200 }}
            />
          )}

          <Dropdown menu={{ items }} trigger={['click']}>

            <Account onClick={(e) => e.preventDefault()}>
              <Avatar size="large" icon={<UserOutlined />} />
              <Typography.Text strong>
                {profile?.email || "Admin"}
              </Typography.Text>
            </Account>
          </Dropdown>
        </HeaderBar>
        <MainContent>
          <Outlet context={{ selectedCourse }} />
        </MainContent>
      </MainArea>
    </LayoutContainer>
  )
}

export default AdminLayout