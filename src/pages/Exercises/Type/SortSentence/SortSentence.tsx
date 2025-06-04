import React, { useState, useEffect } from 'react';
import { Content, PersonSay, SentenceContainer, Title, Vietnamese, WordBox, WordsContainer, WordSlot, Wrapper } from './SortSentence.styled';
import ProgressBar from '@/components/ProgressBar';
import BottomBar from '@/components/BottomBar/BottomBar';

interface SortSentenceProps {
    numberOfSlots: number;
    question: string;
    correctAnswer: string;
    options: string[];
}

const shuffleArray = (array: string[]) => {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
};

const SortSentence: React.FC<SortSentenceProps> = ({ numberOfSlots, question, options }) => {
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);
    const [answered, setAnswered] = useState(0);
    useEffect(() => {
        setShuffledOptions(shuffleArray(options));
        setSelectedWords([]);
    }, [question, options]);

    const handleSlotClick = (slotIndex: number): void => {
        if (isChecked) return;

        const wordToRemove = selectedWords[slotIndex];
        if (wordToRemove) {
            // Remove a word from the sentence
            const newSelectedWords = [...selectedWords];
            newSelectedWords[slotIndex] = "";
            setSelectedWords(newSelectedWords);

            // Add a word back to the available list
            setShuffledOptions([...shuffledOptions, wordToRemove]);
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
            const newAvailableWords = shuffledOptions.filter((_, i) => i !== index);
            setShuffledOptions(newAvailableWords);
        }
    };

    const handleCheck = (): void => {
        // Check if the sentence is complete
        if (selectedWords.some(word => word === "")) return;

        // 	Compare with the correct sentence
        const userSentence = selectedWords.filter(word => word !== "");
        const correctWithoutA = ["This", "is", "a", "new", "store"];

        const correct = userSentence.length === correctWithoutA.length &&
            userSentence.every((word, index) => word === correctWithoutA[index]);

        setIsCorrect(correct);
        setIsChecked(true);
        setAnswered(prev => prev + 1);
    };

    const handleReset = (): void => {
        setSelectedWords(Array(numberOfSlots).fill(""));
        // setAvailableWords(["store", "is", "laptops", "This", "taller", "coworkers", "new", "whiter", "a", "fast", "window", "friendly", "blue", "smart", "strong"]);
        setIsChecked(false);
        setIsCorrect(false);
    };

    //Initialize selectedWords if not present
    useEffect(() => {
        if (selectedWords.length === 0) {
            setSelectedWords(Array(numberOfSlots).fill(""));
        }
    }, [selectedWords.length, numberOfSlots]);


    const handleNext = () => {
        // Reset toàn bộ để user có thể chơi lại
        setIsChecked(false);
        setIsCorrect(false);
    };

    return (
        <Wrapper>
            {/* <ProgressBar totalQuestions={2} answeredQuestions={answered} /> */}

            <Content>
                <Title>Viết lại bằng Tiếng Anh</Title>
                <PersonSay>
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fgirl-say.png?alt=media&token=9db5fc7a-0d65-4808-b114-81430b710929"
                        alt="girl"
                        width={70}
                        height={70}
                    />
                    <Vietnamese><strong>{question}</strong></Vietnamese>
                </PersonSay>


                <SentenceContainer>
                    {selectedWords.map((word, index) => (
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
                    {shuffledOptions.map((word, index) => (
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
