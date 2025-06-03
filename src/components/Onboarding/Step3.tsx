import React, { useState } from 'react';
import { OptionGrid, OptionCard, Footer, Step2Container, Step2ContentWrapper, FlagImage, CatImage, CatAsk } from './Onboarding.styled';
import NextButton from './NextButton/NextButton';

interface Step3Props {
  onNext: (language: string) => void;
}

const Step3: React.FC<Step3Props> = ({ onNext }) => {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
  };

  return (
    <Step2Container>
      <Step2ContentWrapper>
        <CatAsk>
          <CatImage src="/src/assets/cat-writing.png" alt="Languages" />
          <h2>Bạn muốn học ngôn ngữ nào?</h2>
        </CatAsk>
        <OptionGrid>
          <OptionCard
            onClick={() => handleSelect('english')}
            style={{ borderColor: selectedLang === 'english' ? '#00C2D1' : '#ddd' }}
          >
            <FlagImage src="/src/assets/flag/united-states.png" alt="English" />
            Tiếng Anh
          </OptionCard>
          <OptionCard
            onClick={() => handleSelect('japanese')}
            style={{ borderColor: selectedLang === 'japanese' ? '#00C2D1' : '#ddd' }}
          >
            <FlagImage src="/src/assets/flag/japan.png" alt="Japanese" />
            Tiếng Nhật
          </OptionCard>
          <OptionCard
            onClick={() => handleSelect('korean')}
            style={{ borderColor: selectedLang === 'korean' ? '#00C2D1' : '#ddd' }}
          >
            <FlagImage src="/src/assets/flag/south-korea.png" alt="Korean" />
            Tiếng Hàn
          </OptionCard>
        </OptionGrid>
      </Step2ContentWrapper>
      <Footer>
        <NextButton onClick={() => selectedLang && onNext(selectedLang)} />
      </Footer>
    </Step2Container>
  );
};

export default Step3;
