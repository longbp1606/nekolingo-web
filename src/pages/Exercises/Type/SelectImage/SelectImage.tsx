import React, { useEffect, useState } from "react";
import {
  Content,
  MeanText,
  OptionsContainer,
  Question,
  SelectWrapper,
} from "./SelectImage.styled";
import ProgressBar from "@/components/ProgressBar";
import BottomBar from "@/components/BottomBar/BottomBar";
import GameOver from "@/components/ProgressBar/GameOver/GameOver";

interface Option {
  label: string;
  image_url: string;
  value: string;
}

interface SelectImageProps {
  data: {
    prompt: string;
    options: Option[];
    answer: string;
  };
  totalQuestions: number;
  answeredQuestions: number;
  onAnswered: (correct: boolean) => void;
}

const SelectImage: React.FC<SelectImageProps> = ({
  data,
  totalQuestions,
  answeredQuestions,
  onAnswered,
}) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lives, setLives] = useState(3);
  const [showGameOver, setShowGameOver] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const correctAnswer = data.answer;
  const options = data.options;

  useEffect(() => {
    if (lives === 0) setShowGameOver(true);
  }, [lives]);

  const handleCheck = () => {
    if (selectedIndex === null) return;

    const selectedOpt = options[selectedIndex];
    const correct = selectedOpt.value.toLowerCase() === correctAnswer.toLowerCase();

    setIsCorrect(correct);
    setIsChecked(true);

    // onAnswered(correct);
    // handleReset();
    if (!correct) setLives((prev) => prev - 1);

  };

  const handleNext = () => {
    onAnswered(isCorrect); // thông báo lên cha là câu này đã trả lời
    handleReset();
  };

  const handleReset = () => {
    setSelectedValue(null);
    setSelectedIndex(null);
    setIsChecked(false);
    setIsCorrect(false);
  };

  const handleOptionClick = (optValue: string, idx: number) => {
    if (isChecked) return;
    setSelectedValue(optValue);
    setSelectedIndex(idx);
  };

  return (
    <SelectWrapper>
      {showGameOver && (
        <GameOver
          onCancel={() => setShowGameOver(false)}
          onRecover={() => {
            setLives(1);
            setShowGameOver(false);
          }}
        />
      )}
      <ProgressBar
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        lives={lives}
        onClose
      />
      <Content>
        <Question>{data.prompt}</Question>
        <OptionsContainer>
          {options.map((opt, idx) => {
            const isSelected = selectedValue === opt.value;
            const isAnswerCorrect = opt.value === correctAnswer;

            return (
              <div
                key={idx}
                className={`
                  option-card 
                  ${isSelected ? "selected" : ""}
                  ${isChecked && isAnswerCorrect ? "correct" : ""}
                  ${isChecked &&
                    selectedIndex === idx &&
                    opt.value !== correctAnswer
                    ? "wrong"
                    : ""
                  }
                `}
                onClick={() => handleOptionClick(opt.value, idx)}
              >
                <img src={opt.image_url} alt={opt.label} />
                <MeanText>
                  <p style={{fontWeight: '500'}}>{opt.value}</p>
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
        handleNext={handleNext}
      />
    </SelectWrapper>
  );
};

export default SelectImage;
