import styled from "styled-components";
import { Typography, Card } from "antd";

const { Text } = Typography;

export const Wrapper = styled.div`
  padding: 24px;
  text-align: center;
`;

export const ProgressBarContainer = styled.div`
  background: #e0e0e0;
  height: 10px;
  width: 50%;
  margin: 0 auto 24px;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  width: 80%;
  height: 100%;
  background: #4cd137;
`;

export const CharacterImage = styled.img`
  width: 60px;
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
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
  transition: all 0.2s ease;
`;

