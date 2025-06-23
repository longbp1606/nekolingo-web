import styled from 'styled-components';
import { Input as AntInput } from 'antd';
import { InputProps } from './Input';
import { theme } from '@/themes';

const { TextArea: AntTextArea } = AntInput;

type variantColorType = {
    [key: string]: {
        border: string;
        focus: string;
        background: string;
    }
}

const variantColorMap: variantColorType = {
    default: {
        border: '#e5e7eb',
        focus: theme.color.primary,
        background: '#ffffff',
    },
    primary: {
        border: '#e5e7eb',
        focus: theme.color.primary,
        background: '#ffffff',
    },
    secondary: {
        border: '#e5e7eb',
        focus: theme.color.primary,
        background: '#ffffff',
    },
    tertiary: {
        border: '#e5e7eb',
        focus: theme.color.tertiary,
        background: '#ffffff',
    },
    quaternary: {
        border: '#e5e7eb',
        focus: theme.color.quaternary,
        background: '#ffffff',
    },
    quinary: {
        border: '#e5e7eb',
        focus: theme.color.quinary,
        background: '#ffffff',
    },
};

type sizeType = {
    [key: string]: {
        height: string;
        padding: string;
        fontSize: string;
        borderRadius: string;
    }
}

const sizeMap: sizeType = {
    small: {
        height: '36px',
        padding: '8px 12px',
        fontSize: '14px',
        borderRadius: '12px',
    },
    medium: {
        height: '48px',
        padding: '12px 16px',
        fontSize: '16px',
        borderRadius: '16px',
    },
    large: {
        height: '56px',
        padding: '16px 20px',
        fontSize: '18px',
        borderRadius: '20px',
    },
};

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const InputLabel = styled.label<{ required?: boolean; error?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.error ? '#ef4444' : '#374151'};
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  ${props => props.required && `
    &::after {
      content: ' *';
      color: #ef4444;
    }
  `}
`;

const baseInputStyles = `
  /* Base Duolingo-inspired styles */
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  background: #ffffff;
  border: 2px solid #e5e7eb;
  outline: none;
  
  /* Remove Ant Design default styles */
  &.ant-input,
  &.ant-input-affix-wrapper,
  &.ant-input-textarea {
    box-shadow: none;
    border: 2px solid #e5e7eb;
    
    &:hover,
    &:focus,
    &.ant-input-focused,
    &.ant-input-affix-wrapper-focused {
      box-shadow: none;
      border-color: inherit;
    }
  }
  
  /* Placeholder styles */
  &::placeholder,
  .ant-input::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
  
  /* Focus styles */
  &:focus,
  &.ant-input-focused,
  &.ant-input-affix-wrapper-focused {
    border-color: ${(props: any) => variantColorMap[props.variant || 'default'].focus};
    background: #ffffff;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px ${(props: any) => variantColorMap[props.variant || 'default'].focus}20;
  }
  
  /* Hover styles */
  &:hover:not(:disabled):not(:focus) {
    border-color: #d1d5db;
  }
  
  /* Error styles */
  ${(props: any) => props.error && `
    border-color: #ef4444 !important;
    
    &:focus,
    &.ant-input-focused,
    &.ant-input-affix-wrapper-focused {
      border-color: #ef4444 !important;
      box-shadow: 0 4px 12px #ef444420;
    }
  `}
  
  /* Disabled styles */
  &:disabled,
  &.ant-input-disabled,
  &.ant-input-affix-wrapper-disabled {
    background: #f9fafb;
    border-color: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    
    &:hover {
      border-color: #e5e7eb;
    }
  }
  
  /* Size styles */
  height: ${(props: any) => sizeMap[props.size || 'medium'].height};
  padding: ${(props: any) => sizeMap[props.size || 'medium'].padding};
  font-size: ${(props: any) => sizeMap[props.size || 'medium'].fontSize};
  border-radius: ${(props: any) => sizeMap[props.size || 'medium'].borderRadius};
`;

export const StyledInput = styled(AntInput) <Omit<InputProps, 'label' | 'errorMessage' | 'helperText'>>`
  ${baseInputStyles}
  
  /* Prefix and suffix styles */
  &.ant-input-affix-wrapper {
    .ant-input-prefix,
    .ant-input-suffix {
      color: #6b7280;
    }
    
    .ant-input {
      background: transparent;
      border: none;
      padding: 0;
      font-size: inherit;
      font-weight: inherit;
      font-family: inherit;
      
      &:focus {
        box-shadow: none;
      }
    }
  }
`;

export const StyledTextArea = styled(AntTextArea) <Omit<InputProps, 'label' | 'errorMessage' | 'helperText' | 'type'>>`
  ${baseInputStyles}
  
  /* TextArea specific styles */
  min-height: auto;
  height: auto;
  padding: ${props => sizeMap[props.size || 'medium'].padding};
  line-height: 1.5;
  resize: vertical;
  
  /* Override height for textarea */
  &.ant-input {
    height: auto;
    min-height: ${props => {
        const baseHeight = parseInt(sizeMap[props.size || 'medium'].height);
        const rows = props.rows || 4;
        return `${baseHeight + (rows - 1) * 24}px`;
    }};
  }
  
  /* Show count styles */
  ${props => props.showCount && `
    &.ant-input-textarea-show-count::after {
      color: #6b7280;
      font-size: 12px;
      font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
  `}
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: #ef4444;
  font-weight: 500;
  margin-top: 4px;
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;

export const HelperText = styled.div`
  font-size: 12px;
  color: #6b7280;
  font-weight: 400;
  margin-top: 4px;
  font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`;