import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  background: #e0e0e0;
  height: 10px;
  width: 50%;
  margin: 0 auto 12px;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({ percent }) => `${percent}%`};
  background: #4cd137;
  transition: width 0.5s ease;
`;

export const ProgressText = styled.div`
  text-align: center;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
`;