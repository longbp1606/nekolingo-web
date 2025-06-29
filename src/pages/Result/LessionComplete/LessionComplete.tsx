import React, { useState } from 'react';
import { Tag } from 'antd';
import { LessionWrapper, XPBox, Image, Title } from './LessionComplete.styled';
import complete from "@/assets/complete.gif";
import ButtonResult from '@/components/ButtonResult/ButtonResult';
import ReviewPopup from '@/components/ReviewPopup/ReviewPopup';
import { theme } from '@/themes';

interface Props {
    onContinue: () => void;
}

const LessionComplete: React.FC<Props> = ({ onContinue }) => {
    const [showReviewPopup, setShowReviewPopup] = useState(false);

    const handleShowReview = () => {
        setShowReviewPopup(true);
        console.log('Xem lại bài học');
    };

    const handleCloseReview = () => {
        setShowReviewPopup(false);
    };

    return (
        <>
            <LessionWrapper>
                <Image src={complete} alt="complete" />
                <Title level={3}>Luyện tập hoàn tất</Title>
                <div style={{ display: 'flex', gap: '20px' }}>
                    <XPBox color="yellow">
                        <div>TỔNG ĐIỂM KN</div>
                        <Tag>⚡ 8</Tag>
                    </XPBox>
                    <XPBox color="green">
                        <div>AMAZING</div>
                        <Tag color="green">✅ 100%</Tag>
                    </XPBox>
                </div>
                <ButtonResult
                    leftButton={{
                        show: true,
                        title: 'Xem lại bài học',
                        color: `${theme.color.title}`,
                        background: 'white',
                        border: '2px solid #e5e5e5',
                        borderBottom: '5px solid #e5e5e5',
                        hoverBackground: `${theme.color.bgBlue}`,
                        hoverColor: `${theme.color.primary}`,
                        hoverBorder: `${theme.color.primary}`,
                        onClick: handleShowReview,
                    }}
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
            </LessionWrapper>

            <ReviewPopup
                visible={showReviewPopup}
                onClose={handleCloseReview}
            />
        </>
    );
};

export default LessionComplete;