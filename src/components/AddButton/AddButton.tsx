import React from 'react';
import { Button } from 'antd';
import type { ButtonProps } from 'antd';
import styled from 'styled-components';
import { theme } from "@/themes";

const StyledButton = styled(Button).attrs({ type: 'primary' })`
  && {
    background: ${theme.color.primary};
    border-bottom: 5px solid ${theme.color.borderNextButton};
    color: white;
    border-radius: 10px;
    padding: 6px 24px; 
    font-size: 14px;
    cursor: pointer;
  }

  &&:hover {
    background: #2fdfec !important;
    color: #ffffff !important;
    border-left: 1px solid #2fdfec;
    border-top: 1px solid #2fdfec;
    border-right: 1px solid #2fdfec;
    border-bottom: 5px solid ${theme.color.borderNextButton};
  }

  /* Disabled state */
  &&:disabled,
  &&.ant-btn-disabled {
    background: rgba(0, 0, 0, 0.25) !important;
    border-left: rgba(0, 0, 0, 0.25) !important;
    border-top: rgba(0, 0, 0, 0.25) !important;
    border-right: rgba(0, 0, 0, 0.25) !important;
    border-color: rgba(0, 0, 0, 0.25) !important;
    color: rgba(255, 255, 255, 0.65) !important;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const CAddButton: React.FC<ButtonProps> = (props) => (
  <StyledButton {...props} />
);

export default CAddButton;
