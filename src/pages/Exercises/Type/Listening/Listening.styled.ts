import styled from "styled-components";
import { Card, Typography } from "antd";
import { theme } from "@/themes";

const { Title } = Typography;

export const ListeningWrapper = styled.div`
  text-align: center;
`;

export const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 20px 0;
  justify-content: center;
`;

export const PlayButton = styled.button`
  width: 80px;
  height: 80px;
  background-color: #00c2d1;
  border: none;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  i {
    font-size: 32px;
    color: #ffffff;
  }
`;

export const SlowButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: #00c2d1;
  border: none;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  i {
    font-size: 24px;
    color: #ffffff;
  }
`;

export const QuestionTitle = styled(Title).attrs({ level: 5 })`
  margin: 10px 0;
   
`;

export const OptionCard = styled(Card) <{
  bgColor: string;
  borderColor: string;
  isClickable: boolean;
}>`
 font-size: 16px !important;
  width: 60% !important;
  margin: 0 auto;
  background-color: ${({ bgColor }) => bgColor};
  border: 2px solid ${({ borderColor }) => borderColor};
  border-bottom: 4px solid ${({ borderColor }) => borderColor}; 
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
  transition: all 0.2s ease;
  color: ${theme.color.title};
  border-radius: 10px;
`;

