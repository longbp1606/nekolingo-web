import React, { useState, useEffect } from "react";
import { Input, InputProps } from "antd";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { InputWithLabel, InputWrapper } from "./InputLabel.styled";

interface InputWithLabelProps extends InputProps {
  label: string;
  defaultValue?: string;
  value?: string; // Thêm thuộc tính value
  disabled?: boolean; // Check if disabled to handle that case
  type?: "text" | "number" | "password";
  activeLabelBgColor?: string; // New prop for label background color
}

const InputLabel: React.FC<InputWithLabelProps> = ({
  label,
  defaultValue,
  value,
  onChange,
  disabled,
  type = "text",
  activeLabelBgColor = "#fff", // Default white background
  ...inputProps
}) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [inputValue, setInputValue] = useState<string | undefined>(
    value || defaultValue
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Cập nhật inputValue khi value thay đổi
    if (value !== undefined) {
      setInputValue(value);
    }
  }, [defaultValue, value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (type === "number") {
      value = value.replace(/[^0-9]/g, "");
    }
    setInputValue(value);
    if (onChange) {
      onChange({
        ...e,
        target: { ...e.target, value },
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputWithLabel>
      <InputWrapper>
        <Input
          {...inputProps}
          value={inputValue}
          disabled={disabled}
          onChange={handleInputChange}
          onFocus={() => setHasFocus(true)}
          onBlur={() => setHasFocus(false)}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="input-field"
        />
        {type === "password" && (
          <div
            onClick={toggleShowPassword}
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        )}
        <div
          className={`label
    ${
      hasFocus ||
      (inputValue !== undefined && inputValue !== "") ||
      (defaultValue !== undefined && defaultValue !== "") ||
      disabled
        ? "active"
        : ""
    }
    ${disabled ? "disabled" : ""}`}
          style={{
            // Add inline style to override background color when active
            ...(hasFocus ||
            (inputValue !== undefined && inputValue !== "") ||
            (defaultValue !== undefined && defaultValue !== "") ||
            disabled
              ? { background: activeLabelBgColor }
              : {}),
          }}
        >
          <div className="label-text">{label}</div>
        </div>
      </InputWrapper>
    </InputWithLabel>
  );
};

export default InputLabel;
