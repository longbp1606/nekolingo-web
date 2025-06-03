import styled from 'styled-components';

export const StreakWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: #fcfeff;
  position: relative;

  /* Decorative dots in background */
  &::before {
    content: '';
    position: absolute;
    top: 20px;
    right: 20%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #ff9500;
    box-shadow: 
      -50px 30px 0 #e0e0e0,
      -100px 60px 0 #e0e0e0,
      -150px 90px 0 #e0e0e0,
      50px 50px 0 #e0e0e0,
      100px 80px 0 #e0e0e0;
  }

  h1 {
    color: #ff9500 !important;
    font-size: 72px !important;
    font-weight: 800;
    margin: 0;
    text-shadow: 0 2px 4px rgba(255, 149, 0, 0.3);
  }

  p {
    color: #8e8e93;
    font-size: 14px;
    text-align: center;
    max-width: 300px;
    line-height: 1.5;
    margin: 20px 0 0 0;
  }
`;

export const StreakBox = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin: 16px auto;
  max-width: 320px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  text-align: center;

  p {
    margin-top: 12px;
    font-size: 14px;
    color: #555;
  }
`;

export const StreakText = styled.div`
  color: orange;
  font-size: 18px;
  font-weight: 600;
  margin: -10px 0 0 0;
  text-align: center;
`;

export const DayList = styled.div`
  display: flex;
  gap: 12px;
  margin: 20px 0;
  padding: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
`;


export const Image = styled.img`
    width: 200px;
    height: 100%;
    margin: 0 auto;
`;

export const DayItem = styled.div<{ active?: boolean }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  
  ${props => props.active ? `
    background: orange;
    color: white;
    box-shadow: 0 2px 8px rgba(255, 149, 0, 0.4);
    animation: fadeInActive 1.2s ease-in-out;
    
    &::after {
      content: '✓';
      position: absolute;
      font-size: 16px;
      font-weight: bold;
      animation: fadeInCheck 1.5s ease-in-out;
    }
  ` : `
    background: #e8e8ed;
    color: #8e8e93;
  `}
  
  transition: all 0.2s ease;

  @keyframes fadeInActive {
    0% {
      background: #e8e8ed;
      color: #8e8e93;
      box-shadow: none;
      transform: scale(1);
    }
    30% {
      background: #ffb366;
      color: rgba(255, 255, 255, 0.7);
      transform: scale(1.05);
    }
    60% {
      background: #ff9500;
      color: white;
      box-shadow: 0 1px 4px rgba(255, 149, 0, 0.2);
    }
    100% {
      background: #ff9500;
      color: white;
      box-shadow: 0 2px 8px rgba(255, 149, 0, 0.4);
      transform: scale(1);
    }
  }

  @keyframes fadeInCheck {
    0% {
      opacity: 0;
      transform: scale(0.5);
    }
    50% {
      opacity: 0;
      transform: scale(0.7);
    }
    70% {
      opacity: 1;
      transform: scale(1.2);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
