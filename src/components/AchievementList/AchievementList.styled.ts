import { theme } from "@/themes";
import styled from "styled-components";

export const Card = styled.div`
    background-color: ${theme.color.white};
    border-radius: 12px;
    margin-top: 20px;
`;

export const AchievementImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

// Achievement Styles
export const AchievementSection = styled.div``;

export const AchievementHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export const AchievementTitle = styled.h3`
  font-size: 25px;
  font-weight: 700;
  margin: 0;
  color: ${theme.color.title};
`;

export const ViewAllLink = styled.a`
  font-size: 12px;
  color: ${theme.color.primary};
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    color: ${theme.color.darkPrimary};
  }
`;

export const AchievementListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
`;

export const AchievementItem = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  transition: all 0.2s;
  position: relative;
  align-items: center;

  & + &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0; 
    right: 0;
    height: 2px;
    background-color: #e5e5e5;
  }
`;


export const AchievementText = styled.p`
    font-size: 12px;
    font-weight: 600;
    margin: 0;
  &.fire {
    color: ${theme.color.red};
  }
  
  &.scholar {
    color: ${theme.color.green};
  }
  
  &.student {
    color: ${theme.color.primary};
  }
`;

export const AchievementLead = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const AchievementIconWrapper = styled.div`
  width: 80px;
  height: 100px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
  padding: 8px; 
  
  &.fire {
    background-color: ${theme.color.bgRed};
    border: 1px solid ${theme.color.red};
    border-bottom: 5px solid ${theme.color.red};
  }
  
  &.scholar {
    background-color: ${theme.color.bgGreen};
    border: 1px solid ${theme.color.green};
    border-bottom: 5px solid ${theme.color.green};
  }
  
  &.student {
    background-color: ${theme.color.bgBlue};
    border: 1px solid ${theme.color.primary};
    border-bottom: 5px solid ${theme.color.primary};
  }
`;

export const AchievementInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AchievementName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: ${theme.color.title};
`;

export const AchievementDesc = styled.p`
  font-size: 14px;
  color: ${theme.color.description};
  margin: 0;
  line-height: 1.4;
`;

export const AchievementProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .progress-bar {
    flex: 1;
    height: 12px;
    background: linear-gradient(90deg, #f0f0f0, #e0e0e0);
    border-radius: 999px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);

    .progress-fill {
      height: 100%;
      border-radius: 999px;
      transition: width 0.4s ease, background 0.4s ease;
      background-size: 400% 400%;
      animation: gradientFlow 3s ease infinite;
    }

   .progress-fill.complete {
  background: linear-gradient(270deg, #A8E063, #58CC02, #379500);
  background-size: 400% 400%;
  animation: gradientFlow 3s ease infinite;
}

.progress-fill.incomplete {
  background: linear-gradient(270deg, #FFA500, #FFD700, #FFC300);
  background-size: 400% 400%;
  animation: gradientFlow 3s ease infinite;
}

@keyframes gradientFlow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

  }
`;