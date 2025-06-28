// components/InputSearch.tsx
import React from "react";
import { Input } from "antd";
import type { InputProps } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

interface InputSearchProps extends Omit<InputProps, "onChange"> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputSearch: React.FC<InputSearchProps> = ({ onChange, ...rest }) => (
  <Input
    allowClear
    onChange={onChange}
    style={{ width: 240, marginBottom: 16 }}
    prefix={<AiOutlineSearch style={{ color: "#00C2D1" }} />}
    {...rest}
  />
);

export default InputSearch;
