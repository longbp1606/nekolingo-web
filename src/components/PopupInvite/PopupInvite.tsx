import React, { useState } from 'react';
import {
    Overlay,
    PopupContainer,
    CloseButton,
    CharacterWrapper,
    Paper,
    Sparkle,
    Title,
    Description,
    InviteSection,
    InviteInput,
    CopyButton,
    SocialText,
    SocialButtons,
    SocialButton,
    BottomText,
    Img,
} from './PopupInvite.styled';
import { CloseOutlined, CopyOutlined } from '@ant-design/icons';
import hi from "@/assets/hi.gif";

type PopupInviteProps = {
    onClose: () => void;
};

const PopupInvite: React.FC<PopupInviteProps> = ({ onClose }) => {
    // const [isOpen, setIsOpen] = useState(true);
    const isOpen = true;
    const [copied, setCopied] = useState(false);

    const inviteLink = 'https://invite.duolingo.com/BDHTZ...';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleShare = (platform: string) => {
        console.log(`Sharing on ${platform}`);
    };

    if (!isOpen) return null;

    return (
        <Overlay>
            <PopupContainer>
                <CloseButton onClick={onClose}>
                    <CloseOutlined size={24} />
                </CloseButton>

                <CharacterWrapper>
                    <Img src={hi} alt="Hi" />
                    <Paper />
                    <Sparkle className="sparkle1">✨</Sparkle>
                </CharacterWrapper>

                <Title>Mời bạn bè</Title>
                <Description>
                    Chia sẻ trải nghiệm học ngôn ngữ miễn phí và vui nhộn trên Duolingo tới bạn bè!
                </Description>

                <InviteSection>
                    <InviteInput value={inviteLink} readOnly />
                    <CopyButton onClick={handleCopyLink}>
                        <CopyOutlined size={16} />
                        <span style={{ fontSize: '10px', fontWeight: '600' }}>{copied ? 'ĐÃ SAO CHÉP' : 'SAO CHÉP'}</span>
                    </CopyButton>
                </InviteSection>

                <SocialText>Hoặc chia sẻ trên...</SocialText>

                <SocialButtons>
                    <SocialButton onClick={() => handleShare('facebook')} color="blue">
                        FACEBOOK
                    </SocialButton>
                    <SocialButton onClick={() => handleShare('twitter')} color="sky">
                        TWITTER
                    </SocialButton>
                </SocialButtons>

                <BottomText>Kết nối bạn bè giúp học vui và hiệu quả hơn.</BottomText>
            </PopupContainer>
        </Overlay>
    );
};

export default PopupInvite;
