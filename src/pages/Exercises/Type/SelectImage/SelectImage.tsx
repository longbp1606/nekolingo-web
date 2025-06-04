import React, { useState } from 'react';
import {
  Content,
  MeanText,
  OptionsContainer,
  Question,
  SelectWrapper,
  SubTitle,
} from './SelectImage.styled';
import ProgressBar from '@/components/ProgressBar';
import BottomBar from '@/components/BottomBar/BottomBar';

interface Option {
  label: string;
  image: string;
  value: string;
}

const options: Option[] = [
  {
    label: 'milk',
    image:
      'https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fmilk.png?alt=media&token=9fbdcc66-ed60-435d-a213-b252e5546e26',
    value: 'milk',
  },
  {
    label: 'tea',
    image:
      'https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Ftea.png?alt=media&token=ae8c05e7-ee1b-4b82-a099-61916187102b',
    value: 'tea',
  },
  {
    label: 'coffee',
    image:
      'https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fcoffee-cup.png?alt=media&token=ed69ac36-cbb8-4930-afef-56617715aaa3',
    value: 'coffee',
  },
];

const correctAnswerIndex = 1; // “tea” là đáp án đúng (index = 1)

const SelectImage: React.FC = () => {
  // Lưu label (hoặc value) đang được chọn, để highlight hiệu ứng “selected”
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  // Lưu chỉ số (index) vừa được chọn, để check đúng/sai khi bấm “KIỂM TRA”
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const [answered, setAnswered] = useState(0); // Progress
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Khi bấm “KIỂM TRA”
  const handleCheck = () => {
    if (selectedIndex === null) return; // Chưa chọn gì thì không làm gì

    const correct = selectedIndex === correctAnswerIndex;
    setIsCorrect(correct);
    setIsChecked(true);
    setAnswered((prev) => prev + 1);
  };

  // Khi bấm “BỎ QUA” hoặc “TIẾP TỤC” (reset chọn và feedback)
  const handleReset = () => {
    setSelectedValue(null);
    setSelectedIndex(null);
    setIsChecked(false);
    setIsCorrect(false);
  };

  // Khi user click vào một option bất kỳ:
  // - setSelectedValue để highlight border
  // - setSelectedIndex luôn = idx (để có thể check đúng/sai)
  const handleOptionClick = (optValue: string, idx: number) => {
    if (isChecked) return; // Nếu đã check rồi thì không cho chọn thêm
    setSelectedValue(optValue);
    setSelectedIndex(idx);
  };

  return (
    <SelectWrapper>
      {/* <ProgressBar totalQuestions={2} answeredQuestions={answered} /> */}

      <Content>
        <SubTitle>TỪ VỰNG MỚI</SubTitle>
        <Question>Đâu là "trà"?</Question>

        <OptionsContainer>
          {options.map((opt, idx) => {
            // Nếu đã check và idx === correctAnswerIndex → tô xanh (nếu muốn) 
            // Nếu đã check và idx === selectedIndex && !isCorrect → tô đỏ (nếu muốn)
            // Ở đây mình giữ highlight “selected” trước khi check,
            // có thể bổ sung thêm class “correct” / “wrong” nếu muốn style.
            const isSelected = selectedValue === opt.value;

            return (
              <div
                key={idx}
                className={`
                  option-card 
                  ${isSelected ? 'selected' : ''} 
                  ${isChecked && idx === correctAnswerIndex ? 'correct' : ''} 
                  ${isChecked && idx === selectedIndex && !isCorrect ? 'wrong' : ''}
                `}
                onClick={() => handleOptionClick(opt.value, idx)}
              >
                <img src={opt.image} alt={opt.label} />
                <MeanText>
                  <p>{opt.label}</p>
                  <span className="option-number">{idx + 1}</span>
                </MeanText>
              </div>
            );
          })}
        </OptionsContainer>
      </Content>

      <BottomBar
        isChecked={isChecked}
        isCorrect={isCorrect}
        selectedIndex={selectedIndex}
        handleCheck={handleCheck}
        handleReset={handleReset}
      />
    </SelectWrapper>
  );
};

export default SelectImage;
