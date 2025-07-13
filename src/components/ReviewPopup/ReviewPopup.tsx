import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import {
    PopupContainer,
    PopupHeader,
    PopupTitle,
    PopupSubtitle,
    PopupContent,
    ReviewGrid,
    ReviewCard,
    CardContent,
    VietnameseText,
    EnglishText,
    CheckIcon,
    DetailPopup,
    DetailHeader,
    DetailTitle,
    DetailContent,
    AnswerSection,
    AnswerLabel,
    AnswerText,
    CorrectAnswer,
    DetailOverlay
} from './ReviewPopup.styled';
import { theme } from '@/themes';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { ExerciseProgressState } from '@/store/userProgress.slice';

interface ReviewPopupProps {
    visible: boolean;
    onClose: () => void;
}

const ReviewPopup: React.FC<ReviewPopupProps> = ({ visible, onClose }) => {
    const userProgress = useSelector((state: RootState) => state.userProgress);
    const [selectedItem, setSelectedItem] = useState<ExerciseProgressState | null>(null);
    const [showDetail, setShowDetail] = useState(false);

    const handleCardClick = (item: ExerciseProgressState) => {
        setSelectedItem(item);
        setShowDetail(true);
    };

    const handleCloseDetail = () => {
        setShowDetail(false);
        setSelectedItem(null);
    };

    return (
        <>
            <Modal
                open={visible}
                onCancel={onClose}
                footer={null}
                width={800}
                centered
                closeIcon={<CloseOutlined style={{ fontSize: '16px', color: '#999' }} />}
                bodyStyle={{ padding: 0 }}
            >
                <PopupContainer>
                    <PopupHeader>
                        <PopupTitle>Xem bảng điểm của bạn!</PopupTitle>
                        <PopupSubtitle>Nhấp vào ô bên dưới để hiển thị đáp án</PopupSubtitle>
                    </PopupHeader>

                    <PopupContent>
                        <ReviewGrid>
                            {userProgress.exercises.map((item, index) => (
                                <ReviewCard
                                    key={index}
                                    isCorrect={item.is_correct ? true : false}
                                    onClick={() => handleCardClick(item)}
                                >
                                    <CheckIcon isCorrect={item.is_correct ? true : false}>
                                        {item.is_correct ? '✓' : '✗'}
                                    </CheckIcon>
                                    <CardContent>
                                        <VietnameseText>{item.question}</VietnameseText>
                                        {/* {item.correct_answer && (
                                            <EnglishText>{item.correct_answer}</EnglishText>
                                        )} */}
                                    </CardContent>
                                </ReviewCard>
                            ))}
                        </ReviewGrid>
                    </PopupContent>
                </PopupContainer>
            </Modal>

            {/* Detail Popup */}
            {showDetail && selectedItem && (
                <>
                    <DetailOverlay onClick={handleCloseDetail} />
                    <DetailPopup>
                        <DetailHeader>
                            <DetailTitle>
                                {selectedItem.is_correct ? '✅ Chính xác!' : '❌ Sai rồi!'}
                            </DetailTitle>
                            <CloseOutlined
                                onClick={handleCloseDetail}
                                style={{ fontSize: '16px', color: '#999', cursor: 'pointer' }}
                            />
                        </DetailHeader>

                        <DetailContent>
                            <div style={{ marginBottom: '16px', fontWeight: 600, color: `${theme.color.title}` }}>
                                {selectedItem.question}
                            </div>

                            {/* {selectedItem.english && (
                                <div style={{ marginBottom: '20px', color: '#666', fontStyle: 'italic' }}>
                                    {selectedItem.english}
                                </div>
                            )} */}

                            <AnswerSection>
                                <div>
                                    <AnswerLabel>Đáp án của bạn:</AnswerLabel>
                                    <AnswerText isCorrect={selectedItem.is_correct ? true : false}>
                                        {selectedItem.user_answer}
                                    </AnswerText>
                                </div>

                                {!selectedItem.is_correct && (
                                    <div>
                                        <AnswerLabel>Đáp án đúng:</AnswerLabel>
                                        <CorrectAnswer>
                                            {selectedItem.correct_answer}
                                        </CorrectAnswer>
                                    </div>
                                )}
                            </AnswerSection>
                        </DetailContent>
                    </DetailPopup>
                </>
            )}
        </>
    );
};

export default ReviewPopup;