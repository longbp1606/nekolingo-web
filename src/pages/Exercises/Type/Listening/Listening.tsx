import React, { useEffect, useRef, useState } from "react";
import { Space, Typography } from "antd";
import { SoundOutlined, MutedOutlined } from '@ant-design/icons';
import {
    ListeningWrapper,
    PlayButton,
    SlowButton,
    // QuestionTitle,
    OptionCard,
} from "./Listening.styled";

import BottomBar from "@/components/BottomBar/BottomBar";
import ProgressBar from '@/components/ProgressBar';
import GameOver from "@/components/ProgressBar/GameOver/GameOver";
import { theme } from "@/themes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { ExerciseProgressState, setExercisesProgress } from "@/store/userProgress.slice";
import { removeHeart } from "@/store/user.slice";

const { Title } = Typography;

interface ListeningProps {
    data: any;
    totalQuestions: number;
    answeredQuestions: number;
    onAnswered: (correct: boolean) => void;
}

const Listening: React.FC<ListeningProps> = ({ data, totalQuestions, answeredQuestions, onAnswered }) => {
    const navigate = useNavigate();
    const exercises = useSelector((state: RootState) => state.userProgress.exercises);
    const hearts = useSelector((state: RootState) => state.user.hearts);
    const dispatch = useDispatch();
    const { audio_url, options, correct_answer } = data;
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [lives, setLives] = useState(hearts);
    const [showGameOver, setShowGameOver] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(true);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isRunning) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000); 
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (lives === 0) {
            setShowGameOver(true);
        }
    }, [lives]);

    const handlePlay = (rate: number) => {
        if (audioRef.current) {
            audioRef.current.playbackRate = rate;
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    const handleCheck = () => {
        if (selectedIndex === null) return;
        const selectedValue = options[selectedIndex];
        const correct = selectedValue.trim().toLowerCase() === correct_answer.trim().toLowerCase();
        if (correct) {
            const exercisesResult: ExerciseProgressState = {
                exercise_id: data._id ? data._id : "",
                user_answer: selectedValue,
                answer_time: seconds,
                is_correct: true,
                question: data.question,
                question_format: data.question_format,
            }
            const updatedExercises = [...exercises, exercisesResult];
            dispatch(setExercisesProgress(updatedExercises));
        } else {
            const exercisesResult: ExerciseProgressState = {
                exercise_id: data._id? data._id : "",
                user_answer: selectedValue,
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
        if (!correct) setLives(prev => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        onAnswered(isCorrect);
        setSelectedIndex(null);
        setIsChecked(false);
        setIsCorrect(false);
    };

    const handleReset = () => {
        setSelectedIndex(null);
        setIsChecked(false);
        setIsCorrect(false);
        setLives(3);
    };

    if (showGameOver) {
        return (
            <GameOver
                onCancel={() => navigate('/')}
                onRecover={() => {
                    setLives(1);
                    setShowGameOver(false);
                }}
            />
        );
    }

    return (
        <ListeningWrapper>
            <ProgressBar
                totalQuestions={totalQuestions}
                answeredQuestions={answeredQuestions}
                lives={lives}
                onClose
            />

            <Title level={3} style={{ fontWeight: 'bold', color: `${theme.color.title}`, fontSize: '24px' }}>Nghe và trả lời</Title>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', margin: '20px 0' }}>
                <PlayButton onClick={() => handlePlay(1.0)}>
                    <SoundOutlined style={{ fontSize: '34px', color: '#fff' }} />
                </PlayButton>

                <SlowButton onClick={() => handlePlay(0.6)}>
                    <MutedOutlined style={{ fontSize: '20px', color: '#fff' }} />
                </SlowButton>

                <audio ref={audioRef} src={audio_url} preload="auto" />
            </div>

            {/* <QuestionTitle>{prompt}</QuestionTitle> */}

            <Space direction="vertical" style={{ width: "100%", marginTop: '16px' }} size="middle">
                {options?.map((choice: any, index: number) => {
                    const isSelected = selectedIndex === index;
                    const isAnswerChoice = choice?.trim().toLowerCase() === correct_answer?.trim().toLowerCase();

                    const bgColor = isChecked
                        ? isAnswerChoice
                            ? '#d4edda'
                            : isSelected
                                ? '#f8d7da'
                                : '#fff'
                        : isSelected
                            ? '#ccf2f5'
                            : '#fff';

                    const borderColor = isChecked
                        ? isAnswerChoice
                            ? '#52c41a'
                            : isSelected
                                ? '#ff4d4f'
                                : '#e5e5e5'
                        : isSelected
                            ? '#00c2d1'
                            : '#e5e5e5';

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
                handleNext={handleNext}
            />
        </ListeningWrapper>
    );
};

export default Listening;
