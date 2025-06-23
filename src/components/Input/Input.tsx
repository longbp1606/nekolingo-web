import React from 'react';
import { StyledInput, StyledTextArea, InputWrapper, InputLabel, ErrorMessage, HelperText } from './Input.styled';

export interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url' | 'search';
    size?: 'small' | 'medium' | 'large';
    variant?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'quinary';
    disabled?: boolean;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    helperText?: string;
    multiline?: boolean;
    rows?: number;
    maxLength?: number;
    showCount?: boolean;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    className?: string;
    id?: string;
    name?: string;
    autoComplete?: string;
    autoFocus?: boolean;
}

const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    value,
    defaultValue,
    type = 'text',
    size = 'medium',
    variant = 'default',
    disabled = false,
    required = false,
    error = false,
    errorMessage,
    helperText,
    multiline = false,
    rows = 4,
    maxLength,
    showCount = false,
    prefix,
    suffix,
    onChange,
    onFocus,
    onBlur,
    onPressEnter,
    className,
    id,
    name,
    autoComplete,
    autoFocus,
}) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && onPressEnter) {
            onPressEnter(e);
        }
    };

    const inputProps = {
        placeholder,
        value,
        defaultValue,
        size,
        variant,
        disabled,
        required,
        error,
        maxLength,
        showCount,
        prefix,
        suffix,
        onChange,
        onFocus,
        onBlur,
        onKeyDown: handleKeyDown,
        className,
        id: id || name,
        name,
        autoComplete,
        autoFocus,
    };

    return (
        <InputWrapper className={className}>
            {label && (
                <InputLabel htmlFor={id || name} required={required} error={error}>
                    {label}
                </InputLabel>
            )}

            {multiline ? (
                <StyledTextArea
                    {...inputProps}
                    rows={rows}
                />
            ) : (
                <StyledInput
                    {...inputProps}
                    type={type}
                />
            )}

            {error && errorMessage && (
                <ErrorMessage>{errorMessage}</ErrorMessage>
            )}

            {!error && helperText && (
                <HelperText>{helperText}</HelperText>
            )}
        </InputWrapper>
    );
};

export default Input;