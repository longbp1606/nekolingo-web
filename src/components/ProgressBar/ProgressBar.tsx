import React from 'react';
import { ProgressBarContainer, ProgressBarFill } from './ProgressBar.styled';

interface ProgressBarProps {
  totalQuestions: number;
  answeredQuestions: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalQuestions,
  answeredQuestions,
}) => {
  const percent = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  return (
    <>
      {/* <ProgressText>
        {answeredQuestions} / {totalQuestions} câu đã hoàn thành
      </ProgressText> */}
      <ProgressBarContainer>
        <ProgressBarFill percent={percent} />
      </ProgressBarContainer>
    </>
  );
};

export default ProgressBar;
