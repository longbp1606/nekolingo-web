import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StepContainer,
  IntroContainer,
  LeftImage,
  RightContent,
  TitleText,
  ButtonLarge,
  OutlinedButton,
} from './Onboarding.styled';

interface Step1Props {
  onNext: () => void;
}

const Step1: React.FC<Step1Props> = ({ onNext }) => {
  const navigate = useNavigate();

  return (
    <StepContainer>
      <IntroContainer>
        {/* Ảnh minh họa bên trái */}
        <LeftImage src="https://res.cloudinary.com/dzwfahgui/image/upload/v1753673338/cat-learning_vuacaw.png" alt="Nekolingo Intro" />

        {/* Nội dung bên phải */}
        <RightContent>
          <TitleText>
            Cách học ngôn ngữ miễn phí, vui nhộn và hiệu quả!
          </TitleText>
          <ButtonLarge onClick={onNext}>Bắt đầu</ButtonLarge>
          <OutlinedButton onClick={() => navigate('/login')}>
            Tôi đã có tài khoản
          </OutlinedButton>
        </RightContent>
      </IntroContainer>

      {/* Footer chọn ngôn ngữ kiểu Duolingo */}
      {/* <FooterLangSelector>
        <LangButton>Tiếng Anh</LangButton>
        <LangButton>Tiếng Hoa</LangButton>
      </FooterLangSelector> */}
    </StepContainer>
  );
};

export default Step1;
