// GameOver.styled.ts
import styled from "styled-components";
import { Button } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { theme } from "@/themes";

export const GameOverWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Popup = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 400px;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 20px;
  color: ${theme.color.red};
`;

export const RestoreSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 30px 20px;
  font-size: 16px;
  margin-bottom: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const RestoreLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RestoreRight = styled.span`
  font-weight: 300;
  font-size: 12px;
  color: #666;
`;


export const HeartIcon = styled(HeartFilled)`
  color: ${theme.color.red};
  font-size: 20px;
`;

export const Img = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 30px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const RegisterButton = styled(Button)`
  width: 100%;
  background-color: ${theme.color.primary};
  border: 2px solid ${theme.color.darkPrimary};
  border-bottom: 5px solid ${theme.color.darkPrimary};
  color: white;
  font-weight: bold;
  padding: 22px 12px;
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 8px;

  &:hover {
    background-color: ${theme.color.bgBlue} !important;
    color: ${theme.color.primary} !important;
    border: 2px solid ${theme.color.primary} !important;
    border-bottom: 5px solid ${theme.color.primary} !important;
  }
`;

export const CancelButton = styled(Button)`
  width: 100%;
  color: ${theme.color.primary};
  font-weight: bold;
  padding: 12px;
  font-size: 14px;
  padding: 22px 12px;

  &:hover {
    border: 1px solid ${theme.color.primary} !important;
    color: ${theme.color.primary} !important;
  }
`;