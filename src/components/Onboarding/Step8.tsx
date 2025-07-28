import React, { useState } from 'react';
import { OptionGrid, Step2Container, Step2ContentWrapper, CatAsk, CatImage, GoalCard, Footer } from './Onboarding.styled';
import NextButton from './NextButton/NextButton';

interface Step8Props {
  onNext: (t: string) => void;
}

const times = [
  {
    time: '5 phút / ngày',
    rank: 'Dễ',
    words: '25 từ / tuần',
  },
  {
    time: '10 phút / ngày',
    rank: 'Vừa',
    words: '50 từ / tuần',
  },
  {
    time: '15 phút / ngày',
    rank: 'Khó',
    words: '75 từ / tuần',
  },
  {
    time: '20 phút / ngày',
    rank: 'Siêu khó',
    words: '100 từ / tuần',
  },
];


const Step8: React.FC<Step8Props> = ({ onNext }) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const handleSelect = (t: string) => {
    setSelectedTime(t);
  };

  return (
    <Step2Container>
      <Step2ContentWrapper>
        <CatAsk>
          <CatImage src="https://res.cloudinary.com/dzwfahgui/image/upload/v1753673472/cat-writing_oshf5l.png" alt="Languages" />
          <h2>Mục tiêu học hằng ngày của bạn là gì?</h2>
        </CatAsk>
        <OptionGrid>
          {times.map((t, idx) => {
            const key = t.rank.toLowerCase().replace(/[^a-z]/g, ''); // normalize key like 'youtube'
            return (
              <GoalCard
                key={idx}
                onClick={() => handleSelect(key)}
                style={{ borderColor: selectedTime === key ? '#00C2D1' : '#ddd' }}
              >
                <span>{t.time}</span>
                <span>{t.rank}</span>
                <span>{t.words}</span>
              </GoalCard>
            );
          })}
        </OptionGrid>
      </Step2ContentWrapper>
      <Footer>
        <NextButton onClick={() => selectedTime && onNext(selectedTime)} />
      </Footer>
    </Step2Container>
  );
};

export default Step8;
