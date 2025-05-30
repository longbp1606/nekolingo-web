import React, { useState, useEffect } from 'react';
import { OptionBox, PersonSay, SelectedWordButton, SentenceBox, Title, WordButton, Wrapper } from './SortSentence.styled';

interface SortSentenceProps {
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

const SortSentence: React.FC<SortSentenceProps> = ({ question, options }) => {
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);

    useEffect(() => {
        setShuffledOptions(shuffleArray(options));
        setSelectedWords([]);
    }, [question, options]);

    const handleSelectWord = (word: string) => {
        setSelectedWords([...selectedWords, word]);
        setShuffledOptions(shuffledOptions.filter((w) => w !== word));
    };

    const handleRemoveWord = (word: string, index: number) => {
        const newSelected = [...selectedWords];
        newSelected.splice(index, 1);
        setSelectedWords(newSelected);
        setShuffledOptions([...shuffledOptions, word]);
    };

    return (
        <Wrapper>
            <Title>Viết lại bằng Tiếng Anh</Title>
            <PersonSay>
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/orchid-92a2a.appspot.com/o/Nh%C3%A1p%2Fgirl-say.png?alt=media&token=9db5fc7a-0d65-4808-b114-81430b710929"
                    alt="girl"
                    width={70}
                    height={80}
                />
                <div className="speech-bubble"><strong>{question}</strong></div>
            </PersonSay>

            {/* Selected words area */}
            <SentenceBox>
                {selectedWords.map((word, index) => (
                    <SelectedWordButton
                        key={index}
                        onClick={() => handleRemoveWord(word, index)}

                    >
                        {word}
                    </SelectedWordButton>
                ))}
            </SentenceBox>

            {/* Word options to pick from */}
            <OptionBox>
                {shuffledOptions.map((word, index) => (
                    <WordButton
                        key={index}
                        onClick={() => handleSelectWord(word)}

                    >
                        {word}
                    </WordButton>
                ))}
            </OptionBox>

            {/* Optional: check answer */}
            {/* <div style={{ marginTop: '24px' }}>
                <strong>Answer:</strong> {selectedWords.join(' ')}
            </div> */}
        </Wrapper>
    );
};

export default SortSentence;
