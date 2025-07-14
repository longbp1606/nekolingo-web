import React from 'react';
import { StepContainer } from './Onboarding.styled';
import { Divider, Flex, Image, Typography } from 'antd';
import RegisterImage from '@/assets/following.gif';
import Register from '@/pages/Auth/Register';

interface Step9Props {
  onNext: () => void;
}

const { Title } = Typography;

const Step9: React.FC<Step9Props> = ({ onNext }) => {
  const handleAllow = () => {
    // Kích hoạt thông báo nếu cần
    onNext();
  };

  return (
    <StepContainer>
      <Register />
    </StepContainer>
  );
};

export default Step9;
