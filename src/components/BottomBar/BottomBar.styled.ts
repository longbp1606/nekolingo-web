import styled from 'styled-components';
import { theme } from "@/themes";

export const BottomBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 32px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-top: 2px solid #e5e5e5;
  z-index: 1000;

  &.correct {
    background-color: ${theme.color.bgGreen};
  }

  &.wrong {
    background-color: ${theme.color.bgRed};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 400px;
  align-items: center;
  height: 100%;
`;

export const SkipButton = styled.button`
  border-radius: 10px;
  font-weight: bold;
  color: ${theme.color.title};
  border: 2px solid #e5e5e5;
  border-bottom: 5px solid #e5e5e5;
  background-color: white;
  padding: 10px 36px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${theme.color.bgBlue};
    color: ${theme.color.title};
    border-color: ${theme.color.primary};
  }

  &:active {
    background-color: #ffffff;
    border-bottom: 2px solid #ccc;
    transform: translateY(2px);
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

export const CheckButton = styled.button`
  border-radius: 10px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #fff;
  border: 2px solid #e5e5e5;
  border-bottom: 5px solid #e5e5e5;
  color: #555;
  padding: 10px 36px;
  cursor: pointer;
  transition: all 0.2s ease;
  

 &:hover {
    background-color: ${theme.color.bgBlue};
    color: ${theme.color.title};
    border-color: ${theme.color.primary};
  }

  &:active {
    background-color: #d0d0d0;
    border-bottom: 2px solid #bbb;
    transform: translateY(2px);
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;


export const NextButtonSuccess = styled.button`
  border-radius: 10px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: ${theme.color.green};
  color: white;
  border: 2px solid #e5e5e5;
  border-bottom: 5px solid ${theme.color.darkGreen};
  padding: 10px 36px;

  &.fail {
    background-color: ${theme.color.red};
    border-bottom: 5px solid ${theme.color.darkRed};
  }
    
  &:hover {
    background-color: ${theme.color.bgBlue};
    color: ${theme.color.title};
    border-color: ${theme.color.primary};
  }
`;


export const FeedbackBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 12px;

  &.success {
    background-color: ${theme.color.bgGreen};
  }

  &.danger {
    background-color: ${theme.color.bgRed};
  }
`;

export const FeedbackText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;

  &.success {
    color: ${theme.color.green};
  }

  &.danger {
    color: ${theme.color.red};
  }
`;

export const ReportBtn = styled.div`
  font-size: 10px;
  color: #666;
  cursor: pointer;
  margin-top: 5px;
  text-align: left;
`;

export const IconCircle = styled.div`
  width: 40px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
