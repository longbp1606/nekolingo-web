import React from "react";
import { Img, Message, Overlay, PopupContainer, StopButton, ContinueButton } from "./ExitPopup.styled";
import stop from "@/assets/stop.gif";
import { Space } from "antd";

interface ExitPopupProps {
    onClose: () => void;
    onContinue: () => void;
}

const ExitPopup: React.FC<ExitPopupProps> = ({ onClose, onContinue }) => {
    return (
        <Overlay>
            <PopupContainer>
                <Img src={stop} alt="Stop" />
                <Message>
                    Đợi chút, đừng đi mà! Bạn sẽ mất hết tiến trình của bài học này nếu
                    thoát bây giờ
                </Message>
                <Space direction="vertical" size="middle" style={{ width: "100%", gap: "10px" }}>
                    <ContinueButton onClick={onContinue}>TIẾP TỤC HỌC</ContinueButton>
                    <StopButton onClick={onClose}>
                        DỪNG LẠI
                    </StopButton>
                </Space>
            </PopupContainer>
        </Overlay>
    );
};

export default ExitPopup;
