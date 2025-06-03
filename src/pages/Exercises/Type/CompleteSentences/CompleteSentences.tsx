import React, { useState, useEffect } from "react";
import { Typography } from "antd";
import {
    Wrapper,
    ProgressBarContainer,
    ProgressBar,
    Vietnamese,
    SentenceContainer,
    WordSlot,
    WordsContainer,
    WordBox,
    Image,
} from "./CompleteSentences.styled";
import storeImg from "@/assets/store.png";
import BottomBar from "@/components/BottomBar/BottomBar";

interface CompleteSentencesProps { }

const CompleteSentences: React.FC<CompleteSentencesProps> = () => {
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [availableWords, setAvailableWords] = useState<string[]>([
        "store", "is", "laptops", "This", "taller", "coworkers", "new", "whiter", "a", "fast", "window", "friendly", "blue", "smart", "strong"
    ]);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [isCorrect, setIsCorrect] = useState<boolean>(false);

    const numberOfSlots: number = 1;

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
            const newAvailableWords = availableWords.filter((_, i) => i !== index);
            setAvailableWords(newAvailableWords);
        }
    };

    const handleSlotClick = (slotIndex: number): void => {
        if (isChecked) return;

        const wordToRemove = selectedWords[slotIndex];
        if (wordToRemove) {
            // Remove a word from the sentence
            const newSelectedWords = [...selectedWords];
            newSelectedWords[slotIndex] = "";
            setSelectedWords(newSelectedWords);

            // Add a word back to the available list
            setAvailableWords([...availableWords, wordToRemove]);
        }
    };

    const handleCheck = (): void => {
        if (selectedWords[0] === "") return;

        const correct = selectedWords[0] === "new";

        setIsCorrect(correct);
        setIsChecked(true);
    };


    const handleReset = (): void => {
        setSelectedWords(Array(numberOfSlots).fill(""));
        setAvailableWords(["store", "is", "laptops", "This", "taller", "coworkers", "new", "whiter", "a", "fast", "window", "friendly", "blue", "smart", "strong"]);
        setIsChecked(false);
        setIsCorrect(false);
    };

    //Initialize selectedWords if not present
    useEffect(() => {
        if (selectedWords.length === 0) {
            setSelectedWords(Array(numberOfSlots).fill(""));
        }
    }, [selectedWords.length, numberOfSlots]);

    return (
        <Wrapper>
            <ProgressBarContainer>
                <ProgressBar />
            </ProgressBarContainer>

            <Typography.Title level={4}>Điền vào chỗ trống</Typography.Title>
            <Vietnamese>Đây là một cửa hàng mới.</Vietnamese>
            <Image
                src={storeImg}
                alt="example"
            />
            <SentenceContainer>
                <Typography.Title level={5}>This is a</Typography.Title>
                <WordSlot
                    hasWord={!!selectedWords[0]}
                    isChecked={isChecked}
                    onClick={() => handleSlotClick(0)}
                >
                    {selectedWords[0] || "_____"}
                </WordSlot>
                <Typography.Title level={5}>store</Typography.Title>
            </SentenceContainer>


            {/* The choice words */}
            <WordsContainer>
                {availableWords.map((word, index) => (
                    <WordBox
                        key={`${word}-${index}`}
                        isChecked={isChecked}
                        onClick={() => handleWordClick(word, index)}
                    >
                        {word}
                    </WordBox>
                ))}
            </WordsContainer>

            <BottomBar
                isChecked={isChecked}
                isCorrect={isCorrect}
                selectedIndex={selectedWords.some(word => word !== "") ? 0 : null}
                handleCheck={handleCheck}
                handleReset={handleReset}
            />
        </Wrapper>
    );
};

export default CompleteSentences;