import styled from "styled-components";
import { theme } from "@/themes";
import { transparentize } from "polished"; // Thêm hàm từ polished

export const SelectWrapper = styled.div`
  padding: 24px;
  text-align: center;
  height: 80%;
`;

export const Content = styled.div`
  width: 50%;
  margin: 0 auto 12px;
  height: 100%;
  align-content: center;
`;

export const SubTitle = styled.h4`
  max-width: 640px;
  margin-bottom: 20px;
  font-weight: 600;
  color: ${theme.color.tertiary};
`;

export const Question = styled.h2`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 8px;
  color: #3c3c3c;
  margin-bottom: 25px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;

  .option-card {
    flex: 1;
    background-color: #fff;
    border: 2px solid #dfe6e9;
    border-radius: 12px;
    padding: 16px;
    text-align: center;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
  }

  .option-card img {
    width: 150px;
    height: 150px;
    object-fit: contain;
    margin-bottom: 8px;
  }

  .option-card p {
    font-size: 16px;
    font-weight: 500;
    margin: 0;
  }

  .option-card:hover {
    background-color: #f1f2f6;
    border-color:  ${theme.color.primary};
  }

  .option-card.selected {
    background-color: ${transparentize(0.3, theme.color.lightPrimary)}; 
 border-color: ${theme.color.primary};
  }

  .option-number {
    // position: absolute;
    bottom: 8px;
    right: 12px;
    // background: #f1f2f6;
    border-radius: 5px;
    border: 1px solid #dfe6e9;
    padding: 3px 8px;
    font-size: 12px;
    font-weight: bold;
    color: #636e72;
  }
`;

export const MeanText = styled.h2`
  display: flex;
  justify-content: space-between;
`;
