import styled from "styled-components";
import { theme } from "@/themes";

export const RightSection = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    @media (max-width: 1024px) {
        width: 100%;
        max-width: 600px;
    }
`;

export const StatHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
`;

export const Card = styled.div`
    background-color: ${theme.color.white};
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const CardTitle = styled.h3`
    font-size: 18px;
    font-weight: bold;
    color: ${theme.color.textPrimary};
    margin: 0;
`;

export const ViewLink = styled.a`
    color: ${theme.color.primary};
    font-size: 14px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
`;

export const LeagueCard = styled(Card)`
    position: relative;
`;

export const LeagueIcon = styled.div`
    width: 60px;
    height: 60px;
    background-color: ${theme.color.primary};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 24px;
    margin-right: 16px;
`;

export const LeagueInfo = styled.div`
    display: flex;
    align-items: center;
`;

export const LeagueRank = styled.div`
    font-weight: bold;
    font-size: 16px;
    color: ${theme.color.textPrimary};
    
    span {
        color: ${theme.color.success};
    }
`;

export const LeagueStatus = styled.div`
    font-size: 14px;
    color: ${theme.color.textSecondary};
    margin-top: 4px;
`;

export const QuestItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

export const QuestHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

export const QuestIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    font-size: 20px;
`;

export const QuestInfo = styled.div`
    flex: 1;
`;

export const QuestTitle = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: ${theme.color.textPrimary};
`;

export const ProgressBar = styled.div`
    height: 16px;
    background-color: ${theme.color.borderSchedule};
    border-radius: 8px;
    overflow: hidden;
    position: relative;
`;

export const ProgressFill = styled.div<{ width: string, color?: string }>`
    height: 100%;
    width: ${props => props.width};
    background-color: ${props => props.color || theme.color.primary};
    border-radius: 8px;
    position: relative;
`;

export const ProgressText = styled.div`
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
    font-weight: bold;
    color: ${theme.color.textPrimary};
`;

export const ProgressIcon = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 4px;
    background-color: ${theme.color.quaternary};
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: -4px;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 14px;
`;

export const StatsRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
`;

export const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StatValue = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${theme.color.textPrimary};
`;

export const StatLabel = styled.div`
    font-size: 12px;
    color: ${theme.color.textSecondary};
    margin-top: 4px;
`;

