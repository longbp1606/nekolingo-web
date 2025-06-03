import React, { useEffect, useRef, useState } from "react";
import { Space, Typography } from "antd";
import { SoundOutlined, MutedOutlined } from '@ant-design/icons';
import {
    ListeningWrapper,
    PlayButton,
    SlowButton,
    QuestionTitle,
    OptionCard,
} from "./Listening.styled";

import BottomBar from "@/components/BottomBar/BottomBar";
import ProgressBar from '@/components/ProgressBar';
import GameOver from "@/components/ProgressBar/GameOver/GameOver";
const { Title } = Typography;

const choices = ["I", "study", "three"];

const Listening: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    // Progress bar and lives
    const [totalQuestions] = useState(10); // Total number of questions in the game
    // This should be managed by the game logic, here it's just a placeholder
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [lives, setLives] = useState(3); // Initial lives
    const correctAnswerIndex = 0; // Assuming the first choice is the correct answer

    const [showGameOver, setShowGameOver] = useState(false);

    useEffect(() => {
        if (lives === 0) {
            setShowGameOver(true);
        }
    }, [lives]);

    // Handle selection and checking
    const handleCheck = () => {
        if (selectedIndex === null) return;
        const correct = selectedIndex === correctAnswerIndex;
        setIsCorrect(correct);
        setIsChecked(true);

        if (correct) {
            // Correct: increase progress
            setAnsweredQuestions(prev => prev + 1);
        } else {
            // Incorrect: decrease lives
            setLives(prev => Math.max(0, prev - 1));
        }
    };

    const handleClose = () => {
        console.log('Close button clicked');
    };

    const handleReset = () => {
        setSelectedIndex(null);
        setIsChecked(false);
        setIsCorrect(false);
    };

    const audioRef = useRef<HTMLAudioElement>(null);

    const handlePlayNormal = () => {
        if (audioRef.current) {
            audioRef.current.playbackRate = 1.0;
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };

    const handlePlaySlow = () => {
        if (audioRef.current) {
            audioRef.current.playbackRate = 0.6;
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        }
    };


    return (
        <ListeningWrapper>

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
                onClose={handleClose}
            />

            <Title level={3} style={{ fontWeight: 700 }}>Nghe và trả lời</Title>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', margin: '20px 0' }}>
                <PlayButton onClick={handlePlayNormal}>
                    <SoundOutlined style={{ fontSize: '34px', color: '#fff' }} />
                </PlayButton>

                <SlowButton onClick={handlePlaySlow}>
                    <MutedOutlined style={{ fontSize: '20px', color: '#fff' }} />
                </SlowButton>

                {/* <audio ref={audioRef} src="/sound.mp3" preload="auto" /> */}
            </div>


            <QuestionTitle>This dog is...</QuestionTitle>

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

        </ListeningWrapper>
    );
};

export default Listening;
