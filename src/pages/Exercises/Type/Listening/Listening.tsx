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

const { Title } = Typography;

interface ListeningProps {
    data: {
        question_id: number;
        type: string;
        prompt: string;
        audio_url: string;
        options: string[];
        answer: string;
    };
    totalQuestions: number;
    answeredQuestions: number;
    onAnswered: (correct: boolean) => void;
}

const Listening: React.FC<ListeningProps> = ({ data, totalQuestions, answeredQuestions, onAnswered }) => {
    const { audio_url, options, answer } = data;
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isChecked, setIsChecked] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [lives, setLives] = useState(3);
    const [showGameOver, setShowGameOver] = useState(false);

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
        const correct = selectedValue.trim().toLowerCase() === answer.trim().toLowerCase();
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
                onCancel={() => setShowGameOver(false)}
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
                {options.map((choice, index) => {
                    const isSelected = selectedIndex === index;
                    const isAnswerChoice = choice.trim().toLowerCase() === answer.trim().toLowerCase();

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
