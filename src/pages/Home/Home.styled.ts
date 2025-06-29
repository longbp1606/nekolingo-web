import styled, { keyframes } from "styled-components";
import { theme } from "@/themes";

// Animations
export const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
`;

export const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
`;

export const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(88, 166, 255, 0.4); }
  50% { box-shadow: 0 0 30px rgba(88, 166, 255, 0.8); }
`;

export const sparkle = keyframes`
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
  100% { opacity: 0; transform: scale(0) rotate(360deg); }
`;

export const FloatingIcon = styled.div`
  position: absolute;
  font-size: 28px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;

  &:nth-child(1) {
    top: 10%;
    left: 5%;
    color: #FFD93D;
    animation: ${bounce} 4s ease-in-out infinite;
  }

  &:nth-child(2) {
    bottom: 15%;
    right: 10%;
    color: #FF6B6B;
    animation: ${sparkle} 6s ease-in-out infinite;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
   align-items: center; 
  position: relative;
  padding: 20px 24px;
  margin-bottom: 24px;
  max-width: 640px;
  border-radius: 20px;
  overflow: hidden;
  color: #1f2937;

  background: 
    linear-gradient(145deg, #ffffff, #f8fafc), 
    url('data:image/svg+xml;utf8,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="1" cy="1" r="1" fill="%23e5e7eb" /></svg>');
  background-repeat: repeat;
  background-size: 60px 60px;
  background-blend-mode: overlay;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
  border: 2px solid rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    padding: 24px;
  }
`;

export const SectionTitle = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    font-weight: bold;
    font-size: 12px;
    margin-right: 128px;
    color: ${theme.color.title};
`;

export const GuideButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: ${theme.color.bgBlue};
    color: ${theme.color.title};
    border: none;
    border-radius: 12px;
    padding: 8px;
    font-weight: bold;
    cursor: pointer;
    font-size: 14px;
    border: 2px solid ${theme.color.primary};
    height: 50px;
    justify-content: center;
    border-bottom: 5px solid ${theme.color.primary};

    &:hover {
    color: white;
    background-color: ${theme.color.primary};
    border: 2px solid ${theme.color.primary};
     border-bottom: 5px solid ${theme.color.primary};
    }
`;

export const TopicTitle = styled.div`
    font-size: 20px;
    font-weight: 600;
    color: ${theme.color.title};
`;

export const BodyContent = styled.div`
    padding-left: 256px;
`;

export const HomeWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: "Quicksand", sans-serif;
`;

export const HomeContent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 40px;
    width: 100%;
    margin-top: 20px;
    
    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

export const LeftSection = styled.div`
    flex: 1;
    max-width: 600px;
`;

export const TopicContent = styled.div`
    display: flex;
    flex-direction: column; 
    gap: 20px;
`;

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

