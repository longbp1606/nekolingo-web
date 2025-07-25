import { theme } from "@/themes";
import styled from "styled-components";

export const DeleteButton = styled.button`
  cursor: pointer;
  font-size: 12px;
  padding: 6px 20px;
  border-radius: 4px;
  transition: all 0.3s;
  margin-top: 10px;
  font-weight: 600;
  background-color: ${theme.color.bgBlue};
  color: ${theme.color.primary};
  border: 2px solid ${theme.color.primary};
  border-bottom: 3px solid ${theme.color.primary};

  &:hover {
    background-color: ${theme.color.bgGreen};
    color: ${theme.color.green}; 
    border-color: ${theme.color.green};
    border-bottom: 3px solid ${theme.color.green};
  }
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

export const BodyContent = styled.div`
  padding-left: 256px;
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

export const FixedHeader = styled.div`
  background-color: ${theme.color.white};
  border-bottom: 1px solid #e0e0e0;
  position: fixed;
  top: 0;
  padding: 20px 0 0;
  z-index: 100;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  max-width: 600px;
`;

export const LeftSection = styled.div`
  flex: 1;
  max-width: 600px;
`;

export const Sidebar = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

export const StatIcon = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const SidebarTitle = styled.h3`
  font-size: 16px;
  color: ${theme.color.description};
  margin-bottom: 20px;
  text-align: center;
`;

export const CompassContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const CompassCircle = styled.div`
  width: 80px;
  height: 80px;
  border: 2px dashed #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const CompassDirection = styled.div`
  font-size: 32px;
  color: #ccc;
  font-weight: bold;
`;

export const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 10px;
  justify-items: center;
  align-items: center;
`;

export const Card = styled.div`
    background-color: ${theme.color.white};
    border-radius: 12px;
    padding: 16px;
    border: 2px solid #e5e5e5;
    transition: box-shadow 0.3s;
    margin-top: 20px;
`;

export const IconButton = styled.button<{ selected: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ selected }) => (selected ? theme.color.bgGreen : "#f0f0f0")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s, background-color 0.2s, border 0.2s;
  border: ${({ selected }) => (selected ? `2px solid ${theme.color.green}` : "2px solid #eee")};
  border-bottom: ${({ selected }) => (selected ? `4px solid ${theme.color.green}` : "4px solid #eee")};

  &:hover {
    background-color: ${theme.color.bgBlue};
    border-color: ${theme.color.primary};
  }

  &:active {
    background-color: ${theme.color.bgGreen};
    border: 2px solid ${theme.color.green};
    border-bottom: 4px solid ${theme.color.green};
    transform: translateY(2px);
    
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  & > span {
    font-size: 25px;
  }
`;

export const LeaderboardContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 24px 0;
  width: 100%;
  max-width: 600px;
  margin: 200px auto 0px;
`;

export const TournamentSelector = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

export const TournamentOption = styled.div<{ isActive: boolean; gradient: string }>`
  width: ${props => props.isActive ? '80px' : '60px'};
  height: ${props => props.isActive ? '80px' : '60px'};
  background: ${props => props.gradient};
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.isActive ? '32px' : '24px'};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  box-shadow: ${props => props.isActive
    ? '0 8px 24px rgba(0, 0, 0, 0.2), 0 0 0 3px rgba(79, 172, 254, 0.3)'
    : '0 4px 12px rgba(0, 0, 0, 0.1)'};
  transform: ${props => props.isActive ? 'scale(1)' : 'scale(0.85)'};
  opacity: ${props => props.isActive ? '1' : '0.7'};

  &:hover {
    transform: ${props => props.isActive ? 'scale(1.05)' : 'scale(0.9)'};
    box-shadow: ${props => props.isActive
    ? '0 12px 32px rgba(0, 0, 0, 0.25), 0 0 0 3px rgba(79, 172, 254, 0.4)'
    : '0 6px 20px rgba(0, 0, 0, 0.15)'};
    opacity: 1;
  }

  &:active {
    transform: ${props => props.isActive ? 'scale(0.98)' : 'scale(0.88)'};
  }
`;

export const TournamentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  justify-content: center;
  padding: 15px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const TournamentIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #D4A574, #F4E4BC);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

export const TournamentTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${theme.color.title};
  margin: 0;
  text-align: center;

`;

export const TournamentSubtitle = styled.p`
  font-size: 14px;
  color: ${theme.color.description};
  margin: 4px 0;
  line-height: 1.4;
  text-align: center;

`;

export const TournamentDays = styled.div`
  font-size: 14px;
  color: #ff9500;
  font-weight: 500;
  margin-top: 4px;
  text-align: center;
`;

export const LeaderboardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const LeaderboardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 10px;
  transition: all 0.2s;

  &:hover {
    background-color: #eeeeee;
    transform: translateY(-1px);
  }
`;

export const RankBadge = styled.div<{ rank: number; color: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  flex-shrink: 0;
`;

export const UserAvatar = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.color};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
  position: relative;
  flex-shrink: 0;
`;

export const OnlineIndicator = styled.div`
  position: absolute;
  bottom: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  background-color: ${theme.color.green};
  border: 2px solid white;
  border-radius: 50%;
`;

export const UserInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${theme.color.title};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserScore = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${theme.color.description};
  flex-shrink: 0;
`;

export const FooterWrapper = styled.div`
  font-size: 12px;
  color: ${theme.color.description};
  text-align: center;
  margin-top: 40px;
`;

export const FooterRow = styled.div`
  margin-bottom: 10px;
`;

export const FooterLink = styled.span`
  margin-right: 15px;

  &:last-child {
    margin-right: 0;
  }
`;