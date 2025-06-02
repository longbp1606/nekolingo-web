import React from 'react';
import { Step2Container, Step2ContentWrapper, CatAsk, CatImage, Footer, ResultList, ResultItem, FlagImage, ResultContent } from './Onboarding.styled';
import NextButton from './NextButton/NextButton';

interface Step7Props {
  onNext: () => void;
}

const Step7: React.FC<Step7Props> = ({ onNext }) => {
  // Giả sử các kết quả tĩnh
  const results = [
    {
      img: 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/958e9a5aac8a0aeb099e08c28e327de7.svg',
      title: 'Tự tin giao tiếp',
      desc: 'Các bài học nói và nghe không hề áp lực',
    },
    {
      img: 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/bc1008ae41c90c9b1a6f63bb9e142f7f.svg',
      title: 'Kho từ vựng đa dạng',
      desc: 'Các từ vựng phổ biến và cụm từ thiết thực',
    },
    {
      img: 'https://d35aaqx5ub95lt.cloudfront.net/images/funboarding/3757137c3beb1fbf0bfe21fdf9254023.svg',
      title: 'Tạo thói quen học tập',
      desc: 'Nhắc nhở thông minh, thử thách vui nhộn',
    },
  ];

  return (
    <Step2Container>
      <Step2ContentWrapper>
        <CatAsk>
          <CatImage src="/src/assets/cat-writing.png" alt="Languages" />
          <h2>Và đây là những thành quả bạn sẽ có thể đạt được!</h2>
        </CatAsk>
        <ResultList>
          {results.map((r, idx) => (
            <ResultItem key={idx}>
              <FlagImage src={r.img} alt="Result" />
              <ResultContent>
                <strong>{r.title}</strong>
                <p>{r.desc}</p>
              </ResultContent>
            </ResultItem>
          ))}
        </ResultList>
      </Step2ContentWrapper>
      <Footer>
        <NextButton onClick={() => onNext()} />
      </Footer>
    </Step2Container>
  );
};

export default Step7;
