import React, { useState } from 'react';
import { Step2Container, Step2ContentWrapper, CatAsk, CatImage, Footer, OptionGrid, OptionCard, FlagImage, ResultContent } from './Onboarding.styled';
import { useNavigate } from 'react-router-dom';
import NextButton from './NextButton/NextButton';

const Step10: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState<string | null>(null);

  const handleSelect = (src: string) => {
    if (src === 'home') {
      navigate('/');
    } else if (src === 'test') {
      navigate('/test');
    }
  };

  return (
    // <StepContainer>
    //   <h2>Giờ mình cùng tìm điểm khởi hành phù hợp nhé!</h2>
    //   <FinalButtonGroup>
    //     <ButtonLarge onClick={() => navigate('/')}>
    //       Đến trang Home
    //     </ButtonLarge>
    //     <ButtonLarge onClick={() => navigate('/test')}>
    //       Bài Test
    //     </ButtonLarge>
    //   </FinalButtonGroup>
    // </StepContainer>
    <Step2Container>
      <Step2ContentWrapper>
        <CatAsk>
          <CatImage src="/src/assets/cat-writing.png" alt="Languages" />
          <h2>Giờ mình cùng tìm điểm khởi hành phù hợp nhé!</h2>
        </CatAsk>
        <OptionGrid>
          <OptionCard
            onClick={() => setSelectedLink('home')}
            style={{ borderColor: selectedLink === 'home' ? '#00C2D1' : '#ddd' }}
          >
            <FlagImage src="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/9730040521a168519871561cbea6509e.svg" alt="English" />
            <ResultContent>
              <strong>Bắt đầu từ cơ bản</strong>
              <p>Học từ những bài dễ nhất trong khóa học Tiếng Anh</p>
            </ResultContent>
          </OptionCard>
          <OptionCard
            onClick={() => setSelectedLink('test')}
            style={{ borderColor: selectedLink === 'test' ? '#00C2D1' : '#ddd' }}
          >
            <FlagImage src="https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/03d40e9ad439925dfe47e8e77072318f.svg" alt="Japanese" />
            <ResultContent>
              <strong>Xác định trình độ hiện tại</strong>
              <p>Hãy để Neko giúp bạn xác định điểm khởi đầu phù hợp nhé</p>
            </ResultContent>
          </OptionCard>
        </OptionGrid>
      </Step2ContentWrapper>
      <Footer>
        <NextButton onClick={() => selectedLink && handleSelect(selectedLink)} />
      </Footer>
    </Step2Container>
  );
};

export default Step10;
