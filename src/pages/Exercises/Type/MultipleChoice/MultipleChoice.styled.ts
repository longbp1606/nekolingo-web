import styled from "styled-components";
import { Typography, Card } from "antd";

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
  font-size: 16px !important;
  border: 1px solid #ccc;
  padding: 8px 24px;
  border-radius: 10px;
  display: inline-block;
  margin-top: 8px;
`;

export const OptionCard = styled(Card) <{
  bgColor: string;
  borderColor: string;
  isClickable: boolean;
}>`
  width: 60% !important;
  margin: 0 auto;
  background-color: ${({ bgColor }) => bgColor};
  border: 2px solid ${({ borderColor }) => borderColor};
  border-bottom: 4px solid ${({ borderColor }) => borderColor}; 
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
  transition: all 0.2s ease;
`;

