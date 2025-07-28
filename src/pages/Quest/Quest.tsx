"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HomeWrapper,
  HomeContent,
  BodyContent,
  TopicContent,
  SideCardContent,
  SideCardText,
  LeftSection,
  CardSide,
  StyledSidebar,
  FooterWrapper,
  FooterRow,
  FooterLink,
  Card,
  AchievementSection,
  AchievementHeader,
  AchievementTitle,
  ViewAllLink,
  AchievementListWrapper,
  AchievementItem,
  AchievementIconWrapper,
  AchievementImg,
  AchievementInfo,
  AchievementLead,
  AchievementName,
  AchievementProgress,
  CardWrapper,
  HeaderTag,
  Title,
  SubText,
  ProgressWrapper,
  ProgressBar,
  ProgressFill,
  ProgressText,
  AchievementDesc
} from './Quest.styled';
import { useDocumentTitle } from '@/hooks';
import Sidebar from '@/components/Sidebar';
import { theme } from '@/themes';
import StatsBar from '@/components/StatsBar/StatsBar';
import { ClockCircleOutlined } from '@ant-design/icons';
import { useEffect, useRef, useState, useMemo } from 'react';
import { generateQuestDaily, getQuestDaily } from '@/services/questAPI';
import { notification } from 'antd';
import firefire from "@/assets/firefire.png";
import { useAuth } from '@/hooks';

const Quest = () => {
  useDocumentTitle('Nekolingo');

  const [rawData, setRawData] = useState<any[]>([]);
  const hasErrorNotified = useRef(false);
  const { profile } = useAuth();
  const currentUserId = profile?.id || '';

  const fetchData = async () => {
    try {
      await generateQuestDaily();
      const res = await getQuestDaily();
      setRawData(res.data || []);
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: 'fetch-quest-error',
          message: 'Error',
          description: error?.response?.data?.message || 'Error fetching quests',
        });
        hasErrorNotified.current = true;
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Lọc theo user và nhóm theo type, chọn condition lớn nhất mỗi nhóm
  const questsByType = useMemo(() => {
    const filtered = rawData.filter(item => item.user_id === currentUserId);
    const group: Record<string, any> = {};
    filtered.forEach(item => {
      const type = item.quest_id.type;
      if (!group[type] || item.quest_id.condition > group[type].quest_id.condition) {
        group[type] = item;
      }
    });
    return Object.values(group);
  }, [rawData, currentUserId]);

  // Tính tổng và đã hoàn thành
  const totalCount = questsByType.length;
  const completedCount = questsByType.filter(ach => {
    const cond = ach.quest_id.condition.value ?? 1;
    const prog = ach.quest_id.progress;
    return cond > 0 && prog >= cond;
  }).length;

  // Tháng hiện tại (Việt)
  const currentMonth = new Date().toLocaleString('vi-VN', { month: 'long' });

  return (
    <>
      <Sidebar />
      <BodyContent>
        <HomeWrapper>
          <HomeContent>
            <LeftSection>
              <TopicContent>
                {/* Phần header tổng quan */}
                <CardWrapper>
                  <HeaderTag>{currentMonth.toUpperCase()}</HeaderTag>
                  <Title>Cày phim kiểu Zari</Title>
                  <SubText>
                    <ClockCircleOutlined style={{ marginRight: '3px' }} /> 1 NGÀY
                  </SubText>
                  <ProgressWrapper>
                    <AchievementName>Hoàn thành {completedCount} nhiệm vụ</AchievementName>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: '12px' }}>
                      <ProgressBar>
                        <ProgressFill style={{ width: `${totalCount > 0 ? Math.round((completedCount/totalCount)*100) : 0}%` }} />
                      </ProgressBar>
                      <ProgressText>{completedCount} / {totalCount}</ProgressText>
                    </div>
                  </ProgressWrapper>
                </CardWrapper>

                <Card>
                  <AchievementSection>
                    <AchievementHeader>
                      <AchievementTitle>Thử thách ngày</AchievementTitle>
                      <ViewAllLink>
                        <ClockCircleOutlined style={{ marginRight: '5px' }} />
                        Cập nhật: {new Date().toLocaleTimeString()}
                      </ViewAllLink>
                    </AchievementHeader>
                    <AchievementListWrapper>
                      {questsByType.map((ach) => {
                        const {
                          title,
                          type,
                          progress,
                          condition,
                          progress_text
                        } = ach.quest_id;

                        const total = condition;
                        const percentage = total > 0
                          ? Math.min(100, Math.round((progress / total) * 100))
                          : 0;

                        return (
                          <AchievementItem key={type}>
                            <AchievementIconWrapper className={type.toLowerCase()}>
                              <AchievementImg src={firefire} alt={title} />
                            </AchievementIconWrapper>

                            <AchievementInfo>
                              <AchievementLead>
                                <AchievementName>{title}</AchievementName>
                                <AchievementDesc>{progress_text}</AchievementDesc>
                              </AchievementLead>

                              <AchievementProgress>
                                <div className="progress-bar" style={{ height: '18px' }}>
                                  <div
                                    className={`progress-fill ${percentage === 100 ? 'complete' : 'incomplete'}`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </AchievementProgress>
                            </AchievementInfo>
                          </AchievementItem>
                        );
                      })}
                    </AchievementListWrapper>
                  </AchievementSection>
                </Card>
              </TopicContent>
            </LeftSection>

            <StyledSidebar>
              <StatsBar />
              <CardSide>
                <SideCardContent>
                  <SideCardText>
                    <h4 style={{ color: theme.color.title, fontSize: '16px' }}>Thử thách tháng sắp mở!</h4>
                    <p style={{ color: theme.color.description, fontSize: '14px' }}>
                      Hoàn thành các thử thách hằng tháng để giành được huy hiệu độc đáo
                    </p>
                  </SideCardText>
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/e07e459ea20aef826b42caa71498d85f.svg"
                    alt="Practice Speaking"
                    width={70}
                    height={70}
                  />
                </SideCardContent>
              </CardSide>

              <FooterWrapper>
                <FooterRow>
                  <FooterLink>GIỚI THIỆU</FooterLink>
                  <FooterLink>CỬA HÀNG</FooterLink>
                </FooterRow>
                <FooterRow>
                  <FooterLink>NHÀ ĐẦU TƯ</FooterLink>
                  <FooterLink>ĐIỀU KHOẢN</FooterLink>
                </FooterRow>
                <FooterRow>
                  <FooterLink>QUYỀN RIÊNG TƯ</FooterLink>
                </FooterRow>
              </FooterWrapper>
            </StyledSidebar>
          </HomeContent>
        </HomeWrapper>
      </BodyContent>
    </>
  );
};

export default Quest;
