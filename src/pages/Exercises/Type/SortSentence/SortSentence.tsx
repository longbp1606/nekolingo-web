import React, { useState, useEffect } from 'react';
import { Content, PersonSay, SentenceContainer, Title, Vietnamese, WordBox, WordsContainer, WordSlot, Wrapper } from './SortSentence.styled';
import ProgressBar from '@/components/ProgressBar';
import BottomBar from '@/components/BottomBar/BottomBar';
import GameOver from '@/components/ProgressBar/GameOver/GameOver';

interface SortSentenceProps {
    data: {
        question_id: number;
        type: string;
        question: string;
        sample_sentence: string;
        options: string[];
        answer: string;
        correct_answer: string;
    };
    totalQuestions: number;
    answeredQuestions: number;
    onAnswered: (correct: boolean) => void;
}

const SortSentence: React.FC<SortSentenceProps> = ({
    data, totalQuestions, answeredQuestions, onAnswered
}) => {
    const { question, sample_sentence, options, answer, correct_answer } = data;
    const correctWords = correct_answer?.split(' ');
    const slotCount = correctWords.length;

    // const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [shuffledWords, setShuffledWords] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [lives, setLives] = useState(3);
    const [showGameOver, setShowGameOver] = useState(false);

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

        // // 	Compare with the correct sentence
        // const userSentence = selectedWords.filter(word => word !== "");
        // const correctWithoutA = ["This", "is", "a", "new", "store"];

        // const correct = userSentence.length === correctWithoutA.length &&
        //     userSentence.every((word, index) => word === correctWithoutA[index]);
        const correct = correctWords.every((word, index) => word === selectedWords[index]);

        setIsCorrect(correct);
        setIsChecked(true);
        if (!correct) setLives(prev => prev - 1);
    };

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
        </Wrapper>
    );
};

export default SortSentence;
