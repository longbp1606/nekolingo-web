import { Select } from 'antd';
import { useState } from 'react';
import QuestionSample from './Type/QuestionSample';
import SelectImage from './Type/SelectImage/SelectImage';
import SortSentence from './Type/SortSentence/SortSentence';
import MatchPairs from './Type/MatchPairs/MatchPairs';
import MultipleChoice from './Type/MultipleChoice/MultipleChoice';
import Listening from './Type/Listening/Listening';

const options = [
    { value: 'question_sample', label: 'Question Sample' },
    { value: 'select_image', label: 'Select image exercise' },
    { value: 'sort_sentence', label: 'Sort complete sentences' },
    { value: 'match_pairs', label: 'Match' },
    { value: 'multiple_choice', label: 'Multiple Choice' },
    { value: 'listening', label: 'Listening' },
    // { value: 'complete_sentences', label: 'Complete Sentences' },
];


const Exercises = () => {
    const [questionType, setQuestionType] = useState(options[0].value);

    return (
        <div style={{ height: '100vh', padding: '20px' }}>
            <Select
                defaultValue={options[0].value}
                options={options}
                onChange={(value) => setQuestionType(value)}
            />

            {questionType === 'question_sample' && <QuestionSample />}
            {questionType === 'select_image' && <SelectImage />}
            {questionType === 'sort_sentence' &&
                <SortSentence
                numberOfSlots={5}
                    question="Đây là một cửa hàng mới."
                    correctAnswer="This is a new store"
                    options={["store", "is", "laptops", "This", "taller", "coworkers", "new", "whiter", "a", "fast", "window", "friendly", "blue", "smart", "strong"]}
                />
            }
            {questionType === 'match_pairs' && <MatchPairs />}
            {questionType === 'multiple_choice' && <MultipleChoice />}
            {questionType === 'listening' && <Listening />}
            {/* {questionType === 'complete_sentences' && <CompleteSentences />} */}
        </div>
    )
}

export default Exercises