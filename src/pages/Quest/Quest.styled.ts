import { theme } from "@/themes";
import styled, { keyframes } from "styled-components";


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

export const TopicContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LeftSection = styled.div`
  flex: 1;
  max-width: 600px;
`;

export const SideCardContent = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SideCardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: #1f2937;

  h4 {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const RewardCard = styled.div`
  background: #a78bfa;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  color: white;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
`;

export const RewardText = styled.div`
  z-index: 1;
`;

export const RewardImage = styled.div`
  position: absolute;
  right: 12px;
  bottom: 0;
  width: 80px;
  height: 80px;
  background-image: url("/path/to/reward-icon.png"); /* Replace with actual image path */
  background-size: contain;
  background-repeat: no-repeat;
`;


export const ButtonArea = styled.div`
  width: 100%;
  padding: 0;
  padding-right: 16px;
  padding-top: 16px;

  .learn-btn {
    width: 100%;
    background: white !important;
    color: #aaa !important;
    border-radius: 12px;
    font-weight: 700;
    box-shadow: 0 4px 0 #bbb;
    height: 38px;
    border: 1px solid #bbb;
  }

  .learn-btn:hover {
    background: #eeeeee !important;
  }
`;

export const StyledSidebar = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

export const CardSide = styled.div`
    background-color: ${theme.color.white};
    border-radius: 12px;
    border: 2px solid #e5e5e5;
    transition: box-shadow 0.3s;
    margin-top: 24px;
    padding: 20px 0;
    padding-left: 16px;
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

export const Card = styled.div`
    background-color: ${theme.color.white};
    border-radius: 12px;
    margin-top: 20px;
`;

export const AchievementImg = styled.img`
  width: 100%;
  height: 90px;
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

export const ViewAllLink = styled.div`
  font-size: 12px;
  color: ${theme.color.primary};
  text-decoration: none;
  font-weight: 600;
`;

export const AchievementListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid #e5e5e5;
  border-radius: 12px;
`;

export const AchievementItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  transition: all 0.2s;
  position: relative;

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
  height: 100%;
  width: 90px;
`;

export const AchievementInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-right: 25px;
`;

export const AchievementName = styled.h4`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: ${theme.color.title};
`;

export const AchievementDesc = styled.p`
position: absolute;
top: 73px;
right: 230px;
  font-size: 12px;
  font-weight: 600;
  color: ${theme.color.title};
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

export const CardWrapper = styled.div`
  background: linear-gradient(135deg, #FFB3E6, #FF84D8, #E950A3);
  border-radius: 12px;
  padding: 20px;
  color: white;
  width: 100%;
`;

export const HeaderTag = styled.span`
  background-color: white;
  color: #ff84d8;
  font-weight: bold;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 6px;
  display: inline-block;
  margin-bottom: 4px;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  letter-spacing: 1px;
`;

export const SubText = styled.p`
  font-size: 12px;
  opacity: 0.8;
  margin: 4px 0 50px;
`;

export const ProgressWrapper = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;

  .nameProgress {
    font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: ${theme.color.title};
  }
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 18px;
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0);
  border-radius: 999px;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ProgressFill = styled.div`
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
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s ease, background 0.4s ease;
  background-size: 400% 400%;
  animation: gradientFlow 3s ease infinite;
 background: linear-gradient(270deg, #FFB3E6, #FF84D8, #E950A3);

`;

export const ProgressText = styled.span`
  font-weight: bold;
  position: absolute;
  right: 52.5%;
  font-size: 12px;
  color: ${theme.color.title};
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
