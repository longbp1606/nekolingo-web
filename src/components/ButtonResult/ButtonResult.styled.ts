import { theme } from "@/themes";
import styled from "styled-components";

export const BottomBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 32px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-top: 2px solid #e5e5e5;
  z-index: 1000;

  &.correct {
    background-color: ${theme.color.bgGreen};
  }

  &.wrong {
    background-color: ${theme.color.bgRed};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 400px;
  align-items: center;
  height: 100%;
`;

export const ResultButton = styled.button<{
  $color?: string;
  $background?: string;
  $border?: string;
  $borderBottom?: string;
  $hoverColor?: string;
  $hoverBackground?: string;
  $hoverBorder?: string;
}>`
  border-radius: 10px;
  font-weight: bold;
  padding: 10px 36px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  color: ${({ $color }) => $color || `${theme.color.title}`};
  background-color: ${({ $background }) => $background || '#f0f0f0'};
  border: ${({ $border }) => $border || '2px solid #e5e5e5'};
  border-bottom: ${({ $borderBottom }) => $borderBottom || '5px solid #e5e5e5'};

   &:hover {
    background-color: ${({ $hoverBackground }) => $hoverBackground || '#f0f0f0'};
    color: ${({ $hoverColor }) => $hoverColor || '#000'};
    border-color: ${({ $hoverBorder }) => $hoverBorder || '#999'};
  }

  &:active {
    transform: translateY(2px);
    border-bottom-width: 2px;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;