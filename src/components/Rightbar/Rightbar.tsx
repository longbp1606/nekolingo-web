"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  CardTitle,
  ViewLink,
  LeagueCard,
  LeagueIcon,
  LeagueInfo,
  LeagueRank,
  LeagueStatus,
  QuestItem,
  QuestHeader,
  QuestIcon,
  QuestInfo,
  QuestTitle,
  ProgressBar,
  ProgressFill,
  ProgressText,
  RightSection,
} from './Rightbar.styled';
import { theme } from '@/themes';
import { FiAward, FiTarget, FiZap, FiCheck } from 'react-icons/fi';
import StatsBar from '../StatsBar/StatsBar';
import { useEffect, useRef, useState } from 'react';
import { notification } from 'antd';
import { getQuestDaily } from '@/services/questAPI';
import { Link } from 'react-router-dom';
import { getLeaderboardOverall } from '@/services/leaderboardAPI';
import config from '@/config';
import { getProfile } from '@/services/authAPI';

const RightSidebar = () => {
  const [rawData, setRawData] = useState<any[]>([]);
  const [currentRank, setCurrentRank] = useState<number>();
  const hasFetchedData = useRef(false);
  const hasFetchedLeaderboard = useRef(false);

  const fetchLeaderboardData = async () => {
    try {
      const profile = await getProfile();
      const userID = profile.data?.data?.id;
      const response = await getLeaderboardOverall();
      console.log(userID);
      if (response.status === 200 && userID) {
        const index = response.data.findIndex((user: any) => String(user._id) === String(userID));
        if (index !== -1) {
          setCurrentRank(index + 1);
        } else {
          setCurrentRank(-1); // Not found
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    }
  }

  useEffect(() => {
    if (!hasFetchedLeaderboard.current) {
      fetchLeaderboardData();
      hasFetchedLeaderboard.current = true;
    };
  }, []);

  const fetchData = async () => {
    try {
      const res = await getQuestDaily();
      setRawData(res.data || []);
    } catch (error: any) {
      notification.error({
        key: 'fetch-quest-error',
        message: 'Error',
        description: error?.response?.data?.message || 'Error fetching quests',
      });

    }
  };

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchData();
      hasFetchedData.current = true;
    }
  }, []);

  return (
    <RightSection>
      <StatsBar />

      <LeagueCard>
        <CardHeader>
          <CardTitle>Giải đấu ngôn ngữ</CardTitle>
          <ViewLink to={config.routes.user.leaderboard}>Xem chi tiết</ViewLink>
        </CardHeader>
        <LeagueInfo>
          <LeagueIcon>
            <FiAward />
          </LeagueIcon>
          <div>
            <LeagueRank>
              Bạn đang ở hạng <span>#{currentRank}</span>
            </LeagueRank>
            <LeagueStatus>Tiếp tục cố gắng nhé!</LeagueStatus>
          </div>
        </LeagueInfo>
      </LeagueCard>

      <Card>
        <CardHeader>
          <CardTitle>Nhiệm vụ hằng ngày</CardTitle>
          <ViewLink as={Link} to="/quest">Xem tất cả</ViewLink>
        </CardHeader>

        {rawData.map((item, idx) => {
          const { quest_id } = item;
          const { title, condition, progress } = quest_id;
          // tính % và text
          const pct = condition > 0
            ? Math.min(100, Math.round((progress / condition) * 100))
            : 0;
          const progressText = `${progress} / ${condition}`;

          // chọn màu/icon tuỳ type
          const bgColor = [theme.color.primary, theme.color.quaternary, theme.color.tertiary][idx % 3];
          const IconComponent = [FiZap, FiCheck, FiTarget][idx % 3];

          return (
            <QuestItem key={quest_id._id}>
              <QuestHeader>
                <QuestIcon style={{ backgroundColor: bgColor }}>
                  <IconComponent color="white" />
                </QuestIcon>
                <QuestInfo>
                  <QuestTitle>{title}</QuestTitle>
                </QuestInfo>
              </QuestHeader>
              <ProgressBar>
                <ProgressFill width={`${pct}%`} color={bgColor} />
                <ProgressText>{progressText}</ProgressText>
              </ProgressBar>
            </QuestItem>
          );
        })}
      </Card>
    </RightSection>
  )
}

export default RightSidebar
