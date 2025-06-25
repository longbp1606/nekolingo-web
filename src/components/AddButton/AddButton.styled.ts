import { Button } from "antd";
import styled from "styled-components";
import { theme } from "@/themes";

export const StyledButton = styled(Button)`
  background: ${theme.color.primary};
  border-bottom: 5px solid ${theme.color.borderNextButton};
  color: white;
  border-radius: 20px;
  padding: 6px 24px; /* giảm chiều cao */
  font-size: 14px;
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
