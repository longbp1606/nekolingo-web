import { theme } from '@/themes';
import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;

`;

export const PopupContainer = styled.div`
  background: ${theme.color.white};
  border-radius: 1rem;
  padding: 50px;
  max-width: 580px;
  width: 100%;
  margin: 1rem;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  transition: color 0.2s;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #4b5563;
  }
&:focus {
outline: none
}
`;


export const CharacterWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
`;

export const Img = styled.img`
  width: 200px;
  height: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const Paper = styled.div`
  position: absolute;
  bottom: -0.5rem;
  right: -0.5rem;
  width: 2rem;
  height: 1.5rem;
  background: #fef08a;
  border-radius: 0.25rem;
  transform: rotate(12deg);
  border: 1px solid #fde047;
`;

export const Sparkle = styled.div`
  position: absolute;
  font-size: 0.75rem;
  color: #facc15;

  &.sparkle1 {
    top: -0.25rem;
    left: -0.25rem;
  }

  &.sparkle2 {
    top: -0.5rem;
    right: 0.5rem;
  }

  &.sparkle3 {
    top: 0.25rem;
    right: -0.75rem;
  }
`;

export const Title = styled.h2`
  font-size: 25px;
  font-weight: bold;
  color: ${theme.color.title};
  text-align: center;
  margin-bottom: 1rem;
`;

export const Description = styled.p`
  color: ${theme.color.description};
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.625;
`;

export const InviteSection = styled.div`
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  background: #f9fafb;
  border-radius: 0.75rem;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
`;

export const InviteInput = styled.input`
  flex: 1;
  background: transparent;
  color: ${theme.color.title};
  font-size: 0.875rem;
  outline: none;
  border: none;
`;

export const CopyButton = styled.button`
  margin-left: 0.5rem;
  background: ${theme.color.primary};
  &:hover {
    background: ${theme.color.bgBlue};
    color: ${theme.color.primary};
    border: none;
  }

  &:focus {
  outline: none !important;
  }
  
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const SocialText = styled.p`
  color: ${theme.color.description};
  text-align: center;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

export const SocialButtons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const SocialButton = styled.button<{ color: string }>`
  flex: 1;
  background: ${({ color }) => (color === 'blue' ? '#2563eb' : '#0ea5e9')};
  &:hover {
    background: ${({ color }) => (color === 'blue' ? '#1e40af' : `${theme.color.primary}`)};
    border-bottom: 4px solid
    ${({ color }) => (color === 'blue' ? '#1e3a8a' : `${theme.color.darkPrimary}`)}; 
  }
  color: white;
  padding: 0.75rem 0;
  border-radius: 0.75rem;
  font-size: 14px;
  font-weight: 600;

  border: none;
  border-bottom: 4px solid
    ${({ color }) => (color === 'blue' ? '#1e3a8a' : '#0369a1')}; 

  &:focus {
    outline: none;
  }
`;


export const BottomText = styled.p`
  color: ${theme.color.description};
  text-align: center;
  font-size: 0.875rem;
`;
