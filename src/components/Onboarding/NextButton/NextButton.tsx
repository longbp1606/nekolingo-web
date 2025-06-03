import React from 'react';
import { Button } from './NextButton.styled';

interface NextButtonProps {
  onClick: () => void;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
  return <Button onClick={onClick}>Tiếp tục</Button>;
};

export default NextButton;
