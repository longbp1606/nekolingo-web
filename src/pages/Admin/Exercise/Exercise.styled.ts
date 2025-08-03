// import { theme } from "@/themes";
import { theme } from "@/themes";
import { Button, Input, Row } from "antd";
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
  min-height: calc(100vh - 144px);
  width: 100%;
  overflow: auto;

  .ant-steps .ant-steps-item-process .ant-steps-item-icon {
    background-color: ${theme.color.primary};
    border-color: ${theme.color.primary};
  }

  :where(.css-dev-only-do-not-override-5uvb3z).ant-steps
    .ant-steps-item-finish
    .ant-steps-item-icon
    > .ant-steps-icon {
    color: ${theme.color.primary};
  }

  .ant-card .ant-card-body {
    padding: 13px !important;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
`;

export const MidHeader = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
  gap: 6px;

  h2 {
    font-size: 24px;
    font-weight: 600;
    color: #1f2937;
    margin: 0;
    width: 100%;
    text-align: center;
  }
`;

export const ContentBody = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
`;

export const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  text-align: center;
  gap: 20px;
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
  max-width: max-content;

  &:hover {
    background: #2fdfec;
    color: #ffffff;
    border-left: 1px solid #2fdfec;
    border-top: 1px solid #2fdfec;
    border-right: 1px solid #2fdfec;
    border-bottom: 5px solid ${theme.color.borderNextButton};
  }
`;

export const NextButton = styled(Button)`
  width: max-content;
  background: ${theme.color.green};
  border-bottom: 5px solid ${theme.color.darkGreen};
  color: white;
  border-radius: 10px;
  padding: 6px 24px; /* giảm chiều cao */
  font-size: 14px;
  cursor: pointer;
  max-width: max-content;

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

  .ant-col-6 {
    max-width: 100% !important;
  }
`;

export const TypeGrid = styled(LessonGrid)`
  background-color: #fafafa;
  padding: 24px;
  border-radius: 12px;

  .ant-card {
    background: #fff;
    border: 2px solid ${theme.color.primary};
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: all 0.2s;

    &:hover {
      border-color: #40a9ff;
      background: #e6f7ff;
    }

    &.ant-card-hoverable[style*="background-color: #e6f7ff"] {
      /* khi được chọn */
      border-color: #1890ff;
      background: #bae7ff;
    }
  }
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
  border: ${(props) => (props.active ? "2px solid #1890ff" : "none")};
`;

export const EditorArea = styled.div`
  // margin-top: 24px;
  padding: 32px;
  border-radius: 12px;
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  // box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);

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
    width: 100%;
    height: 40px;
    font-weight: 600;
    border-radius: 8px;
  }

  .ant-col-6 {
    max-width: 100% !important;
  }

  .ant-space-item {
    width: 100%; 
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

  .ant-col-6 {
    display: flex;
    justify-content: center;
  }

  .ant-card {
    width: 100%;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    transition: transform 0.2s, box-shadow 0.2s;
    cursor: pointer;
    padding: 16px;
    text-align: center;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 24px rgba(0,0,0,0.08);
    }

    .ant-card-body {
      padding: 0;
      font-size: 14px;
      font-weight: 500;
      color: #333;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const ExerciseArea = styled.div`
  margin-top: 24px;
`;

export const ActionButton = styled.div<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const OptionInput = styled(Input)`
  width: 100%;
`;
