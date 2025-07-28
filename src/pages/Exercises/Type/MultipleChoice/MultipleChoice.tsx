import React, { useEffect, useState } from "react";
import { Flex, FloatButton, Space, Spin } from "antd";
import {
    Wrapper,
    PersonSay,
    WordBox,
    OptionCard,
} from "./MultipleChoice.styled";
import BottomBar from "@/components/BottomBar/BottomBar";
import ProgressBar from "@/components/ProgressBar";
import GameOver from "@/components/ProgressBar/GameOver/GameOver";
import { useDispatch, useSelector } from "react-redux";
import { ExerciseProgressState, setExercisesProgress } from "@/store/userProgress.slice";
import { RootState } from "@/store";
import { removeHeart } from "@/store/user.slice";
import { useNavigate } from "react-router-dom";
import config from "@/config";
import { explainAnswer } from "@/services/userProgressAPI";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface MultipleChoiceProps {
    data: any;
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
    const navigate = useNavigate();
    const userId = useSelector((state: RootState) => state.user.user_id);
    const exercises = useSelector((state: RootState) => state.userProgress.exercises);
    const hearts = useSelector((state: RootState) => state.user.hearts);
    const dispatch = useDispatch();
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const lives = hearts;
    const [showGameOver, setShowGameOver] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const correctAnswer = data.correct_answer;
    const options = data.options;
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

    useEffect(() => {
        if (lives <= 0) {
            setShowGameOver(true);
        }
    }, [lives]);

    const handleTimeReset = () => {
        setSeconds(0);
        setIsRunning(true);
    }

    // Handle selection and checking
    const handleCheck = () => {
        setIsRunning(false);
        setIsSubmitted(true);

        if (selectedIndex === null) return;
        const selectedOpt = options[selectedIndex];

        const correct = selectedOpt.toLowerCase() === correctAnswer?.toLowerCase();

        if (correct) {
            const exercisesResult: ExerciseProgressState = {
                exercise_id: data._id ? data._id : "",
                user_answer: selectedOpt,
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
                user_answer: selectedOpt,
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
        handleTimeReset();
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

    return (
        <Wrapper>
            {showGameOver && (
                <GameOver
                    onCancel={() => navigate("/")}
                    onRecover={() => navigate(config.routes.user.shop)}
                />
            )}

            <ProgressBar
                totalQuestions={totalQuestions}
                answeredQuestions={answeredQuestions}
                lives={hearts}
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
                {options.map((choice: any, index: number) => {
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

            {isSubmitted && (
                <FloatButton.Group
                    trigger="click"
                    placement="left"
                    icon={<QuestionCircleOutlined />}
                    type="primary"
                    onClick={getAIExplaiation}
                >

                    {answerLoading ? <Spin /> : (
                        <Flex vertical className="w-80 bg-white rounded p-4 mb-60 border" align="flex-end" >
                            {explainAI ? explainAI : 'Không có phản hồi'}
                        </Flex>
                    )}
                </FloatButton.Group>
            )}
        </Wrapper>
    );
};

export default MultipleChoice;
