import { theme } from "@/themes";
import styled from "styled-components";

export const ProgressBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 70%;
  padding-bottom: 16px;
  gap: 16px;
  margin: 0 auto;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: #f5f5f5;
  }
`;

export const ProgressBarContainer = styled.div`
  background: #e0e0e0;
  height: 10px;
  flex: 1;
  border-radius: 5px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({ percent }) => `${percent}%`};
  background: ${theme.color.green};
  transition: width 0.5s ease;
`;

export const LivesContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
`;