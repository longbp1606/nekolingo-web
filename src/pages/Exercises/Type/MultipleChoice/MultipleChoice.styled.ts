import styled from "styled-components";
import { Typography, Card } from "antd";
import { theme } from "@/themes";

const { Text } = Typography;

export const Wrapper = styled.div`
  padding: 24px;
  text-align: center;
`;

export const PersonSay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  gap: 10px;
  margin: 20px auto;      

  img {
    border-radius: 50%;
    background-color: #d6f0ff;
  }
`;


export const WordBox = styled(Text)`
  font-size: 24px !important;
  padding: 8px 24px;
  color: ${theme.color.title};
  border-radius: 10px;
  display: inline-block;
  font-weight: bold;
  margin-bottom: 10px;
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

