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
import { useEffect, useState } from 'react';
import { notification } from 'antd';
import { getQuestDaily } from '@/services/questAPI';
import { Link } from 'react-router-dom';

const RightSidebar = () => {
  const [rawData, setRawData] = useState<any[]>([]);

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
    fetchData();
  }, []);

  return (
    <RightSection>
      <StatsBar />

      <LeagueCard>
        <CardHeader>
          <CardTitle>Sapphire League</CardTitle>
          <ViewLink>VIEW LEAGUE</ViewLink>
        </CardHeader>
        <LeagueInfo>
          <LeagueIcon>
            <FiAward />
          </LeagueIcon>
          <div>
            <LeagueRank>
              You're ranked <span>#5</span>
            </LeagueRank>
            <LeagueStatus>You moved up 1 rank!</LeagueStatus>
          </div>
        </LeagueInfo>
      </LeagueCard>

      <Card>
        <CardHeader>
          <CardTitle>Daily Quests</CardTitle>
          <ViewLink as={Link} to="/quest">VIEW ALL</ViewLink>
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
