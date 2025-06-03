// ButtonResult.tsx
import React from 'react';
import { ButtonGroup, ResultButton, BottomBarWrapper } from './ButtonResult.styled';

type ButtonProps = {
    show?: boolean;
    title: string;
    color?: string;
    background?: string;
    border?: string;
    borderBottom?: string;
    onClick: () => void;
    hoverBackground?: string;
    hoverColor?: string;
    hoverBorder?: string;
};


type ButtonResultProps = {
    leftButton?: ButtonProps;
    rightButton?: ButtonProps;
};

const ButtonResult: React.FC<ButtonResultProps> = ({ leftButton, rightButton }) => {
    return (
        <BottomBarWrapper>
            <ButtonGroup>
                {leftButton?.show && (
                    <ResultButton
                        $color={leftButton.color}
                        $background={leftButton.background}
                        $border={leftButton.border}
                        $borderBottom={leftButton.borderBottom}
                        $hoverBackground={leftButton.hoverBackground}
                        $hoverColor={leftButton.hoverColor}
                        $hoverBorder={leftButton.hoverBorder}
                        onClick={leftButton.onClick}
                    >
                        {leftButton.title}
                    </ResultButton>
                )}
                {rightButton?.show && (
                    <ResultButton
                        $color={rightButton.color}
                        $background={rightButton.background}
                        $border={rightButton.border}
                        $borderBottom={rightButton.borderBottom}
                        $hoverBackground={rightButton.hoverBackground}
                        $hoverColor={rightButton.hoverColor}
                        $hoverBorder={rightButton.hoverBorder}
                        onClick={rightButton.onClick}
                    >
                        {rightButton.title}
                    </ResultButton>

                )}
            </ButtonGroup>
        </BottomBarWrapper>
    );
};

export default ButtonResult;
