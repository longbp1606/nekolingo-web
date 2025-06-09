import { theme } from '@/themes';
import styled from 'styled-components';

export const GoalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  background: #fcfafc;
  margin: 0 auto;

  h3 {
    color: #333;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    text-align: center;
  }

  p {
    color: #666;
    font-size: 14px;
    text-align: center;
    margin: 10px 0 30px 0;
    line-height: 1.4;

    b {
      color: ${theme.color.orange} !important;
      font-weight: 700;
    }
  }
`;


export const Image = styled.img`
    width: 250px;
    height: 100%;
    margin: 0 auto;
`;

export const ImageWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

export const SpeechBubble = styled.div`
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-75%);
  background: #fff;
  color: #333;
  padding: 10px 16px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  font-weight: 500;
  font-size: 14px;
  width: 280px;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 90%;
    transform: translateX(-50%);
    border-width: 8px 8px 0 8px;
    border-style: solid;
    border-color: white transparent transparent transparent;
  }
`;

export const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 500px;
  margin: 10px 0;
`;

export const GoalOption = styled.div<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  border-bottom: 3px solid #f0f0f0; 

  ${props => props.selected ? `
    background: ${theme.color.bgBlue};
    border-color: ${theme.color.primary};
    box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
  ` : `
    background: white;
    border-color: #f0f0f0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
    
    &:hover {
      border-color: #d9d9d9;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    }
  `}

  div:first-child {
    font-weight: 600;
    font-size: 16px;
    color: ${props => props.selected ? `${theme.color.primary}` : '#333'};
  }

  div:last-child {
    font-size: 14px;
    color: ${props => props.selected ? `${theme.color.primary}` : '#8c8c8c'};
    font-weight: ${props => props.selected ? '400' : '300'};
  }
`;