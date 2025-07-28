import React, { useState, useEffect } from 'react';
import { Content, PersonSay, SentenceContainer, Title, Vietnamese, WordBox, WordsContainer, WordSlot, Wrapper } from './SortSentence.styled';
import ProgressBar from '@/components/ProgressBar';
import BottomBar from '@/components/BottomBar/BottomBar';
import GameOver from '@/components/ProgressBar/GameOver/GameOver';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ExerciseProgressState, setExercisesProgress } from '@/store/userProgress.slice';
import { removeHeart } from '@/store/user.slice';
import config from '@/config';
import { explainAnswer } from '@/services/userProgressAPI';
import { Flex, FloatButton, Spin } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

interface SortSentenceProps {
    data: any;
    totalQuestions: number;
    answeredQuestions: number;
    onAnswered: (correct: boolean) => void;
}

const SortSentence: React.FC<SortSentenceProps> = ({
    data, totalQuestions, answeredQuestions, onAnswered
}) => {
    const navigate = useNavigate();
    const userId = useSelector((state: RootState) => state.user.user_id);
    const exercises = useSelector((state: RootState) => state.userProgress.exercises);
    const hearts = useSelector((state: RootState) => state.user.hearts);
    const dispatch = useDispatch();
    const { question, sample_sentence, options, correct_answer } = data;
    const correctWords = correct_answer?.split(' ');
    const slotCount = correctWords.length;

    // const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [shuffledWords, setShuffledWords] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
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

    useEffect(() => {
        if (lives === 0) setShowGameOver(true);
    }, [lives]);

    useEffect(() => {
        setSelectedWords(Array(slotCount).fill(''));
        setShuffledWords(options);
        // setShuffledOptions(shuffleArray(options));
        setIsChecked(false);
        setIsCorrect(false);
    }, [prompt, options, slotCount]);

    const handleSlotClick = (slotIndex: number): void => {
        if (isChecked) return;

        const wordToRemove = selectedWords[slotIndex];
        if (wordToRemove) {
            // Remove a word from the sentence
            const newSelectedWords = [...selectedWords];
            newSelectedWords[slotIndex] = "";
            setSelectedWords(newSelectedWords);

            // Add a word back to the available list
            setShuffledWords(prev => [...prev, wordToRemove]);
        }
    };

    const handleWordClick = (word: string, index: number): void => {
        if (isChecked) return;

        // 	Find the first blank position in the sentence
        const emptySlotIndex = selectedWords.findIndex(slot => slot === "");

        if (emptySlotIndex !== -1) {
            //Insert a word into the blank position
            const newSelectedWords = [...selectedWords];
            newSelectedWords[emptySlotIndex] = word;
            setSelectedWords(newSelectedWords);

            // Remove a word from the available list
            // const newAvailableWords = shuffledOptions.filter((_, i) => i !== index);
            // setShuffledOptions(newAvailableWords);
            setShuffledWords(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleCheck = (): void => {
        // if (selectedWords.some(word => word === "")) return;
        if (selectedWords.includes('')) return;
        setIsSubmitted(true);

        // // 	Compare with the correct sentence
        // const userSentence = selectedWords.filter(word => word !== "");
        // const correctWithoutA = ["This", "is", "a", "new", "store"];

        // const correct = userSentence.length === correctWithoutA.length &&
        //     userSentence.every((word, index) => word === correctWithoutA[index]);
        const correct = correctWords.every((word: string, index: number) => word === selectedWords[index]);
        setIsRunning(false);

        const answer = selectedWords.join(' ');

        if (correct) {
            const exercisesResult: ExerciseProgressState = {
                exercise_id: data._id ? data._id : "",
                user_answer: answer,
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
                user_answer: answer,
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

    const handleReset = (): void => {
        setSelectedWords(Array(slotCount).fill(''));
        setShuffledWords(options?.sort(() => Math.random() - 0.5));
        setIsChecked(false);
        setIsCorrect(false);
    };

    const handleNext = () => {
        onAnswered(isCorrect);
    };

    return (
        <Wrapper>
            {showGameOver && (
                <GameOver
                    onCancel={() => navigate('/')}
                    onRecover={() => navigate(config.routes.user.shop)}
                />
            )}
            <ProgressBar
                totalQuestions={totalQuestions}
                answeredQuestions={answeredQuestions}
                lives={lives}
                onClose
            />

            <Content>
                <Title>{question}</Title>
                <PersonSay>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fgirl-say.png?alt=media&token=9db5fc7a-0d65-4808-b114-81430b710929"
                        alt="girl"
                        width={70}
                        height={70}
                    />
                    <Vietnamese><strong>{sample_sentence}</strong></Vietnamese>
                </PersonSay>


                <SentenceContainer>
                    {selectedWords?.map((word, index) => (
                        <WordSlot
                            key={index}
                            hasWord={!!word}
                            isChecked={isChecked}
                            onClick={() => handleSlotClick(index)}
                        >
                            {word || "___"}
                        </WordSlot>
                    ))}
                </SentenceContainer>

                <WordsContainer>
                    {shuffledWords?.map((word, index) => (
                        <WordBox
                            key={`${word}-${index}`}
                            isChecked={isChecked}
                            onClick={() => handleWordClick(word, index)}
                        >
                            {word}
                        </WordBox>
                    ))}
                </WordsContainer>
            </Content>
            <BottomBar
                isChecked={isChecked}
                isCorrect={isCorrect}
                selectedIndex={selectedWords.some(word => word !== "") ? 0 : null}
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

export default SortSentence;
