import React, { useState } from 'react';
import { OptionCard, Step2Container, Step2ContentWrapper, CatAsk, CatImage, FlagImage, Footer, OptionGridSrc } from './Onboarding.styled';
import NextButton from './NextButton/NextButton';

interface Step4Props {
  onNext: (src: string) => void;
}

const sources = [
  'YouTube',
  'Tin tức/Báo chí/Blog',
  'Facebook/Instagram',
  'TikTok',
  'Tìm kiếm Google',
  'Bạn bè/Gia đình',
  'TV',
  'Khác',
];

const imageMap: { [key: string]: string } = {
  'YouTube': 'https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/5ae4d4bc2af930b5bc002b5d0b7cbad7.svg',
  'Tin tức/Báo chí/Blog': 'https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/0d0c3c81ccd1fd2ea84371e6bf4546b3.svg',
  'Facebook/Instagram': 'https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/9eb3a5707704c76b653a5e85fbf9ca0e.svg',
  'TikTok': 'https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/f2969a78ee365da5e7676dc6afd8c1b4.svg',
  'Tìm kiếm Google': 'https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/8e3f5e058dd4dd5eb43646c2d1f19b3c.svg',
  'Bạn bè/Gia đình': 'https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/947546a876aaea3a9811abf4cca1b618.svg',
  'TV': 'https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/b2a0faf7b835cf2ab9a75afe033fdad9.svg',
  'Khác': 'https://d35aaqx5ub95lt.cloudfront.net/images/hdyhau/d4419d84cb57b1295591e05cd60e45fb.svg',
};


const Step4: React.FC<Step4Props> = ({ onNext }) => {
  const [selectedSrc, setSelectedSrc] = useState<string | null>(null);

  const handleSelect = (src: string) => {
    setSelectedSrc(src);
  };

  return (
    <Step2Container>
      <Step2ContentWrapper>
        <CatAsk>
          <CatImage src="/src/assets/cat-writing.png" alt="Languages" />
          <h2>Bạn biết đến Nekolingo từ đâu?</h2>
        </CatAsk>
        <OptionGridSrc>
          {sources.map((src) => {
            const key = src.toLowerCase().replace(/[^a-z]/g, ''); // normalize key like 'youtube'
            return (
              <OptionCard
                key={src}
                onClick={() => handleSelect(key)}
                style={{ borderColor: selectedSrc === key ? '#00C2D1' : '#ddd' }}
              >
                <FlagImage src={imageMap[src]} alt={src} />
                {src}
              </OptionCard>
            );
          })}
        </OptionGridSrc>
      </Step2ContentWrapper>
      <Footer>
        <NextButton onClick={() => selectedSrc && onNext(selectedSrc)} />
      </Footer>
    </Step2Container>
  );
};

export default Step4;
