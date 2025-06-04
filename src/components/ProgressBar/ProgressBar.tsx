import React, { useState } from 'react';
import { CloseOutlined, HeartFilled } from '@ant-design/icons';
import { ProgressBarContainer, ProgressBarFill, ProgressBarWrapper, CloseButton, LivesContainer } from './ProgressBar.styled';
import { theme } from '@/themes';
import ExitPopup from './ExitPopup/ExitPopup';
interface ProgressBarProps {
  totalQuestions: number;
  answeredQuestions: number;
  lives: number;
  onClose?: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalQuestions,
  answeredQuestions,
  lives,
  onClose,
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const percent = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;

  return (
    <>
      <ProgressBarWrapper>
        <CloseButton onClick={() => setShowPopup(true)}>
          <CloseOutlined style={{ fontSize: '18px', color: '#666' }} />
        </CloseButton>

        <ProgressBarContainer>
          <ProgressBarFill percent={percent} />
        </ProgressBarContainer>

        <LivesContainer>
          <HeartFilled style={{ fontSize: '20px', color: `${theme.color.red}` }} />
          <span style={{ color: `${theme.color.red}` }}>{lives}</span>
        </LivesContainer>
      </ProgressBarWrapper>
      {showPopup && (
        <ExitPopup
          onClose={onClose || (() => setShowPopup(false))}
          onContinue={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default ProgressBar;