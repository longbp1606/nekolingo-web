import styled from "styled-components";

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
  //   gap: 24px;
`;

export const SectionHeader = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const SectionTitle = styled.h2`
  font-size: 25px;
  font-weight: 700;
  color: #1c1e21;
  margin: 12px 0;
`;

export const LeftSection = styled.div`
  flex: 1;
  max-width: 600px;
`;

export const RightSection = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MonthlyChallengeBox = styled.div`
  background: #ffffff;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 14px;
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
  padding: 16px;

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

export const DailyQuestCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin-top: 12px;
  margin-bottom: 12px;

  .progress-label {
    font-size: 12px;
    margin-top: 4px;
    color: #000;
    position: absolute;
    right: 16px;
  }

  .icon {
    font-size: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    color: #fff;
  }
`;

export const FooterLinks = styled.div`
  margin-top: 20px;
  font-size: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  color: #bbbbbb;
  a {
    cursor: pointer;
    text-decoration: none;
    color: #aaa;
  }
`;

export const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
`;

export const GroupCard = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 0px 20px;
  border: 1px solid #ddd;
`;

export const DividerLine = styled.div`
  width: auto;
  height: 1px;
  background-color: #ddd;
`;

export const ContentChart = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ButtonArea = styled.div`
  width: 100%;
  padding: 0px 20px 20px 20px;

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
