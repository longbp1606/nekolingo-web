import styled, { keyframes } from "styled-components";
import { theme } from "@/themes";

// Animation nhẹ cho progress bar fill
const progressAnimation = (width: string) => keyframes`
  from {
    width: 0%;
  }
  to {
    width: ${width};
  }
`;

export const RightSection = styled.div`
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: all 0.3s ease;

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
    border: 2px solid #e5e5e5;
    transition: box-shadow 0.3s;
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const CardTitle = styled.h3`
    font-size: 20px;
    font-weight: 600;
    color: ${theme.color.title};
    margin: 0;
    letter-spacing: 0.5px;
`;

export const ViewLink = styled.a`
    color: ${theme.color.primary};
    font-size: 12px;
    font-weight: bold;
    text-decoration: none;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
        text-decoration: underline;
        color: ${theme.color.primary};
    }
`;

export const LeagueCard = styled(Card)`
    position: relative;
`;

export const LeagueIcon = styled.div`
    width: 60px;
    height: 60px;
    background-color: ${theme.color.primary};
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 28px;
    margin-right: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
        color: ${theme.color.green};
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
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

export const QuestInfo = styled.div`
    flex: 1;
`;

export const QuestTitle = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: ${theme.color.title};
`;

export const ProgressBar = styled.div`
    height: 16px;
    background-color: ${theme.color.borderSchedule};
    border-radius: 10px;
    overflow: hidden;
    position: relative;
`;

export const ProgressFill = styled.div<{ width: string; color?: string }>`
    height: 100%;
    background-color: ${props => props.color || theme.color.primary};
    border-radius: 10px;
    width: ${props => props.width};
    animation: ${props => progressAnimation(props.width)} 0.6s ease-out;
`;

export const ProgressText = styled.div`
    position: absolute;
    right: 45%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 11px;
    font-weight: 600;
    color: ${theme.color.title};
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
    gap: 12px;
    margin-top: 16px;
`;

export const StatItem = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const StatValue = styled.div`
    font-size: 22px;
    font-weight: 700;
    color: ${theme.color.title};
`;

export const StatLabel = styled.div`
    font-size: 12px;
    color: ${theme.color.description};
    margin-top: 4px;
    text-align: center;
`;


