import React from 'react';
import { CloseOutlined, HeartFilled } from '@ant-design/icons';
import { ProgressBarContainer, ProgressBarFill, ProgressBarWrapper, CloseButton, LivesContainer } from './ProgressBar.styled';
import { theme } from '@/themes';
import { useNavigate } from 'react-router-dom';

interface ProgressBarProps {
  totalQuestions: number;
  answeredQuestions: number;
  lives: number;
  onClose?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  totalQuestions,
  answeredQuestions,
  lives,
  onClose,
}) => {
  const percent = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  return (
    <ProgressBarWrapper>
      {onClose && (
        <CloseButton onClick={handleClose}>
          <CloseOutlined style={{ fontSize: '18px', color: '#666' }} />
        </CloseButton>
      )}

      <ProgressBarContainer>
        <ProgressBarFill percent={percent} />
      </ProgressBarContainer>

      <LivesContainer>
        <HeartFilled style={{ fontSize: '20px', color: theme.color.red }} />
        <span style={{ color: theme.color.red }}>{lives}</span>
      </LivesContainer>
    </ProgressBarWrapper>
  );
};

export default ProgressBar;
