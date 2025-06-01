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
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #3c3c3c;
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
  font-size: 19px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    ${(props) =>
      props.hasWord &&
      !props.isChecked &&
      `
    //   background-color: #40a9ff;
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
  width: 100%;
  align-items: center;
  justify-content: center;
`;

interface WordBoxProps {
  isChecked: boolean;
}

export const WordBox = styled.div<WordBoxProps>`
  padding: 8px 16px;
  border: 2px solid #d9d9d9;
  border-radius: 12px;
  background-color: #ffffff;
  cursor: ${(props) => (!props.isChecked ? "pointer" : "default")};
  font-size: 19px;
  font-weight: 500;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.isChecked ? 0.6 : 1)};

  &:hover {
    ${(props) =>
      !props.isChecked &&
      `
      background-color: #e6f7ff;
      border-color: #1890ff;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(24, 144, 255, 0.1);
    `}
  }

  &:active {
    ${(props) =>
      !props.isChecked &&
      `
      transform: translateY(0);
      box-shadow: 0 1px 2px rgba(24, 144, 255, 0.1);
    `}
  }
`;

export const PersonSay = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0;

  img {
    border-radius: 50%;
    background-color: #d6f0ff;
  }

  // .speech-bubble {
  //     background: #f2f2f2;
  //     border-radius: 16px;
  //     padding: 10px 16px;
  //     font-size: 16px;
  //     position: relative;
  // }

  // .speech-bubble::after {
  //     content: '';
  //     position: absolute;
  //     top: 50%;
  //     left: -10px;
  //     transform: translateY(-50%);
  //     width: 0;
  //     height: 0;
  //     border-top: 10px solid transparent;
  //     border-bottom: 10px solid transparent;
  //     border-right: 10px solid #f2f2f2;
  // }
`;

export const Vietnamese = styled(Text)`
  font-size: 16px !important;
  border: 1px solid #ccc;
  padding: 8px 24px;
  border-radius: 10px;
  display: inline-block;
  margin-top: 8px;
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

  &:hover {
    background-color: #eee;
  }
`;

export const SelectedWordButton = styled(WordButton)`
  background-color: #dfe6e9;
  border: 2px solid #0984e3;
`;
