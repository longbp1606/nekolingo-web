import styled from 'styled-components';

export const BottomBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 32px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-top: 2px solid #eee;
  z-index: 1000;

  &.correct {
    background-color: #d6ffbe;
  }

  &.wrong {
    background-color: #ffe1e1;
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
  color: #888;
  border: 2px solid #eee;
  border-bottom: 5px solid #eee;
  background-color: white;
  padding: 10px 36px;
`;

export const CheckButton = styled.button`
  border-radius: 10px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #e6e6e6;
  border: 2px solid #eee;
  border-bottom: 5px solid #eee;
  color: #555;
  padding: 10px 36px;
`;

export const NextButtonSuccess = styled.button`
  border-radius: 10px;
  font-weight: bold;
  text-transform: uppercase;
  background-color: #52c41a;
  color: white;
  border: 2px solid #eee;
  border-bottom: 5px solid #389e0d;
  padding: 10px 36px;

  &.fail {
    background-color: #ff4d4f;
    border-bottom: 5px solid #cf1322;
  }
`;


export const FeedbackBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 12px;

  &.success {
    background-color: #d6ffbe;
  }

  &.danger {
    background-color: #ffe2e2;
  }
`;

export const FeedbackText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;

  &.success {
    color: #2f8c00;
  }

  &.danger {
    color: #cc0000;
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
