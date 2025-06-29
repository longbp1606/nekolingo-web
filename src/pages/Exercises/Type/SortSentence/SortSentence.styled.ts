import { Typography } from "antd";
import styled from "styled-components";
import { theme } from "@/themes";
const { Text } = Typography;

export const Wrapper = styled.div`
  padding: 24px;
  text-align: center;
  height: 80%;
`;

export const Content = styled.div`
  width: 50%;
  margin: 0 auto 12px;
  height: 100%;
  align-content: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
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
  border-radius: 12px;
  background-color: #fafafa;
  margin: 0 auto 24px auto;
  width: 100%;
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
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.hasWord ? `${theme.color.primary}` : "#ffffff")};
  color: ${(props) => (props.hasWord ? "#ffffff" : "#999999")};
  cursor: ${(props) =>
    props.hasWord && !props.isChecked ? "pointer" : "default"};
  font-size: 14px;
  font-weight: 600;
  transition: all 0.2s ease;
  outline: none;
  
  &:hover {
    ${(props) =>
    props.hasWord &&
    !props.isChecked &&
    `
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
  width: 100%;
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
  cursor: ${(props) => (!props.isChecked ? "pointer" : "default")};
  font-size: 16px;
  font-weight: 500;
  color: ${theme.color.title};
  transition: all 0.2s ease;
  opacity: ${(props) => (props.isChecked ? 0.6 : 1)};
  outline: none;
  
  &:hover {
    ${(props) =>
    !props.isChecked &&
    `
      background-color: ${theme.color.bgBlue};
      border: 2px solid ${theme.color.primary};
      border-bottom: 4px solid ${theme.color.primary};
    `}
  }
  
  &:focus {
    outline: none;
  }
  
  &:active {
    ${(props) =>
    !props.isChecked &&
    `
      transform: translateY(1px);
    `}
  }
`;

export const PersonSay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 12px 0;
  img {
    border-radius: 50%;
    background-color: #d6f0ff;
  }
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

export const SentenceBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 40px;
  margin-top: 16px;
`;

export const OptionBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
`;

export const WordButton = styled.button`
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 999px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;
  
  &:hover {
    background-color: #eee;
  }
  
  &:focus {
    outline: none;
  }
`;

export const SelectedWordButton = styled(WordButton)`
  background-color: #dfe6e9;
  border: 2px solid #0984e3;
`;