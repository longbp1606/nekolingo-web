import React, { useState } from 'react';
import {
  Container,
  Header,
  BackButton,
  ContentWrapper,
} from './Onboarding.styled';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import Step7 from './Step7';
import Step8 from './Step8';
// import Step9 from './Step9';
import Step10 from './Step10';
import ProgressBar from './ProgressBar/ProgressBar';
import { FaChevronLeft } from 'react-icons/fa6';

const TOTAL_STEPS = 10;

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const goNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1 onNext={goNext} />; // Chọn cách đăng nhập 
      case 2:
        return <Step2 onNext={goNext} />; // Lời chào 
      case 3:
        return <Step3 onNext={(lang) => {
          setSelectedLanguage(lang);
          goNext();
        }} />; // Chọn ngôn ngữ 
      case 4:
        return <Step4 onNext={goNext} />; // Nguồn biết đến Nekolingo
      case 5:
        return <Step5 onNext={goNext} />; // Lý do học ngôn ngữ 
      case 6:
        return <Step6 onNext={goNext} />; // Hỏi trình độ tiếng Anh
      case 7:
        return <Step7 onNext={goNext} />; // Kết quả sau khi học
      case 8:
        return <Step8 onNext={goNext} />; // Học bao lâu mỗi ngày
      // case 9:
      //   return <Step9 onNext={goNext} />; // Cho phép bật thông báo
      case 9:
        return <Step10 />; // chọn Home hoặc Test
      default:
        return null;
    }
  };

  console.log('Selected Language:', selectedLanguage);

  return (
    <Container>
      <Header>
        {currentStep > 3 && (
          <BackButton onClick={goBack}><FaChevronLeft />
          </BackButton>
        )}
        {currentStep >= 4 && (
          <ProgressBar
            currentStep={currentStep - 3} // Progress bắt đầu từ step 4
            totalSteps={TOTAL_STEPS - 3}
          />
        )}
      </Header>

      <ContentWrapper>{renderStep()}</ContentWrapper>
{/* 
      <Footer>
        {currentStep >= 4 && currentStep < 10 && (
          <NextButton onClick={goNext} />
        )}
      </Footer> */}
    </Container>
  );
};

export default Onboarding;
