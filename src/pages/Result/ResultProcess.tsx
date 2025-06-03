import { useState } from 'react';
import StreakDay from './StreakDay/StreakDay';
import StreakGoal from './StreakGoal/StreakGoal';
import LessionComplete from './LessionComplete/LessionComplete';


const ResultProcess = () => {
    const [step, setStep] = useState(0);

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    return (
        <div>
            {step === 0 && <LessionComplete onContinue={handleNext} />}
            {step === 1 && <StreakDay onContinue={handleNext} />}
            {step === 2 && <StreakGoal />}
        </div>
    );
};

export default ResultProcess;
