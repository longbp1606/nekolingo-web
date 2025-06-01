/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import {
    BottomBarWrapper,
    ButtonGroup,
    FeedbackBox,
    FeedbackText,
    IconCircle,
    ReportBtn,
    SkipButton,
    CheckButton,
    NextButtonSuccess,
} from './BottomBar.styled';

type BottomBarProps = {
    isChecked: boolean;
    isCorrect: boolean;
    selectedIndex: any | null;
    handleCheck: () => void;
    handleReset: () => void;
    handleNext?: () => void;
};

const BottomBar: React.FC<BottomBarProps> = ({
    isChecked,
    isCorrect,
    selectedIndex,
    handleCheck,
    handleReset,
    handleNext,
}) => {
    return (
        <BottomBarWrapper className={isChecked ? (isCorrect ? 'correct' : 'wrong') : ''}>
            <ButtonGroup>
                {isChecked ? (
                    <>
                        <FeedbackBox className={isCorrect ? 'success' : 'danger'}>
                            <IconCircle>
                                {isCorrect ? (
                                    <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 40 }} />
                                ) : (
                                    <CloseCircleTwoTone twoToneColor="#ff4d4f" style={{ fontSize: 40 }} />
                                )}
                            </IconCircle>
                            <FeedbackText className={isCorrect ? 'success' : 'danger'}>
                                <strong>{isCorrect ? 'Chính xác!' : 'Đáp án sai!'}</strong>
                                <ReportBtn>BÁO CÁO</ReportBtn>
                            </FeedbackText>
                        </FeedbackBox>
                        <NextButtonSuccess
                            className={isCorrect ? 'success' : 'fail'}
                            onClick={handleNext || handleReset}
                        >
                            TIẾP TỤC
                        </NextButtonSuccess>
                    </>
                ) : (
                    <>
                        <SkipButton onClick={handleReset}>BỎ QUA</SkipButton>
                        <CheckButton
                            disabled={selectedIndex === null}
                            onClick={handleCheck}
                        >
                            KIỂM TRA
                        </CheckButton>
                    </>
                )}
            </ButtonGroup>
        </BottomBarWrapper>
    );
};

export default BottomBar;
