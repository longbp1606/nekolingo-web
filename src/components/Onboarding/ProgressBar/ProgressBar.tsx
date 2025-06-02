import React from 'react';
import { BarContainer, BarFill } from './ProgressBar.styled';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const percentage = (currentStep / totalSteps) * 100;
  return (
    <BarContainer>
      <BarFill style={{ width: `${percentage}%` }} />
    </BarContainer>
  );
};

export default ProgressBar;
