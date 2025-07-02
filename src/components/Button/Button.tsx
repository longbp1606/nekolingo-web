import React from 'react';
import { StyledButton } from './Button.styled';

export interface ButtonProps {
    title: string | JSX.Element;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    htmlType?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    title,
    color = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    htmlType,
    onClick,
    className,
    icon,
}) => {
    return (
        <StyledButton
            color={color}
            size={size}
            disabled={disabled}
            loading={loading}
            onClick={onClick}
            className={className}
            icon={icon}
            htmlType={htmlType}
        >
            {icon && <span className="button-icon">{icon}</span>}
            {title}
        </StyledButton>
    );
};

export default Button;