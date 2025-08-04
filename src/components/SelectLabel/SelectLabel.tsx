import React, { useEffect, useState } from "react";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { SelectWithLabel } from "./SelectLabel.styled";

type MySelectProps = Pick<
  SelectProps,
  | "options"
  | "value"
  | "onChange"
  | "placeholder"
  | "disabled"
  | "style"
  | "showSearch"
  | "mode"
  | "className"
  | "defaultValue"
  | "allowClear"
  | "maxTagCount"
  | "maxTagPlaceholder"
> & {
  label?: string;
  activeLabelBgColor?: string;
};

const SelectLabel: React.FC<MySelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  allowClear,
  placeholder,
  disabled,
  style,
  showSearch,
  className,
  mode,
  label,
  maxTagCount,
  maxTagPlaceholder,
  activeLabelBgColor = "#fff",
}) => {
  const [isLabelFloating, setIsLabelFloating] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // setIsLabelFloating(!!value || value === null);
    setIsLabelFloating(value !== undefined && value !== "" && value !== null);
  }, [value]);

  return (
    <SelectWithLabel>
    <div
      className={`custom-select-container ${
        // isLabelFloating || defaultValue || isFocused ? "focused" : ""
        isLabelFloating || (defaultValue !== undefined && defaultValue !== "" && defaultValue !== null) || isFocused ? "focused" : ""
      } ${disabled ? "disabled" : ""}`}
    >
      {label && (
        <label
          className="floating-label"
          style={{
            ...(isFocused || isLabelFloating || disabled
              ? { background: activeLabelBgColor }
              : { background: "transparent" }),
          }}
        >
          {label}
        </label>
      )}
      <Select
        allowClear={allowClear}
        defaultValue={defaultValue}
        className={`custom-select ${className || ""}`}
        options={options}
        value={value}
        onChange={(val, option) => {
          onChange?.(val, option);
          // setIsLabelFloating(!!val || val === null);
          setIsLabelFloating(val !== undefined && val !== "" && val !== null);
        }}
        placeholder={placeholder}
        disabled={disabled}
        style={{ height: "36px", ...style }}
        showSearch={showSearch}
        mode={mode}
        optionFilterProp="label"
        maxTagCount={maxTagCount}
        maxTagPlaceholder={maxTagPlaceholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
    </SelectWithLabel>
  );
};

export default SelectLabel;
