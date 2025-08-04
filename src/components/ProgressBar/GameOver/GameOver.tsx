import {
    GameOverWrapper,
    Popup,
    Title,
    RestoreSection,
    HeartIcon,
    RegisterButton,
    CancelButton,
    Img,
    RestoreLeft,
    RestoreRight
} from "./GameOver.styled";
import cry from "@/assets/cry.gif";

interface GameOverProps {
    onCancel: () => void;
    onRecover?: () => void; // Optional, if have handle recovery
}

const GameOver: React.FC<GameOverProps> = ({ onCancel, onRecover }) => {

    return (
        <GameOverWrapper>
            <Popup>
                <Title>Bạn đã hết trái tim!</Title>
                <Img src={cry} alt="Crying" />
                <RestoreSection>
                    <RestoreLeft>
                        <HeartIcon />
                        <span>Hồi phục</span>
                    </RestoreLeft>
                    <RestoreRight>Đợi 45 phút</RestoreRight>
                </RestoreSection>
                <RegisterButton onClick={onRecover}>
                    HỒI PHỤC TIM TẠI CỬA HÀNG
                </RegisterButton>
                <CancelButton onClick={onCancel}>KHÔNG, CẢM ƠN</CancelButton>
            </Popup>
        </GameOverWrapper>
    );
};

export default GameOver;