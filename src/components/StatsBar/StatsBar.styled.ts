import { theme } from '@/themes';
import styled, { keyframes, css } from 'styled-components';

// Animations
const bounceIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  50% {
    transform: translateY(-2px) scale(1.02);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const heartBeat = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

// Main Container
export const StatsBarContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  background-color: ${theme.color.white};
  border-radius: 12px;
  padding: 8px 12px;
   box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #f1f5f9;
  max-width: 320px;
  width: 100%;
  margin: 0 auto;
  backdrop-filter: blur(10px);
  
  &:hover {
    animation: ${pulseGlow} 1s ease-in-out;
  }
`;

// Stat Item Wrapper
export const StatItemWrapper = styled.div<{
  color: string;
  bgColor: string;
  borderColor: string;
  isActive: boolean;
}>`
  position: relative;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  padding: 6px 4px;
  background: ${props => props.bgColor};
  border: 2px solid ${props => props.borderColor};
  flex: 1;
  margin: 0 2px;
  
  ${props => props.isActive && css`
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 20px ${props.color}30;
    border-color: ${props.color};
    background: linear-gradient(135deg, ${props.bgColor} 0%, ${props.color}10 100%);
  `}
  
  &:hover {
    transform: translateY(-1px) scale(1.02);
    box-shadow: 0 4px 15px ${props => props.color}25;
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
`;

// Stat Content
export const StatContent = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 45px;
  justify-content: center;
`;

// Stat Icon
export const StatIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  transition: transform 0.2s ease;
  
  img {
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

export const StreakIcon = styled.div`
  font-size: 14px;
  filter: drop-shadow(0 1px 2px rgba(255, 149, 0, 0.3));
  animation: ${heartBeat} 2s ease-in-out infinite;
`;

export const HeartIcon = styled.div<{ filled?: boolean; color?: string }>`
  font-size: 14px;
  transition: all 0.2s ease;
  filter: drop-shadow(0 1px 2px rgba(255, 107, 107, 0.3));
  
  &:hover {
    transform: scale(1.1);
    animation: ${heartBeat} 0.6s ease-in-out;
  }
`;

export const HeartIconArray = styled.div<{ filled?: boolean; color?: string }>`
  font-size: 24px;
  transition: all 0.2s ease;
  filter: drop-shadow(0 1px 2px rgba(255, 107, 107, 0.3));
  
  &:hover {
    transform: scale(1.1);
    animation: ${heartBeat} 0.6s ease-in-out;
  }
`;

// Stat Value
export const StatValue = styled.span<{ color: string }>`
  font-weight: 700;
  font-size: 14px;
  color: ${props => props.color};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  letter-spacing: -0.5px;
`;

// Dropdown Content
export const DropdownContent = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  max-width: 400px;
  animation: ${bounceIn} 0.3s ease-out;
  border: 2px solid #f1f5f9;
`;

export const DropdownTitle = styled.h3<{ color: string }>`
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.color};
  text-align: center;
`;

export const DropdownDescription = styled.p`
  margin: 0 0 16px 0;
  font-size: 14px;
  color: #64748b;
  text-align: center;
  line-height: 1.4;
`;

// Progress Components
export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
  margin: 12px 0;
`;

export const ProgressFill = styled.div<{ progress: number; color: string }>`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.color} 0%, ${props => props.color}dd 100%);
  border-radius: 4px;
  width: ${props => (props.progress / 7) * 100}%;
  transition: width 0.5s ease-out;
`;

// Weekly Progress
export const WeeklyProgress = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  margin: 16px 0;
`;

export const DayCircle = styled.div<{ completed: boolean; color: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  position: relative;
  
  &::before {
    content: '';
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${props => props.completed
    ? `linear-gradient(135deg, ${props.color} 0%, ${props.color}dd 100%)`
    : '#e2e8f0'
  };
    border: 2px solid ${props => props.completed ? props.color : '#cbd5e1'};
    transition: all 0.3s ease;
    box-shadow: ${props => props.completed
    ? `0 2px 8px ${props.color}40`
    : '0 1px 3px rgba(0, 0, 0, 0.1)'
  };
  }
  
  span {
    font-size: 10px;
    font-weight: 600;
    color: ${props => props.completed ? props.color : '#94a3b8'};
    text-transform: uppercase;
  }
`;

export const CheckIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
  font-weight: bold;
  z-index: 1;
`;

// Heart Container
export const HeartContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 16px 0;
  flex-wrap: wrap;
`;

// Additional styled components for enhanced UX
export const DropdownOverlay = styled.div`
  .ant-dropdown {
    border-radius: 16px !important;
    overflow: hidden !important;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
    border: 2px solid #f1f5f9 !important;
  }
  
  .ant-dropdown-menu {
    border-radius: 16px !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
  
  .ant-dropdown-menu-item {
    padding: 0 !important;
    border-radius: 16px !important;
  }
`;

// Responsive Design
export const ResponsiveWrapper = styled.div`
  @media (max-width: 768px) {
    ${StatsBarContainer} {
      max-width: 320px;
      padding: 6px 10px;
    }
    
    ${StatItemWrapper} {
      padding: 4px 6px;
      margin: 0 1px;
    }
    
    ${StatValue} {
      font-size: 12px;
    }
    
    ${StatContent} {
      gap: 3px;
      min-width: 35px;
    }
    
    ${DropdownContent} {
      min-width: 200px;
      padding: 12px;
    }
  }
`;

// Export all styled components
// Course selection styles
export const CourseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 12px;
`;

export const CourseItem = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  background: ${props => props.active ? `${theme.color.bgBlue}` : 'transparent'};
  border: 2px solid ${props => props.active ? `${theme.color.primary}` : 'transparent'};
  cursor: pointer;
  transition: all 0.2s ease;

`;

export const CourseName = styled.span`
  font-weight: 600;
  font-size: 16px;
  color: ${theme.color.primary};
`;

export const AddCourseItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }
`;

// Heart shop styles
export const HeartShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e5e5;
`;

export const HeartShopItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 12px;
  border: 2px solid #e5e5e5;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border: 2px solid ${theme.color.red};
    background: ${theme.color.bgRed};
    border-bottom: 4px solid ${theme.color.red};
    transform: translateY(-2px);
  }
`;

export const HeartShopIcon = styled.div`
  font-size: 24px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeartShopText = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const HeartShopPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const HeartCount = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 16px;
  font-weight: 600;
`;