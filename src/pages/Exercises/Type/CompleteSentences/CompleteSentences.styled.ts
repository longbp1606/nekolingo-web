import styled from "styled-components";
import { Typography } from "antd";

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

export const Vietnamese = styled(Text)`
  font-size: 16px !important;
  border: 1px solid #ccc;
  padding: 8px 24px;
  border-radius: 10px;
  display: inline-block;
  margin-top: 8px;
`;

export const SentenceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  min-height: 60px;
  padding: 16px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
  background-color: #fafafa;
  margin: 0 auto 24px auto;
  width: 890px;
  margin-top: 24px;
  align-items: center;
  justify-content: center;
`;

interface WordSlotProps {
    hasWord: boolean;
    isChecked: boolean;
}

export const WordSlot = styled.div<WordSlotProps>`
  min-width: 80px;
  height: 40px;
  border: 2px solid #d9d9d9;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.hasWord ? '#1890ff' : '#ffffff'};
  color: ${props => props.hasWord ? '#ffffff' : '#999999'};
  cursor: ${props => props.hasWord && !props.isChecked ? 'pointer' : 'default'};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    ${props => props.hasWord && !props.isChecked && `
      background-color: #40a9ff;
      transform: translateY(-1px);
    `}
  }
`;

export const WordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 0 auto 24px auto;
  width: 890px;
  align-items: center;
  justify-content: center;
`;

interface WordBoxProps {
    isChecked: boolean;
}

export const WordBox = styled.div<WordBoxProps>`
  padding: 8px 16px;
  border: 2px solid #d9d9d9;
  border-radius: 6px;
  background-color: #ffffff;
  cursor: ${props => !props.isChecked ? 'pointer' : 'default'};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${props => props.isChecked ? 0.6 : 1};

  &:hover {
    ${props => !props.isChecked && `
      background-color: #e6f7ff;
      border-color: #1890ff;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(24, 144, 255, 0.1);
    `}
  }

  &:active {
    ${props => !props.isChecked && `
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(24, 144, 255, 0.1);
    `}
  }
`;