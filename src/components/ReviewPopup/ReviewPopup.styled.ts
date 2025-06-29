import { theme } from '@/themes';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const PopupContainer = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
`;

export const PopupHeader = styled.div`
  background: white;
  padding: 32px 32px 24px 32px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
`;

export const PopupTitle = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: ${theme.color.title};
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

export const PopupSubtitle = styled.p`
  font-size: 16px;
  color: ${theme.color.description};
  margin: 0;
  font-weight: 400;
`;

export const PopupContent = styled.div`
  padding: 24px 32px 32px 32px;
  max-height: 500px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }
`;

export const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

export const ReviewCard = styled.div<{ isCorrect: boolean }>`
  background: ${props => props.isCorrect ? theme.color.bgGreen : theme.color.bgRed};
  border: 2px solid ${props => props.isCorrect ? theme.color.bgGreen : theme.color.bgRed};
  border-radius: 12px;
  padding: 16px;
  position: relative;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: ${slideIn} 0.5s ease-out;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    animation: ${pulse} 0.6s ease-in-out;
  }
  
  &:active {
    transform: translateY(-2px);
  }
`;

export const CheckIcon = styled.div<{ isCorrect: boolean }>`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 20px;
  height: 20px;
  background: ${props => props.isCorrect ? theme.color.green : theme.color.red};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
  animation: ${fadeIn} 0.8s ease-out;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 100%;
  justify-content: space-between;
`;

export const VietnameseText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.color.title};
  line-height: 1.4;
  margin-bottom: auto;
`;

export const EnglishText = styled.div`
  font-size: 13px;
  color: ${theme.color.description};
  line-height: 1.3;
  font-style: italic;
  margin-top: auto;
`;

// Detail Popup Styles
export const DetailOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

export const DetailPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  z-index: 1002;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
`;

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 24px 16px 24px;
  border-bottom: 1px solid #f0f0f0;
`;

export const DetailTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: ${theme.color.title};
`;

export const DetailContent = styled.div`
  padding: 24px;
`;

export const AnswerSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AnswerLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #666;
  margin-bottom: 8px;
`;

export const AnswerText = styled.div<{ isCorrect: boolean }>`
  padding: 12px 16px;
  border-radius: 8px;
  background: ${props => props.isCorrect ? theme.color.bgGreen : theme.color.bgRed};
  color: ${props => props.isCorrect ? '#2d5016' : '#8b0000'};
  font-weight: 500;
  border-left: 4px solid ${props => props.isCorrect ? theme.color.green : theme.color.red};
  animation: ${slideIn} 0.5s ease-out;
`;

export const CorrectAnswer = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  background: ${theme.color.bgGreen};
  color: #2d5016;
  font-weight: 500;
  border-left: 4px solid ${theme.color.green};
  animation: ${slideIn} 0.6s ease-out;
`;

export const WrongAnswer = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  background: ${theme.color.bgRed};
  color: #8b0000;
  font-weight: 500;
  border-left: 4px solid ${theme.color.red};
  animation: ${slideIn} 0.5s ease-out;
`;