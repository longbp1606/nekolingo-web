// import { theme } from "@/themes";
import { theme } from "@/themes";
import { Button, Row } from "antd";
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



// ------------------- ADD EXERCISE -------------------

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  min-height: 100vh;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
  }
`;

export const BackButton = styled(Button)`
  width: max-content;
  background: ${theme.color.primary};
    border-bottom: 5px solid ${theme.color.borderNextButton};
    color: white;
    border-radius: 10px;
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

export const LessonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
  padding-top: 12px;
`;

export const TypeGrid = styled(LessonGrid)`
  background-color: #fff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

export const SlideList = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const SlideItem = styled.div<{ active?: boolean }>`
  flex: 1;
  padding: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  border: ${props => (props.active ? '2px solid #1890ff' : 'none')};
`;

export const EditorArea = styled.div`
  margin-top: 24px;
  background: #ffffff;
  padding: 32px;
  border-radius: 12px;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);

  textarea,
  input,
  .ant-select {
    font-size: 14px;
  }

  .ant-input,
  .ant-input-affix-wrapper {
    border-radius: 8px;
  }

  .ant-space {
    width: 100%;
  }

  button {
    margin-top: 24px;
    width: 100%;
    height: 40px;
    font-weight: 600;
    border-radius: 8px;
  }
`;

export const BottomControls = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 32px;
`;

export const ExerciseGrid = styled(Row)`
  margin-top: 24px;

  .ant-card {
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
      transform: translateY(-4px);
    }

    .ant-card-body {
      text-align: center;
      font-weight: 500;
    }
  }
`;
