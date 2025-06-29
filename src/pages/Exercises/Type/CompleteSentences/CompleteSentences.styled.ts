import styled from "styled-components";
import { Typography } from "antd";
import { theme } from "@/themes";

const { Text } = Typography;

export const Wrapper = styled.div`
  padding: 24px;
  text-align: center;
`;

export const Image = styled.img`
  width: 100px;
  height: 120px;
  background-size: cover;
  margin: 0 auto;
`;

export const Vietnamese = styled(Text)`
  font-size: 16px !important;
  border: 2px solid #e5e5e5;
  padding: 8px 24px;
  border-radius: 10px;
  display: inline-block;
  margin-top: 8px;
  color: ${theme.color.title};
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
  background-color: ${props => props.hasWord ? '#00c2d1' : '#ffffff'};
  color: ${props => props.hasWord ? '#ffffff' : '#999999'};
  cursor: ${props => props.hasWord && !props.isChecked ? 'pointer' : 'default'};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    ${props => props.hasWord && !props.isChecked && `
      background-color: ${theme.color.bgBlue} !important;
      transform: translateY(-1px);
    `}
  }

  &:focus {
    outline: none;
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
  border: 2px solid #e5e5e5;
  border-bottom: 4px solid #e5e5e5;
  border-radius: 10px;
  background-color: #ffffff;
  cursor: ${props => !props.isChecked ? 'pointer' : 'default'};
  font-size: 16px;
  font-weight: 500;
  color: ${theme.color.title};
  transition: all 0.2s ease;
  opacity: ${props => props.isChecked ? 0.6 : 1};
  outline: none;

  &:hover {
    ${props => !props.isChecked && `
      background-color: ${theme.color.bgBlue};
      border: 2px solid ${theme.color.primary};
      border-bottom: 4px solid ${theme.color.primary};
    `}
  }

  &:focus {
    outline: none;
  }

  &:active {
    ${props => !props.isChecked && `
      transform: translateY(1px);
    `}
  }
`;