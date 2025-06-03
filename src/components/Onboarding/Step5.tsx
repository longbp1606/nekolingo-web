import React, { useState } from 'react';
import { OptionCard, Step2Container, Step2ContentWrapper, CatAsk, CatImage, OptionGridSrc, FlagImage, Footer } from './Onboarding.styled';
import NextButton from './NextButton/NextButton';

interface Step5Props {
  onNext: (reason: string) => void;
}

const reasons = [
  'Hỗ trợ việc học tập',
  'Kết nối với mọi người',
  'Sử dụng thời gian hiệu quả',
  'Phát triển sự nghiệp',
  'Chuẩn bị đi du lịch',
  'Giải trí',
  'Khác',
];

const imageMap: { [key: string]: string } = {
  'Hỗ trợ việc học tập': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/d7315c6c7bbeba67df5ebda771d33da1.svg',
  'Kết nối với mọi người': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/484f1c9610935dd40094a9f7cf06e009.svg',
  'Sử dụng thời gian hiệu quả': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/f382d7a1e1a958dc07fca0deae2d16b7.svg',
  'Phát triển sự nghiệp': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/61a06f02b3b988d1c388d484bc0e52e6.svg',
  'Chuẩn bị đi du lịch': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/5bbfb55fd21e21012a228bcef29bb557.svg',
  'Giải trí': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/ab81d610a8a79f174a4db0a6085e7e2c.svg',
  'Khác': 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/0e2332e8d4074ed5db4ca9152ffd0d25.svg',
};

const Step5: React.FC<Step5Props> = ({ onNext }) => {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleSelect = (reason: string) => {
    setSelectedReason(reason);
  };

  return (
    <Step2Container>
      <Step2ContentWrapper>
        <CatAsk>
          <CatImage src="/src/assets/cat-writing.png" alt="Languages" />
          <h2>Tại sao bạn học ngôn ngữ đó?</h2>
        </CatAsk>
        <OptionGridSrc>
          {reasons.map((reason) => {
            const key = reason.toLowerCase().replace(/[^a-z]/g, ''); // normalize key like 'youtube'
            return (
              <OptionCard
                key={reason}
                onClick={() => handleSelect(key)}
                style={{ borderColor: selectedReason === key ? '#00C2D1' : '#ddd' }}
              >
                <FlagImage src={imageMap[reason]} alt={reason} />
                {reason}
              </OptionCard>
            );
          })}
        </OptionGridSrc>
      </Step2ContentWrapper>
      <Footer>
        <NextButton onClick={() => selectedReason && onNext(selectedReason)} />
      </Footer>
    </Step2Container>
  );
};

export default Step5;
