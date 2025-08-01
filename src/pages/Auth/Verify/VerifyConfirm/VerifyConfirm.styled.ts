import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: #f7faff;
  border-radius: 24px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
  padding: 56px 32px;
`;

export const Mascot = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 50%;
  margin-bottom: 16px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.07);
  background: #fff;
  animation: ${bounce} 1.5s infinite;
`;

export const Icon = styled.div`
  margin-bottom: 24px;
`;

export const Message = styled.div`
  font-size: 1.25rem;
  color: #444;
  text-align: center;
  line-height: 1.7;
`;