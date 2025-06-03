import React from 'react';
import { StepContainer, OptionCard } from './Onboarding.styled';

interface Step9Props {
  onNext: () => void;
}

const Step9: React.FC<Step9Props> = ({ onNext }) => {
  const handleAllow = () => {
    // Kích hoạt thông báo nếu cần
    onNext();
  };

  return (
    <StepContainer>
      <h2>Tớ sẽ nhắc bạn để việc học trở thành thói quen!</h2>
      <OptionCard onClick={handleAllow}>Cho phép nhận thông báo</OptionCard>
    </StepContainer>
  );
};

export default Step9;
