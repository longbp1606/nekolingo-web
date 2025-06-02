import React from 'react';
import {
  NekoImage,
  WelcomeText,
  Footer,
  Step2Container,
  Step2ContentWrapper,
} from './Onboarding.styled';
import NextButton from './NextButton/NextButton';

interface Step2Props {
  onNext: () => void;
}

const Step2: React.FC<Step2Props> = ({ onNext }) => {
  return (
    <Step2Container>
      <Step2ContentWrapper>
        <WelcomeText>Chào mừng bạn đến với Nekolingo!</WelcomeText>
        <NekoImage src="/src/assets/cat-hi.png" alt="Neko" />
      </Step2ContentWrapper>
      {/* <ButtonLarge onClick={onNext}>Tiếp tục</ButtonLarge> */}
      <Footer>
        <NextButton onClick={onNext} />
      </Footer>
    </Step2Container>
  );
};

export default Step2;
