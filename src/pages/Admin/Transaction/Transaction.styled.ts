import { theme } from "@/themes";
import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const ContentCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const FilterArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const StatisticArea = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
`;

export const StatisticCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 18px;
    color: ${theme.color.textPrimary};
    font-weight: 700;
    margin-bottom: 0px;
  }

  p {
    font-size: 24px;
    color: #ffffff;
    font-weight: 800;
    margin: 0;
  }
`;