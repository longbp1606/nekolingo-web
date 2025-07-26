import React from 'react';
import { StepContainer } from './Onboarding.styled';
// import RegisterImage from '@/assets/following.gif';
import Register from '@/pages/Auth/Register';

interface Step9Props {
  onNext: () => void;
}

const Step9: React.FC<Step9Props> = () => {
  return (
    <StepContainer>
      <Register />
    </StepContainer>
  );
};

export default Step9;
