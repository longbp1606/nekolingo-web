import styled, { keyframes, css } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-8px); }
  60% { transform: translateY(-4px); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(-3deg); }
  75% { transform: rotate(3deg); }
`;

// const glow = keyframes`
//   0%, 100% { box-shadow: 0 0 20px rgba(88, 166, 255, 0.4); }
//   50% { box-shadow: 0 0 30px rgba(88, 166, 255, 0.8); }
// `;

const sparkle = keyframes`
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
  100% { opacity: 0; transform: scale(0) rotate(360deg); }
`;

export const RoadContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  overflow-x: hidden;
`;

export const Road = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  min-height: 100vh;
`;

export const RoadPath = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 100%;
  background: linear-gradient(to bottom, #FF9500, #FF8C00, #FFA500, #FF7F00, #FF6347);
  border-radius: 20px;
  z-index: 1;
  box-shadow: 0 0 10px rgba(255, 149, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 100%;
    background: repeating-linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.8) 0px,
      rgba(255, 255, 255, 0.8) 20px,
      transparent 20px,
      transparent 40px
    );
    border-radius: 2px;
  }
`;

export const ModulesContainer = styled.div`
  position: relative;
  z-index: 2;
  padding: 40px 0;
`;

export const Module = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 60px;

  &:nth-child(even) {
    justify-content: flex-start;
    padding-left: 40px;
    @media (max-width: 768px) {
      justify-content: center;
      padding-left: 0;
    }
  }

  &:nth-child(odd) {
    justify-content: flex-end;
    padding-right: 40px;
    @media (max-width: 768px) {
      justify-content: center;
      padding-right: 0;
    }
  }
`;

interface ModuleCardProps {
  completed: boolean;
  current: boolean;
  locked: boolean;
}

export const ModuleCard = styled.div<ModuleCardProps>`
  position: relative;
  width: 260px;
  padding: 20px 16px 24px;
  border-radius: 20px;
  cursor: ${props => props.locked ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.locked ? 0.7 : 1};
  transition: all 0.3s ease;
  background: ${props => {
    if (props.completed) return 'linear-gradient(135deg, #00C2D1, #58CC02)';
    if (props.current) return 'linear-gradient(135deg, #ED33B9, #FFA500)';
    return 'linear-gradient(135deg, #E5E7EB, #D1D5DB)';
  }};
  border: 3px solid ${props => {
    if (props.completed) return '#4DAA02';
    if (props.current) return '#FF8C00';
    return '#E5E7EB';
  }};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

 &:hover {
  transform: ${props => props.locked ? 'none' : 'translateY(-12px) scale(1.03)'};

  ${props => !props.locked && css`
    animation: ${wiggle} 0.4s ease-in-out;
    background-position: right center;
    background-size: 200% 200%;
    border-color: ${props.completed ? '#00C2D1' :
      props.current ? '#ED33B9' :
        '#E5E7EB'
    };
  `}
  }

  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border-radius: 24px;
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
    pointer-events: none;
    z-index: -1;
  }
`;

interface ModuleNumberProps extends ModuleCardProps {
  side: 'left' | 'right';
}

export const ModuleNumber = styled.div<ModuleNumberProps>`
  position: absolute;
  top: -20px;
  left: ${props => props.side === 'left' ? '40%' : '53%'};
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
  color: white;
  background: ${props => {
    if (props.completed) return 'linear-gradient(180deg, #58CC02, #4DAA02)';
    if (props.current) return 'linear-gradient(180deg, #FFA500, #FF8C00)';
    return 'linear-gradient(135deg, #9CA3AF, #6B7280)';
  }};
  border: 4px solid white;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

  ${props => props.current && css`
    animation: ${bounce} 2s ease-in-out infinite;
  `}

  ${props => props.completed && css`
    &::after {
      content: '✨';
      position: absolute;
      top: -10px;
      right: -10px;
      font-size: 16px;
      animation: ${sparkle} 2s ease-in-out infinite;
    }
  `}
`;


export const ModuleTitle = styled.h3<ModuleCardProps>`
  color: ${props => props.completed || props.current ? 'white' : '#374151'};
  font-size: 18px;
  font-weight: 800;
  margin: 24px 0 8px 0;
  text-align: center;
  line-height: 1.3;
  text-shadow: ${props => props.completed || props.current ? '0 1px 3px rgba(0, 0, 0, 0.3)' : 'none'};
`;

export const ModuleDescription = styled.p<ModuleCardProps>`
  color: ${props => props.completed || props.current ? 'rgba(255, 255, 255, 0.95)' : '#6B7280'};
  font-size: 13px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 16px;
  text-shadow: ${props => props.completed || props.current ? '0 1px 2px rgba(0, 0, 0, 0.2)' : 'none'};
`;

export const ModuleStatus = styled.div<ModuleCardProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 16px;
  backdrop-filter: blur(8px);
  color: ${props => props.completed || props.current ? 'white' : '#6B7280'};
  background: ${props => props.completed || props.current
    ? 'rgba(255, 255, 255, 0.25)' : 'rgba(107, 114, 128, 0.15)'};
  border: 2px solid ${props => props.completed || props.current
    ? 'rgba(255, 255, 255, 0.4)' : 'rgba(107, 114, 128, 0.3)'};
`;

export const FloatingIcon = styled.div`
  position: absolute;
  font-size: 28px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;

  &:nth-child(1) {
    top: 15%;
    left: 15%;
    color: #FFD93D;
    animation: ${bounce} 4s ease-in-out infinite;
  }
  &:nth-child(2) {
    top: 35%;
    right: 20%;
    color: #FF6B6B;
    animation: ${wiggle} 3s ease-in-out infinite;
  }
  &:nth-child(3) {
    bottom: 25%;
    left: 25%;
    color: #4ECDC4;
    animation: ${bounce} 3.5s ease-in-out infinite;
  }
`;

