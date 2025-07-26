import React, { useState } from 'react';
import { StreakWrapper, DayList, DayItem, StreakText, StreakBox, Image } from './StreakDay.styled';
import fire from "@/assets/fire.gif";
import ButtonResult from '@/components/ButtonResult/ButtonResult';
import { theme } from '@/themes';
import ReviewPopup from '@/components/ReviewPopup/ReviewPopup';
import { useAuth } from '@/hooks';
interface Props {
    onContinue: () => void;
}

const StreakDay: React.FC<Props> = ({ onContinue }) => {
    const { profile } = useAuth();
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    // const handleShowReview = () => {
    //     setShowReviewPopup(true);
    //     console.log('Xem lại bài học');
    // };

    const day = new Date().getDay();
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    // const dayOfWeek = days[day];

    const handleCloseReview = () => {
        setShowReviewPopup(false);
    };
    return (
        <>
            <StreakWrapper>
                <h1 style={{ color: 'orange', fontSize: '48px' }}>{profile?.streakDays}</h1>
                <StreakText>ngày streak!</StreakText>
                <Image src={fire} alt="fire" />
                <StreakBox>
                    <DayList>
                        {days.map((item, index) => (
                            <DayItem key={item} active={index === day}>{index === day ? "" : item}</DayItem>
                        ))}
                    </DayList>

                    <p style={{color: `${theme.color.description}`}}>Streak tăng khi bạn luyện tập hằng ngày, chỉ một ngày không luyện tập bạn sẽ mất hết streak!</p>
                </StreakBox>

                <ButtonResult
                    rightButton={{
                        show: true,
                        title: 'Tiếp tục',
                        color: 'white',
                        background: `${theme.color.green}`,
                        border: '2px solid #e5e5e5',
                        borderBottom: `5px solid ${theme.color.darkGreen}`,
                        hoverBackground: `${theme.color.bgBlue}`,
                        hoverColor: `${theme.color.primary}`,
                        hoverBorder: `${theme.color.primary}`,
                        onClick: onContinue
                    }}
                />
            </StreakWrapper>
            <ReviewPopup
                visible={showReviewPopup}
                onClose={handleCloseReview}
            />
        </>
    );
};

export default StreakDay;
