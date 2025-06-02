import styled from 'styled-components';
import { Typography } from 'antd';

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
    background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    border: '#FFD700',
    headerBg: 'rgba(255, 255, 255, 0.25)'
  },
  green: {
    background: 'linear-gradient(135deg, #66BB6A 0%, #4CAF50 100%)',
    border: '#66BB6A',
    headerBg: 'rgba(255, 255, 255, 0.25)'
  },
  blue: {
    background: 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)',
    border: '#4FC3F7',
    headerBg: 'rgba(255, 255, 255, 0.25)'
  },
  red: {
    background: 'linear-gradient(135deg, #EF5350 0%, #F44336 100%)',
    border: '#EF5350',
    headerBg: 'rgba(255, 255, 255, 0.25)'
  },
  purple: {
    background: 'linear-gradient(135deg, #AB47BC 0%, #9C27B0 100%)',
    border: '#AB47BC',
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
      color: #52c41a;
    }
  }

  .ant-tag span {
    font-size: 20px;
  }
`;