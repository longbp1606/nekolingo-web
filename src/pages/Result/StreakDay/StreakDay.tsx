import React from 'react';
import { StreakWrapper, DayList, DayItem, StreakText, StreakBox, Image } from './StreakDay.styled';
import fire from "@/assets/fire.gif";
import ButtonResult from '@/components/ButtonResult/ButtonResult';
interface Props {
    onContinue: () => void;
}

const StreakDay: React.FC<Props> = ({ onContinue }) => {
    return (
        <StreakWrapper>
            <h1 style={{ color: 'orange', fontSize: '48px' }}>1</h1>
            <StreakText>ngày streak!</StreakText>
            <Image src={fire} alt="fire" />
            <StreakBox>
                <DayList>
                    {['T2', 'T3', 'T4', 'T5', 'T6'].map((day, index) => (
                        <DayItem key={day} active={index === 0}>{day}</DayItem>
                    ))}
                </DayList>

                <p>Streak tăng khi bạn luyện tập hằng ngày, chỉ một ngày không luyện tập bạn sẽ mất hết streak!</p>
            </StreakBox>

            <ButtonResult
                leftButton={{
                    show: true,
                    title: 'Xem lại bài học',
                    color: '#888',
                    background: 'white',
                    border: '2px solid #eee',
                    borderBottom: '5px solid #eee',
                    hoverBackground: '#1890ff',
                    hoverColor: '#fff',
                    hoverBorder: '#1890ff',
                    onClick: () => console.log('Xem lại bài học'),
                }}
                rightButton={{
                    show: true,
                    title: 'Tiếp tục',
                    color: 'white',
                    background: '#52c41a',
                    border: '2px solid #eee',
                    borderBottom: '5px solid #389e0d',
                    hoverBackground: '#1890ff',
                    hoverColor: '#fff',
                    hoverBorder: '#1890ff',
                    onClick: onContinue
                }}
            />
        </StreakWrapper>
    );
};

export default StreakDay;
