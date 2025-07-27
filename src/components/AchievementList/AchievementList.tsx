"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  AchievementListWrapper,
  AchievementSection,
  AchievementHeader,
  AchievementTitle,
  ViewAllLink,
  AchievementItem,
  AchievementIconWrapper,
  AchievementInfo,
  AchievementName,
  AchievementDesc,
  AchievementProgress,
  AchievementLead,
  AchievementImg,
} from './AchievementList.styled';
import { Link, useNavigate } from 'react-router-dom';
import config from '@/config';
import { useAuth } from '@/hooks';
import { getUserArchivement } from '@/services/archivementAPI';
import { useEffect, useRef, useState } from 'react';
import { notification } from 'antd';
import { BackButton } from '@/pages/Admin/Exercise/Exercise.styled';
import defaultIcon from '@/assets/icons/symbols/archivement.png';

interface AchievementListProps {
  showViewAll?: boolean;
  limit?: number;
}

const ICON_BG_COLORS = [
  '#fc4848',
  '#7ac70c',
  '#ce82ff',
  '#ffc800',
  '#1cb0f6',
];

const AchievementList = ({ showViewAll = true, limit }: AchievementListProps) => {
  const navigate = useNavigate();
  const { profile } = useAuth();  
  const [archiveData, setArchiveData] = useState<any[]>([]);
  const hasErrorNotified = useRef(false);

  // Lấy data
  const fetchData = async (uid: string) => {
    try {
      const res = await getUserArchivement(uid);
      setArchiveData(res.data.data || []);
    } catch (error: any) {
      if (!hasErrorNotified.current) {
        notification.error({
          key: 'fetch-quest-error',
          message: 'Error',
          description: error?.response?.data?.message || 'Error fetching achievements',
        });
        hasErrorNotified.current = true;
      }
    }
  };

  useEffect(() => {
    if (profile?.id) {
      fetchData(profile.id);
    }
  }, [profile]);

  // Giới hạn số item
  const displayed = limit != null
    ? archiveData.slice(0, limit)
    : archiveData;

  return (
    <Card>
      <AchievementSection>
        <AchievementHeader>
        {limit !== 3 && (
          <BackButton onClick={() => navigate(-1)}>Back</BackButton>
        )}
          <AchievementTitle>Thành tích</AchievementTitle>
          {showViewAll && (
            <ViewAllLink as={Link} to={config.routes.user.achievements}>
              XEM TẤT CẢ
            </ViewAllLink>
          )}
        </AchievementHeader>

        <AchievementListWrapper>
          {displayed.map((ach, idx) => {
            const { _id, title, icon, condition, progress, progress_text, description } = ach;
            const total = condition.value ?? 1;
            const pct = total > 0
              ? Math.min(100, Math.round((progress / total) * 100))
              : 0;

            const bgColor = ICON_BG_COLORS[idx % ICON_BG_COLORS.length];

            // Nếu icon không phải URL cloudinary thì dùng defaultIcon
            const imgSrc = icon?.startsWith('https://res.cloudinary.com')
              ? icon
              : defaultIcon;

            return (
              <AchievementItem key={_id}>
                <AchievementIconWrapper style={{ backgroundColor: bgColor, borderBottom: "5px solid rgb(0 0 0 / 22%)" }}>
                  <AchievementImg src={imgSrc} alt={title} />
                </AchievementIconWrapper>

                <AchievementInfo>
                  <AchievementLead>
                    <AchievementName>{title}</AchievementName>
                    <AchievementDesc>{progress_text}</AchievementDesc>
                  </AchievementLead>

                  <AchievementProgress>
                    <div className="progress-bar" style={{ height: '12px' }}>
                      <div
                        className={`progress-fill ${pct === 100 ? "complete" : "incomplete"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </AchievementProgress>
                  <AchievementDesc>{description}</AchievementDesc>
                </AchievementInfo>
              </AchievementItem>
            );
          })}
        </AchievementListWrapper>
      </AchievementSection>
    </Card>
  );
};

export default AchievementList;
