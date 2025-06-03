import { theme } from '@/themes';
import styled from 'styled-components';

export const Button = styled.button`
  background: ${theme.color.primary};
  border-bottom: 5px solid ${theme.color.borderNextButton};
  color: white;
  border-radius: 20px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background: #2fdfec;
    color: #ffffff;
    border-left: 1px solid #2fdfec;
    border-top: 1px solid #2fdfec;
    border-right: 1px solid #2fdfec;
    border-bottom: 5px solid ${theme.color.borderNextButton};
  }
`;
