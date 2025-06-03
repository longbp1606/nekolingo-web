import React, { useRef, useState } from "react";
import { Space, Typography } from "antd";
import { SoundOutlined, MutedOutlined } from '@ant-design/icons';
import {
    ListeningWrapper,
    ProgressBarContainer,
    ProgressBar,
    PlayButton,
    SlowButton,
    QuestionTitle,
    OptionCard,
    // OptionIndex,
} from "./Listening.styled";

import BottomBar from "@/components/BottomBar/BottomBar";

const { Title } = Typography;

const choices = ["I", "study", "three"];
const correctAnswerIndex = 2;

const Listening: React.FC = () => {
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
            <ProgressBarContainer>
                <ProgressBar />
            </ProgressBarContainer>

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
