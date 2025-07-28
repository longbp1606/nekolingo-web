import React, { useState, useEffect } from "react";
import { Flex, FloatButton, Spin, Typography } from "antd";
import {
  Wrapper,
  SentenceContainer,
  WordSlot,
  WordsContainer,
  WordBox,
  Vietnamese,
  Image,
} from "./CompleteSentences.styled";
import BottomBar from "@/components/BottomBar/BottomBar";
import ProgressBar from "@/components/ProgressBar";
import GameOver from "@/components/ProgressBar/GameOver/GameOver";
import { theme } from "@/themes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ExerciseProgressState, setExercisesProgress } from "@/store/userProgress.slice";
import { removeHeart } from "@/store/user.slice";
import config from "@/config";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { explainAnswer } from "@/services/userProgressAPI";

interface CompleteSentencesProps {
  data: any;
  totalQuestions: number;
  answeredQuestions: number;
  onAnswered: (correct: boolean) => void;
}

const CompleteSentences: React.FC<CompleteSentencesProps> = ({
  data,
  totalQuestions,
  answeredQuestions,
  onAnswered,
}) => {
  const navigate = useNavigate();
  const userId = useSelector((state: RootState) => state.user.user_id);
  const exercises = useSelector((state: RootState) => state.userProgress.exercises);
  const hearts = useSelector((state: RootState) => state.user.hearts);
  const dispatch = useDispatch();
  const { question, sample_sentence, image, options, correct_answer } = data;
  // const { before, after } = sentence;

  const sentence = question.split("___");
  const before = sentence[0];
  const after = sentence[1];

  const [selectedWords, setSelectedWords] = useState<string[]>([""]);
  const [availableWords, setAvailableWords] = useState<string[]>(options);
  const numberOfSlots = options.length;
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const lives = hearts;
  const [showGameOver, setShowGameOver] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [explainAI, setExplainAI] = useState("");
  const [answerLoading, setAnswerLoading] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  // Sync availableWords when options change
  useEffect(() => {
    setAvailableWords(options);
    setSelectedWords([""]);
  }, [options]);

  useEffect(() => {
    if (lives <= 0) setShowGameOver(true);
  }, [lives]);

  const handleWordClick = (word: string, index: number) => {
    if (isChecked) return;
    // setSelectedWords([word]);
    const emptySlotIndex = selectedWords.findIndex(slot => slot === "");
    if (emptySlotIndex !== -1) {
      const newSelectedWords = [...selectedWords];
      newSelectedWords[emptySlotIndex] = word;
      setSelectedWords(newSelectedWords);

      // setAvailableWords(prev => prev.filter((_, i) => i !== index));
      const newAvailableWords = availableWords.filter((_, i) => i !== index);
      setAvailableWords(newAvailableWords);
    }

  };

  const handleSlotClick = (slotIndex: number): void => {
    if (isChecked) return;
    const removed = selectedWords[slotIndex];
    if (removed) {
      const newSelectedWords = [...selectedWords];
      newSelectedWords[slotIndex] = "";
      setSelectedWords(newSelectedWords);
      setAvailableWords([...availableWords, removed]);
    }
  };

  const handleCheck = () => {
    setIsSubmitted(true);
    if (!selectedWords[0]) return;
    const correct = selectedWords[0].trim().toLowerCase() === correct_answer.trim().toLowerCase();

    setIsRunning(false);
    if (correct) {
      const exercisesResult: ExerciseProgressState = {
        exercise_id: data._id ? data._id : "",
        user_answer: selectedWords[0],
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
        user_answer: selectedWords[0],
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
  };

  const getAIExplaiation = async () => {
    setAnswerLoading(true);
    const payload = {
      user_id: userId,
      exercise_id: data._id,
    }

    const res = await explainAnswer(payload);
    if (res.status === 201) {
      setExplainAI(res.data.explanation);
    }
    setAnswerLoading(false);
  }

  const handleNext = () => {
    onAnswered(isCorrect);
    setIsChecked(false);
    setIsCorrect(false);
    setShowGameOver(false);
  };

  const handleReset = () => {
    setSelectedWords([""]);
    setAvailableWords(options);
    setIsChecked(false);
    setIsCorrect(false);
  };

  useEffect(() => {
    if (selectedWords.length === 0) {
      setSelectedWords(Array(numberOfSlots).fill(""));
    }
  }, [selectedWords.length, numberOfSlots]);

  if (showGameOver) {
    return (
      <GameOver
        onCancel={() => navigate('/')}
        onRecover={() => navigate(config.routes.user.shop)}
      />
    );
  }

  return (
    <Wrapper>
      <ProgressBar
        totalQuestions={totalQuestions}
        answeredQuestions={answeredQuestions}
        lives={lives}
        onClose
      />

      <Typography.Title level={4} style={{ fontSize: '24px', fontWeight: 'bold', color: `${theme.color.title}` }}>{question}</Typography.Title>
      <Vietnamese>{sample_sentence}</Vietnamese>
      <Image src={image} alt="example" />

      <SentenceContainer>
        <Typography.Title level={5} style={{ display: 'inline' }}>{before}</Typography.Title>
        <WordSlot
          hasWord={!!selectedWords[0]}
          isChecked={isChecked}
          onClick={() => handleSlotClick(0)}
        >
          {selectedWords[0] || '___'}
        </WordSlot>
        <Typography.Title level={5} style={{ display: 'inline', color: `${theme.color.title}` }}>{after}</Typography.Title>
      </SentenceContainer>

      <WordsContainer>
        {availableWords.map((word, idx) => (
          <WordBox
            key={`${word}-${idx}`}
            isChecked={isChecked}
            onClick={() => handleWordClick(word, idx)}
          >
            {word}
          </WordBox>
        ))}
      </WordsContainer>

      <BottomBar
        isChecked={isChecked}
        isCorrect={isCorrect}
        selectedIndex={selectedWords[0] ? 0 : null}
        handleCheck={handleCheck}
        handleReset={handleReset}
        handleNext={handleNext}
      />

      {isSubmitted && (
        <FloatButton.Group
          trigger="click"
          placement="left"
          icon={<QuestionCircleOutlined />}
          type="primary"
          onClick={getAIExplaiation}
        >
          
            {answerLoading? <Spin /> : (
              <Flex vertical className="w-80 bg-white rounded p-4 mb-60 border" align="flex-end" >
                {explainAI ? explainAI : 'Không có phản hồi'}
              </Flex>
            )}
        </FloatButton.Group>
      )}
    </Wrapper>
  );
};

export default CompleteSentences;