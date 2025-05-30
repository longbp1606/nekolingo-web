import { Select } from 'antd';
import { useState } from 'react';
import QuestionSample from './Type/QuestionSample';
import MultipleChoice from './Type/MultipleChoice/MultipleChoice';
import Listening from './Type/Listening/Listening';
import CompleteSentences from './Type/CompleteSentences/CompleteSentences';


const options = [
    { value: 'question_sample', label: 'Question Sample' },
    { value: 'multiple_choice', label: 'Multiple Choice' },
    { value: 'listening', label: 'Listening' },
    { value: 'complete_sentences', label: 'Complete Sentences' },
]

const Exercises = () => {
    const [questionType, setQuestionType] = useState(options[0].value);

    return (
        <>
            <Select
                defaultValue={options[0].value}
                options={options}
                onChange={(value) => setQuestionType(value)}
            />

            {questionType === 'question_sample' && <QuestionSample />}
            {questionType === 'multiple_choice' && <MultipleChoice />}
            {questionType === 'listening' && <Listening />}
            {questionType === 'complete_sentences' && <CompleteSentences />}
        </>
    )
}

export default Exercises