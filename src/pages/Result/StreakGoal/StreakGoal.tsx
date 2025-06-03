import { useState } from 'react';
import { GoalWrapper, GoalOption, OptionList, Image, ImageWrapper, SpeechBubble } from './StreakGoal.styled';
import goal from "@/assets/goal.jpg";
import ButtonResult from '@/components/ButtonResult/ButtonResult';
import { theme } from '@/themes';

const options = [
    { days: 7, label: 'Tốt', note: 'Tăng 2 lần khả năng hoàn thành khoá học' },
    { days: 14, label: 'Tuyệt vời', note: 'Gấp 3 lần khả năng duy trì thói quen học tập' },
    { days: 30, label: 'Siêu đỉnh', note: '80% học viên duy trì 30 ngày đã hoàn thành mục tiêu' },
    { days: 50, label: 'Bất bại', note: 'Bạn thuộc top 5% kiên trì nhất – sẵn sàng bứt phá!' }
];


const StreakGoal = () => {
    const [selected, setSelected] = useState(14);

    return (
        <GoalWrapper>
            <ImageWrapper>
                <SpeechBubble>{options.find(opt => opt.days === selected)?.note}</SpeechBubble>
                <Image src={goal} alt="goal" />
            </ImageWrapper>
            <OptionList>
                {options.map(opt => (
                    <GoalOption
                        key={opt.days}
                        selected={selected === opt.days}
                        onClick={() => setSelected(opt.days)}
                    >
                        <div>{opt.days} ngày streak</div>
                        <div>{opt.label}</div>
                    </GoalOption>
                ))}
            </OptionList>
            <ButtonResult
                leftButton={{
                    show: false,
                    title: 'Xem lại bài học',
                    onClick: () => console.log('Xem lại bài học'),
                }}
                rightButton={{
                    show: true,
                    title: 'Tôi có thể!',
                    color: `${theme.color.primary}`,
                    background: `${theme.color.bgBlue}`,
                    border: `2px solid ${theme.color.primary}`,
                    borderBottom: `5px solid ${theme.color.primary}`,
                    hoverBackground: `${theme.color.primary}`,
                    hoverColor: '#fff',
                    hoverBorder: `${theme.color.primary}`,
                    onClick: () => console.log('Tôi có thể!'),
                }}
            />
        </GoalWrapper>
    );
};

export default StreakGoal;
