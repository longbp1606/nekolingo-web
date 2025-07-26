import { useState } from 'react';
import StreakDay from './StreakDay/StreakDay';
import StreakGoal from './StreakGoal/StreakGoal';
import LessionComplete from './LessionComplete/LessionComplete';
import { useDispatch } from 'react-redux';
import { setUserProgress } from '@/store/userProgress.slice';


const ResultProcess = () => {
    const dispatch = useDispatch();
    const [step, setStep] = useState(0);

    const resetStore = () => {
        dispatch(setUserProgress({
            lesson_id: "",
            user_id: "",
            exercises: []
        }));
    }

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    return (
        <div>
            {step === 0 && <LessionComplete onContinue={() => {
                resetStore();
                handleNext();
            }} />}
            {step === 1 && <StreakDay onContinue={handleNext} />}
            {step === 2 && <StreakGoal />}
        </div>
    );
};

export default ResultProcess;
