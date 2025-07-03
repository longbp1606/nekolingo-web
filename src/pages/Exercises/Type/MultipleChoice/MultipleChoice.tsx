import React, { useEffect, useState } from "react";
import { Space } from "antd";
import {
    Wrapper,
    PersonSay,
    WordBox,
    OptionCard,
} from "./MultipleChoice.styled";
import BottomBar from "@/components/BottomBar/BottomBar";
import ProgressBar from "@/components/ProgressBar";
import GameOver from "@/components/ProgressBar/GameOver/GameOver";

interface MultipleChoiceProps {
    data: {
        question: string;
        options: string[];
        correct_answer: string;
    };
    totalQuestions: number;
    answeredQuestions: number;
    onAnswered: (correct: boolean) => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
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
    const correctAnswer = data.correct_answer;
    const options = data.options;

    useEffect(() => {
        if (lives === 0) {
            setShowGameOver(true);
        }
    }, [lives]);

    // Handle selection and checking
    const handleCheck = () => {
        if (selectedIndex === null) return;
        const selectedOpt = options[selectedIndex];

        const correct = selectedOpt.toLowerCase() === correctAnswer?.toLowerCase();
        setIsCorrect(correct);
        setIsChecked(true);

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
        <Wrapper>
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
            <PersonSay>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fgirl-say.png?alt=media&token=9db5fc7a-0d65-4808-b114-81430b710929"
                    alt="girl"
                    width={70}
                    height={50}
                />
                <WordBox>{data.question}</WordBox>
            </PersonSay>


            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                {options.map((choice, index) => {
                    const isSelected = selectedValue === choice;
                    const isCorrectChoice = choice === correctAnswer;

                    const bgColor = isChecked
                        ? isCorrectChoice
                            ? "#d4edda"
                            : isSelected
                                ? "#f8d7da"
                                : "#fff"
                        : isSelected
                            ? "#ccf2f5"
                            : "#fff";

                    const borderColor =
                        isChecked && isCorrectChoice
                            ? "#52c41a"
                            : isChecked && isSelected && !isCorrectChoice
                                ? "#ff4d4f"
                                : isSelected
                                    ? "#00c2d1"
                                    : "#e5e5e5";

                    return (
                        <OptionCard
                            key={index}
                            bgColor={bgColor}
                            borderColor={borderColor}
                            // onClick={() => !isChecked && setSelectedIndex(index)}
                            onClick={() => handleOptionClick(choice, index)}
                            isClickable={!isChecked}
                        >
                            {choice}
                        </OptionCard>
                    );
                })}
            </Space>

            <BottomBar
                isChecked={isChecked}
                isCorrect={isCorrect}
                selectedIndex={selectedIndex}
                handleCheck={handleCheck}
                handleReset={handleReset}
                handleNext={handleNext}
            />

        </Wrapper>
    );
};

export default MultipleChoice;
