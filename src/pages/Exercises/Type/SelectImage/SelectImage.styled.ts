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
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${theme.color.title};
  margin-bottom: 25px;
`;

export const OptionsContainer = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 16px;

  .option-card {
    flex: 1;
    background-color: #fff;
    border: 2px solid #e5e5e5;
    border-bottom: 5px solid #e5e5e5;
    border-radius: 10px;
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

  .option-card.correct {
  border: 3px solid ${theme.color.green} !important;
  background-color: ${theme.color.bgGreen} !important;
  border-bottom: 5px solid ${theme.color.green} !important;
}
.option-card.wrong {
 background-color: ${theme.color.bgRed} !important;
  border: 3px solid ${theme.color.red} !important;
  border-bottom: 5px solid ${theme.color.red} !important;
}

  .option-card.selected {
    background-color: ${transparentize(0.3, theme.color.lightPrimary)}; 
 border-color: ${theme.color.primary};
  }

  .option-number {
    bottom: 8px;
    right: 12px;
    border-radius: 5px;
    border: 1px solid #e5e5e5;
    padding: 3px 8px;
    font-size: 12px;
    font-weight: bold;
    color: ${theme.color.description};
  }
`;

export const MeanText = styled.h2`
  display: flex;
  justify-content: space-between;

  p {
  color: ${theme.color.title};
  font-size: 16px;
  }
`;
