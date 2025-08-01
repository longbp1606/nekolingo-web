import styled from 'styled-components';
import { Button as AntButton } from 'antd';
import { ButtonProps } from './Button';
import { theme } from '@/themes';

const colorMap = {
    primary: {
        background: theme.color.primary,
        border: '#009DA8',
        hover: '#1ACCDB',
        active: '#007A85',
        text: '#ffffff',
    },
    secondary: {
        background: theme.color.secondary,
        border: '#D4C400',
        hover: '#FBED1A',
        active: '#B8A600',
        text: '#000000',
    },
    tertiary: {
        background: theme.color.tertiary,
        border: '#D11A96',
        hover: '#F04DC6',
        active: '#B8147A',
        text: '#ffffff',
    },
    quaternary: {
        background: theme.color.quaternary,
        border: '#F39942',
        hover: '#F8C088',
        active: '#E8941F',
        text: '#ffffff',
    },
    quinary: {
        background: theme.color.quinary,
        border: '#060B2E',
        hover: '#1A2B6B',
        active: '#050921',
        text: '#ffffff',
    },
    // Additional utility colors
    success: {
        background: '#58cc02',
        border: '#46a302',
        hover: '#61d909',
        active: '#46a302',
        text: '#ffffff',
    },
    warning: {
        background: '#ffc800',
        border: '#d4a600',
        hover: '#ffcd1a',
        active: '#d4a600',
        text: '#ffffff',
    },
    danger: {
        background: '#ff4757',
        border: '#e84545',
        hover: '#ff6b7a',
        active: '#e84545',
        text: '#ffffff',
    },
};


const sizeMap = {
    small: {
        height: '36px',
        padding: '0 16px',
        fontSize: '14px',
        borderRadius: '12px',
    },
    medium: {
        height: '48px',
        padding: '0 24px',
        fontSize: '16px',
        borderRadius: '16px',
    },
    large: {
        height: '56px',
        padding: '0 32px',
        fontSize: '18px',
        borderRadius: '20px',
    },
};

export const StyledButton = styled(AntButton) <Omit<ButtonProps, 'title'>>`
  /* Base styles inspired by Duolingo */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 700;
  text-transform: none;
  letter-spacing: 0.5px;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  box-shadow: 0 4px 0 ${props => colorMap[props.color || 'primary'].border};
  transform: translateY(0);
  
  /* Size styles */
  height: ${props => sizeMap[props.size || 'medium'].height};
  padding: ${props => sizeMap[props.size || 'medium'].padding};
  font-size: ${props => sizeMap[props.size || 'medium'].fontSize};
  border-radius: ${props => sizeMap[props.size || 'medium'].borderRadius};
  
  /* Color styles */
  background: ${props => colorMap[props.color || 'primary'].background};
  color: ${props => colorMap[props.color || 'primary'].text};
  
  /* Icon styles */
  .button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  /* Hover effect */
  .ant-btn-variant-outlined&:hover:not(:disabled) {
    background: ${props => colorMap[props.color || 'primary'].hover};
    color: ${props => colorMap[props.color || 'primary'].text};
    transform: translateY(-1px);
    box-shadow: 0 5px 0 ${props => colorMap[props.color || 'primary'].border};
  }
  
  /* Active/pressed effect */
  &:active:not(:disabled),
  &.ant-btn-active:not(:disabled) {
    background: ${props => colorMap[props.color || 'primary'].active};
    color: ${props => colorMap[props.color || 'primary'].text};
    transform: translateY(2px);
    box-shadow: 0 2px 0 ${props => colorMap[props.color || 'primary'].border};
  }
  
  /* Focus styles */
  &:focus {
    outline: 2px solid ${props => colorMap[props.color || 'primary'].background}40;
    outline-offset: 2px;
  }
  
  /* Disabled styles */
  &:disabled,
  &.ant-btn-disabled {
    background: #e5e5e5;
    color: #afafaf;
    box-shadow: 0 4px 0 #d0d0d0;
    cursor: not-allowed;
    transform: translateY(0);
    
    &:hover {
      background: #e5e5e5;
      color: #afafaf;
      transform: translateY(0);
      box-shadow: 0 4px 0 #d0d0d0;
    }
  }
  
  /* Loading styles */
  &.ant-btn-loading {
    .ant-btn-loading-icon {
      color: ${props => colorMap[props.color || 'primary'].text};
    }
  }
  
  /* Remove default Ant Design styles */
  &.ant-btn {
    border: none;
    box-shadow: 0 4px 0 ${props => colorMap[props.color || 'primary'].border};
    
    &::before {
      display: none;
    }
    
    &:hover,
    &:focus,
    &:active {
      border: none;
    }
  }
  
  /* Responsive design */
  @media (max-width: 768px) {
    font-size: ${props => {
        const sizes = { small: '12px', medium: '14px', large: '16px' };
        return sizes[props.size || 'medium'];
    }};
    height: ${props => {
        const sizes = { small: '32px', medium: '44px', large: '52px' };
        return sizes[props.size || 'medium'];
    }};
  }
`;