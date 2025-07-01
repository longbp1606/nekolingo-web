import styled from "styled-components";
import { theme } from "@/themes";
import { Button } from 'antd';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
`;

export const PopupContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 24px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const Message = styled.p`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 24px;
  color: ${theme.color.title};
`;

export const ContinueButton = styled(Button)`
  width: 100%;
  background-color: ${theme.color.green};
  color: #fff;
  padding: 20px 40px;
  border-radius: 8px;
  border: 2px solid ${theme.color.darkGreen};
  border-bottom: 5px solid ${theme.color.darkGreen};
  font-weight: bold;

  &:hover,
  &:focus {
    background-color: ${theme.color.bgBlue} !important;
    border-color: ${theme.color.primary} !important;
    border-bottom: 5px solid ${theme.color.primary} !important;
    color: ${theme.color.primary} !important;
  }
`;

export const StopButton = styled(Button)`
  width: 100%;
  background-color: ${theme.color.red};
  color: #fff;
  padding: 20px 40px;
  border-radius: 8px;
  border: 2px solid ${theme.color.darkRed};
  border-bottom: 5px solid ${theme.color.darkRed};
  font-weight: bold;

  &:hover,
  &:focus {
    background-color: ${theme.color.bgBlue} !important;
    border-color: ${theme.color.primary} !important;
    border-bottom: 5px solid ${theme.color.primary} !important;
    color: ${theme.color.primary} !important;
  }
`;
