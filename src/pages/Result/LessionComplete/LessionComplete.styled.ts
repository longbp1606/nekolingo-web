import styled from 'styled-components';
import { Typography } from 'antd';
import { theme } from '@/themes';

export const Title = styled(Typography.Title)`
  color: #ffd333 !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

export const LessionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  gap: 30px;
  background: #fdfdfa;
  min-height: 100vh;
`;

interface XPBoxProps {
  color?: 'yellow' | 'green' | 'blue' | 'red' | 'purple';
}

const colorMap = {
  yellow: {
    background: `linear-gradient(135deg, ${theme.color.lightOrange} 0%, ${theme.color.orange} 100%)`,
    border: `${theme.color.orange}`,
    headerBg: 'rgba(255, 255, 255, 0.25)'
  },
  green: {
    background: `linear-gradient(135deg, ${theme.color.green} 0%, ${theme.color.darkGreen} 100%)`,
    border: `${theme.color.green}`,
    headerBg: 'rgba(255, 255, 255, 0.25)'
  },
  blue: {
    background: `linear-gradient(135deg, ${theme.color.bgBlue} 0%, ${theme.color.primary} 100%)`,
    border: `${theme.color.bgBlue}`,
    headerBg: 'rgba(255, 255, 255, 0.25)'
  },
  red: {
    background: `linear-gradient(135deg, ${theme.color.red} 0%, ${theme.color.darkRed} 100%)`,
    border: `${theme.color.red}`,
    headerBg: 'rgba(255, 255, 255, 0.25)'
  },
  purple: {
    background: `linear-gradient(135deg, ${theme.color.lightPurple} 0%, ${theme.color.darkPurple} 100%)`,
    border: `${theme.color.lightPurple}`,
    headerBg: 'rgba(255, 255, 255, 0.25)'
  }
};

export const Image = styled.img`
    width: 300px;
    height: 100%;
    margin: 0 auto;
`;

export const XPBox = styled.div<XPBoxProps>`
  position: relative;
  background: ${props => colorMap[props.color || 'yellow'].background};
  border: 2px solid ${props => colorMap[props.color || 'yellow'].border};
  border-radius: 16px;
  padding: 0;
  min-width: 200px;
  min-height: 120px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  > div:first-child {
    background: ${props => colorMap[props.color || 'yellow'].headerBg};
    backdrop-filter: blur(10px);
    padding: 12px 20px;
    border-radius: 14px 14px 0 0;
    color: white;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .ant-tag {
    margin: 20px auto;
    background: rgba(255, 255, 255, 0.95);
    border: none;
    border-radius: 20px;
    padding: 8px 16px;
    font-size: 18px;
    font-weight: 700;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 8px;
    
    &.ant-tag-green {
      background: rgba(255, 255, 255, 0.95);
      color: ${theme.color.green};
    }
  }

  .ant-tag span {
    font-size: 20px;
  }
`;