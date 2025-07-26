import React, { useState, useEffect } from "react";
import { Typography } from "antd";
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

interface CompleteSentencesProps {
  data: {
    question_id: number;
    type: "complete_sentences";
    question: string;
    sample_sentence: string;
    image: string;
    // sentence: {
    //   before: string;
    //   after: string;
    // };
    options: string[];
    correct_answer: string;
  };
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
  const [lives, setLives] = useState(3);
  const [showGameOver, setShowGameOver] = useState(false);

  // Sync availableWords when options change
  useEffect(() => {
    setAvailableWords(options);
    setSelectedWords([""]);
  }, [options]);

  useEffect(() => {
    if (lives === 0) setShowGameOver(true);
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
    if (!selectedWords[0]) return;
    const correct = selectedWords[0].trim().toLowerCase() === correct_answer.trim().toLowerCase();
    setIsCorrect(correct);
    setIsChecked(true);
    if (!correct) setLives(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    onAnswered(isCorrect);
    setIsChecked(false);
    setIsCorrect(false);
    setLives(3);
    setShowGameOver(false);
  };

  const handleReset = () => {
    setSelectedWords([""]);
    setAvailableWords(options);
    setIsChecked(false);
    setIsCorrect(false);
    setLives(3);
  };

  useEffect(() => {
    if (selectedWords.length === 0) {
      setSelectedWords(Array(numberOfSlots).fill(""));
    }
  }, [selectedWords.length, numberOfSlots]);

  if (showGameOver) {
    return (
      <GameOver
        onCancel={() => setShowGameOver(false)}
        onRecover={() => {
          setLives(1);
          setShowGameOver(false);
        }}
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
    </Wrapper>
  );
};

export default CompleteSentences;