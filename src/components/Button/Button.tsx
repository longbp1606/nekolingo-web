import React from 'react';
import { StyledButton } from './Button.styled';

export interface ButtonProps {
    title: string;
    color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
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
        >
            {icon && <span className="button-icon">{icon}</span>}
            {title}
        </StyledButton>
    );
};

export default Button;