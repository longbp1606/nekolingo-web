import React, { useState } from "react";
import { Space, Typography } from "antd";
import {
    Wrapper,
    ProgressBarContainer,
    ProgressBar,
    PersonSay,
    WordBox,
    OptionCard,
} from "./MultipleChoice.styled";
import BottomBar from "@/components/BottomBar/BottomBar";

const choices = ["I", "study", "three"];
const correctAnswerIndex = 2;

const MultipleChoice: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleCheck = () => {
        if (selectedIndex === null) return;
        const correct = selectedIndex === correctAnswerIndex;
        setIsCorrect(correct);
        setIsChecked(true);
    };

    const handleReset = () => {
        setSelectedIndex(null);
        setIsChecked(false);
        setIsCorrect(false);
    };

    return (
        <Wrapper>
            <ProgressBarContainer>
                <ProgressBar />
            </ProgressBarContainer>

            <Typography.Title level={4}>Chọn đáp án đúng</Typography.Title>

            <PersonSay>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fgirl-say.png?alt=media&token=9db5fc7a-0d65-4808-b114-81430b710929"
                    alt="girl"
                    width={70}
                    height={50}
                />
                <WordBox>ba</WordBox>
            </PersonSay>


            <Space direction="vertical" style={{ width: "100%" }} size="middle">
                {choices.map((choice, index) => {
                    const isSelected = selectedIndex === index;
                    const isCorrectChoice = index === correctAnswerIndex;

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
                                    : "#d9d9d9";

                    return (
                        <OptionCard
                            key={index}
                            bgColor={bgColor}
                            borderColor={borderColor}
                            onClick={() => !isChecked && setSelectedIndex(index)}
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
            />

        </Wrapper>
    );
};

export default MultipleChoice;
