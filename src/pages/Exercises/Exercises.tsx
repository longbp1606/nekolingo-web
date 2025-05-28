import { Select } from 'antd';
import { useState } from 'react';
import QuestionSample from './Type/QuestionSample';

const options = [
    { value: 'question_sample', label: 'Question Sample'},
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
        </>
    )
}

export default Exercises