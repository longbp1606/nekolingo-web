import { theme } from "@/themes";
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

export const LeftSection = styled.div`
  flex: 1;
  max-width: 600px;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  //   padding: 12px 16px;
  margin-top: 16px;

  //   margin-bottom: 16px;
  max-width: 600px;
  overflow: hidden;
  //   padding: 16px;
  position: relative;
  z-index: 100;
  //   margin-top: 16px;
  gap: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 25px;
  font-weight: 700;
  color: ${theme.color.title};
  margin: 12px 0;
`;

export const TopicContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding-bottom: 40px;
`;

export const GuideButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  font-weight: 600;
  border: none;
  background: #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
`;

// Ô luyện tập chuyên sâu
export const DeepPracticeBox = styled.div`
  background: linear-gradient(135deg, #001b65, #3e1084); 
  color: white;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* thêm bóng đổ để tách khối */
  display: flex;
  flex-direction: column;
  gap: 12px;

  .box-title {
    font-size: 20px;
    font-weight: bold;
    margin: 4px 0;
  }

  .box-subtitle {
    font-size: 14px;
    margin-bottom: 12px;
    opacity: 0.85;
  }

  .open-btn {
    background: white !important;
    color: #4b009e !important;
    border-radius: 12px;
    font-weight: 700;
    box-shadow: 0 4px 0 #9b91b9;
    height: 38px;
  }

  .open-btn:hover {
    border: 1px solid #ffffff;
    color: #3f22ec !important;
    }
  }

  .super-label {
  background: linear-gradient(135deg, #00e676, #00b0ff, #d500f9); /* gradient xanh-lá -> xanh-dương -> tím */
  color: white;
  font-size: 14px;
  font-weight: 900;
  font-style: italic;
  padding: 2px 10px;
  border-radius: 8px;
  display: inline-block;
  transform: skewX(-10deg); 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  text-transform: uppercase;
  letter-spacing: 1px;
}

`;

// Các thẻ luyện nghe / nói
export const PracticeCard = styled.div`
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  box-shadow: 0 3px 2px #e5e5e5;
  cursor: pointer;

  &:hover {
    background: #eeeeee;
  }

  .practice-title {
    font-size: 19px;
    font-weight: 600;
    color: #1c1e21;
  }

  .practice-subtitle {
    font-size: 13px;
    color: #606770;
    margin-top: 4px;
    width: 80%;
  }

  .super-label {
    background: linear-gradient(
      135deg,
      #00e676,
      #00b0ff,
      #d500f9
    ); /* gradient xanh-lá -> xanh-dương -> tím */
    color: white;
    font-size: 14px;
    font-weight: 900;
    font-style: italic;
    padding: 2px 10px;
    border-radius: 8px;
    display: inline-block;
    transform: skewX(-10deg); /* nghiêng chữ */
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .icon-circle {
    font-size: 24px;
    background: #e9f0ff;
    border-radius: 50%;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .error-tag {
    font-size: 14px;
    font-weight: bold;
    background: orange;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    text-align: center;
    line-height: 24px;
  }
`;

export const CommunicationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CardText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px 0px 16px 16px;
`;

export const CardTitle = styled.div`
  display: flex;
  gap: 10px;
  .practice-title {
    color: ${theme.color.title};
}

.practice-subtitle {
  color: ${theme.color.description};
}
`;
