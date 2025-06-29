import { theme } from "@/themes";
import styled from "styled-components";

export const Wrapper = styled.div`
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

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
  color: ${theme.color.title};
`;

export const MatchArea = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 20px;
`;

export const LeftOption = styled.div`
width: 100%;
`;

export const RightOption = styled.div`
width: 100%;
`;
