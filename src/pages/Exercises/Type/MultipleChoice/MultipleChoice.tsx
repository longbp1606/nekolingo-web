import React, { useState } from "react";
import { Space, Typography } from "antd";
import {
    Wrapper,
    ProgressBarContainer,
    ProgressBar,
    // CharacterImage,
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

            <div style={{ margin: "20px 0" }}>
                {/* <CharacterImage
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/8dc49e6b40fba124a92a44c3cdba6416.svg"
                    alt="character"
                /> */}
                <WordBox>ba</WordBox>
            </div>

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
                            ? "#e6f7ff"
                            : "#fff";

                    const borderColor =
                        isChecked && isCorrectChoice
                            ? "#52c41a"
                            : isChecked && isSelected && !isCorrectChoice
                                ? "#ff4d4f"
                                : isSelected
                                    ? "#1890ff"
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
