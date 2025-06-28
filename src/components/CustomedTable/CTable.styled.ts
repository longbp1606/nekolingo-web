import { theme } from "@/themes";
import styled from "styled-components";

export const TableArea = styled.span`
color: ${theme.color.primary};
  opacity: 0.8;
  font-weight: 600;
  width: 100%;

  .ant-table-cell {
     .even-row {
    background-color: #fafafa;
  }
  
  .odd-row {
    background-color: #ffffff;
  }
  
  .selected-row {
    background-color: #f9e900 !important;
  }
  }
`;

  export const CustomTableTitle = styled.span`
  color: ${theme.color.primary};
    opacity: 0.8;
    font-weight: 600;
    width: 100%;

    .ant-table-cell {
       textAlign: center !important;
    }
  `;

  
  
  