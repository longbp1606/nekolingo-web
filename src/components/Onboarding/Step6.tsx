import React, { useState } from 'react';
import { OptionGrid, OptionCard, Step2Container, Step2ContentWrapper, CatAsk, CatImage, Footer, FlagImage } from './Onboarding.styled';
import NextButton from './NextButton/NextButton';
import { useDispatch } from 'react-redux';
import { setLevel } from '@/store/register.slice';

interface Step6Props {
  onNext: (lvl: string) => void;
}

const levels = [
  'Tôi mới học Tiếng Anh',
  'Tôi biết một vài từ thông dụng',
  'Tôi có thể giao tiếp cơ bản',
  'Tôi có thể nói về nhiều chủ đề',
  'Tôi có thể thảo luận sâu về hầu hết các chủ đề',
];

const imageMap: { [key: string]: string } = {
  'Tôi mới học Tiếng Anh': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/5f3f4451d9b4ceb393aa44aa3b44f8ff.svg',
  'Tôi biết một vài từ thông dụng': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/06f993f9019fb13ce4741ba9fe2cfb41.svg',
  'Tôi có thể giao tiếp cơ bản': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/42a5b255caeca300ca1a80bb69f5bb16.svg',
  'Tôi có thể nói về nhiều chủ đề': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/c428ae5ee9c14e872d59ae26543c6fda.svg',
  'Tôi có thể thảo luận sâu về hầu hết các chủ đề': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/cd5dbf897151b9edc42919324382e4b7.svg',
};

const Step6: React.FC<Step6Props> = ({ onNext }) => {
  const dispatch = useDispatch();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  const handleSelect = (lvl: number) => {
    setSelectedLevel(lvl);
  };

  return (
    <Step2Container>
      <Step2ContentWrapper>
        <CatAsk>
          <CatImage src="https://res.cloudinary.com/dzwfahgui/image/upload/v1753673472/cat-writing_oshf5l.png" alt="Languages" />
          <h2>Trình độ tiếng Anh của bạn ở mức nào?</h2>
        </CatAsk>
        <OptionGrid>
          {levels.map((lvl, index) => {
            // const key = lvl.toLowerCase().replace(/[^a-z]/g, ''); 
            return (
              <OptionCard
                key={lvl}
                onClick={() => handleSelect(index)}
                style={{ borderColor: selectedLevel === index ? '#00C2D1' : '#ddd' }}
              >
                <FlagImage src={imageMap[lvl]} alt={lvl} />
                {lvl}
              </OptionCard>
            );
          })}
        </OptionGrid>
      </Step2ContentWrapper>
      <Footer>
        <NextButton onClick={() => {
          dispatch(setLevel(selectedLevel));
          onNext('');
        }} />
      </Footer>
    </Step2Container>
  );
};

export default Step6;
