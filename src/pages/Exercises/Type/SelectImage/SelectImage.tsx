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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ExerciseProgressState, setExercisesProgress } from "@/store/userProgress.slice";
import { removeHeart } from "@/store/user.slice";
import { useNavigate } from "react-router-dom";
import config from "@/config";

interface SelectImageProps {
  data: any;
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
  const navigate = useNavigate();
  const exercises = useSelector((state: RootState) => state.userProgress.exercises);
  const hearts = useSelector((state: RootState) => state.user.hearts);
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [lives, setLives] = useState(hearts);
  const [showGameOver, setShowGameOver] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const correctAnswer = data.correct_answer;
  const options = data.options;
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (lives === 0) setShowGameOver(true);
  }, [lives]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const handleCheck = () => {
    setIsRunning(false);
    if (selectedIndex === null) return;

    const selectedOpt = options[selectedIndex];
    const correct = selectedOpt.value?.toLowerCase() === correctAnswer?.toLowerCase();

    if (correct) {
      const exercisesResult: ExerciseProgressState = {
        exercise_id: data._id ? data._id : "",
        user_answer: selectedOpt.value,
        answer_time: seconds,
        is_correct: true,
        question: data.question,
        question_format: data.question_format,
      }
      const updatedExercises = [...exercises, exercisesResult];
      dispatch(setExercisesProgress(updatedExercises));
    } else {
      const exercisesResult: ExerciseProgressState = {
        exercise_id: data._id ? data._id : "",
        user_answer: selectedOpt.value,
        answer_time: seconds,
        is_correct: false,
        correct_answer: data.correct_answer,
        question: data.question,
        question_format: data.question_format,
      }
      const updatedExercises = [...exercises, exercisesResult];
      dispatch(setExercisesProgress(updatedExercises));
      dispatch(removeHeart())
    }

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
          onCancel={() => navigate(config.routes.public.home)}
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
        <Question>{data.question}</Question>
        <OptionsContainer>
          {options.map((opt: any, idx: number) => {
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
                <img src={opt.image} alt={opt.value} />
                <MeanText>
                  <p style={{ fontWeight: '500' }}>{opt.value}</p>
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
