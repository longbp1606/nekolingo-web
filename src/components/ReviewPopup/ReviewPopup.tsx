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

interface ReviewItem {
    vietnamese: string;
    english: string;
    userAnswer?: string;
    correctAnswer?: string;
    isCorrect: boolean;
}

interface ReviewPopupProps {
    visible: boolean;
    onClose: () => void;
}

const initialReviewData: Omit<ReviewItem, 'isCorrect'>[] = [
    {
        vietnamese: 'Làm sao để nói "thông minh"?',
        english: '',
        userAnswer: 'clever',
        correctAnswer: 'smart'
    },
    {
        vietnamese: 'Hoàn tất bản dịch',
        english: 'Tôi có một con mèo.',
        userAnswer: 'I have a cat',
        correctAnswer: 'I have a cat'
    },
    {
        vietnamese: 'Làm sao để nói "thú cưng"?',
        english: '',
        userAnswer: 'pet',
        correctAnswer: 'pet'
    },
    {
        vietnamese: 'Ghép các cặp:',
        english: 'hat, and, two, very, cat',
        userAnswer: 'hat-mũ, and-và, two-hai, very-rất, cat-mèo',
        correctAnswer: 'hat-mũ, and-và, two-hai, very-rất, cat-mèo'
    },
    {
        vietnamese: 'Làm sao để nói "ba"?',
        english: '',
        userAnswer: 'three',
        correctAnswer: 'three'
    },
    {
        vietnamese: 'Ghép các cặp:',
        english: 'pet, cat, hat, sweater, two',
        userAnswer: 'pet-thú cưng, cat-mèo, hat-mũ, sweater-áo len, two-ba',
        correctAnswer: 'pet-thú cưng, cat-mèo, hat-mũ, sweater-áo len, two-hai'
    },
    {
        vietnamese: 'Đọc câu này',
        english: "Don't worry, my snake is nice.",
        userAnswer: "Don't worry, my snake is nice.",
        correctAnswer: "Don't worry, my snake is nice."
    },
    {
        vietnamese: 'Nghe và trả lời',
        english: 'This dog is...',
        userAnswer: 'This dog is big',
        correctAnswer: 'This dog is cute'
    },
    {
        vietnamese: 'Đọc câu này',
        english: 'Oh, do you have a cat?',
        userAnswer: 'Oh, do you have a cat?',
        correctAnswer: 'Oh, do you have a cat?'
    },
    {
        vietnamese: 'Chọn tùy chọn thiếu',
        english: 'I have three ___',
        userAnswer: 'dogs',
        correctAnswer: 'cats'
    },
    {
        vietnamese: 'Ghép các cặp:',
        english: 'hat, speak, today, you, cat',
        userAnswer: 'hat-mũ, speak-nói, today-hôm nay, you-bạn, cat-mèo',
        correctAnswer: 'hat-mũ, speak-nói, today-hôm nay, you-bạn, cat-mèo'
    },
    {
        vietnamese: 'Đâu là "chó"?',
        english: '',
        userAnswer: 'cat',
        correctAnswer: 'dog'
    },
    {
        vietnamese: 'Hoàn tất bản dịch',
        english: 'Mèo của bạn rất dễ thương, phải không?',
        userAnswer: 'Your cat is very beautiful, right?',
        correctAnswer: 'Your cat is very cute, isn\'t it?'
    },
    {
        vietnamese: 'Đọc câu này',
        english: 'I have a dog too.',
        userAnswer: 'I have a dog too.',
        correctAnswer: 'I have a dog too.'
    },
    {
        vietnamese: 'Hoàn tất bản dịch',
        english: 'Thú cưng của tôi rất yên tĩnh.',
        userAnswer: 'My pet is very quiet.',
        correctAnswer: 'My pet is very quiet.'
    }
];

const generateReviewData = (): ReviewItem[] => {
    return initialReviewData.map((item) => {
        const shouldBeIncorrect = Math.random() < 0.3;
        const isCorrect = shouldBeIncorrect ? false : (item.userAnswer === item.correctAnswer);

        return {
            ...item,
            isCorrect
        };
    });
};

const ReviewPopup: React.FC<ReviewPopupProps> = ({ visible, onClose }) => {
    const [reviewData, setReviewData] = useState<ReviewItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<ReviewItem | null>(null);
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        if (visible) {
            setReviewData(generateReviewData());
        }
    }, [visible]);

    const handleCardClick = (item: ReviewItem) => {
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
                            {reviewData.map((item, index) => (
                                <ReviewCard
                                    key={index}
                                    isCorrect={item.isCorrect}
                                    onClick={() => handleCardClick(item)}
                                >
                                    <CheckIcon isCorrect={item.isCorrect}>
                                        {item.isCorrect ? '✓' : '✗'}
                                    </CheckIcon>
                                    <CardContent>
                                        <VietnameseText>{item.vietnamese}</VietnameseText>
                                        {item.english && (
                                            <EnglishText>{item.english}</EnglishText>
                                        )}
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
                                {selectedItem.isCorrect ? '✅ Chính xác!' : '❌ Sai rồi!'}
                            </DetailTitle>
                            <CloseOutlined
                                onClick={handleCloseDetail}
                                style={{ fontSize: '16px', color: '#999', cursor: 'pointer' }}
                            />
                        </DetailHeader>

                        <DetailContent>
                            <div style={{ marginBottom: '16px', fontWeight: 600, color: '#333' }}>
                                {selectedItem.vietnamese}
                            </div>

                            {selectedItem.english && (
                                <div style={{ marginBottom: '20px', color: '#666', fontStyle: 'italic' }}>
                                    {selectedItem.english}
                                </div>
                            )}

                            <AnswerSection>
                                <div>
                                    <AnswerLabel>Đáp án của bạn:</AnswerLabel>
                                    <AnswerText isCorrect={selectedItem.isCorrect}>
                                        {selectedItem.userAnswer}
                                    </AnswerText>
                                </div>

                                {!selectedItem.isCorrect && (
                                    <div>
                                        <AnswerLabel>Đáp án đúng:</AnswerLabel>
                                        <CorrectAnswer>
                                            {selectedItem.correctAnswer}
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