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
  margin-bottom: 20px;
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

export const DeepPracticeBox = styled.div`
  background: linear-gradient(180deg, #001b65, #3e1084); 
  color: white;
  border-radius: 16px;
  padding: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
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
.super-box {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 10px 0;
}
`;

export const SuperImage = styled.img`
  width: 200px;
  height: 100%;
`;

//shop
export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 25px;
  font-weight: 700;
  color: ${theme.color.title};
  margin: 30px 0 20px 0;
`;

export const Section = styled.div`
  margin-bottom: 10px;
`;

export const SectionTitle = styled.h2`
  font-size: 25px;
  font-weight: 700;
  color: ${theme.color.title};
  margin: 0px 0 20px 0;
`;

export const HeartCard = styled.div`
  display: flex;
  align-items: center;
  padding: 24px 0;
  border-top: 1px solid #e5e5e5;
  background: transparent;
`;

export const HeartIcon = styled.div`
   width: 80px;
   height: 80px;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: 24px;
   flex-shrink: 0;
`;

export const PinkHeartIcon = styled(HeartIcon)`
  background: linear-gradient(135deg, #ffeef0 0%, #ffe0e6 100%);
`;

export const GradientHeartIcon = styled(HeartIcon)`
  background: linear-gradient(135deg, #58cc02 0%, #00b4d8 50%, #9d4edd 100%);
`;

export const BlueHeartIcon = styled(HeartIcon)`
  background: linear-gradient(135deg, #87ceeb 0%, #4169e1 100%);
`;

export const HeartSymbol = styled.div`
  font-size: 36px;
  color: #ff4757;
`;

export const InfinitySymbol = styled.div`
  font-size: 32px;
  color: white;
  font-weight: bold;
`;

export const IceSymbol = styled.div`
  font-size: 36px;
  color: white;
`;

export const ContentArea = styled.div`
  flex: 1;
`;

export const HeartTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.color.title};
  margin: 0 0 8px 0;
`;

export const HeartDescription = styled.p`
  font-size: 16px;
  color: ${theme.color.description};
  margin: 0;
  line-height: 1.4;
`;

export const PurchaseButton = styled.div`
  color: white;
  font-size: 12px;
  font-weight: 700;
  padding: 10px 14px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &.buy {
    background: ${theme.color.bgGreen};
    color: ${theme.color.green};
    border: 1px solid ${theme.color.green};
    border-bottom: 3px solid ${theme.color.green};
    &:hover {
      background: ${theme.color.green};
      color: white;
    }
  }

  &.free {
    background: ${theme.color.bgBlue};
    color: ${theme.color.primary};
    border: 1px solid ${theme.color.primary};
    border-bottom: 3px solid ${theme.color.primary};
    &:hover {
      background: ${theme.color.primary};
      color: white;
    }
  }

  &.full {
    background: ${theme.color.bgRed};
    color: ${theme.color.red};
    border: 1px solid ${theme.color.red};
    border-bottom: 3px solid ${theme.color.red};
    &:hover {
      background: ${theme.color.red};
      color: white;
    }
  }
`;

export const GemsIcon = styled.div`
  width: 20px;
  height: 20px;
  background: #00b4d8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: bold;
`;

export const ProgressText = styled.span`
  font-size: 12px;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 8px;
`;