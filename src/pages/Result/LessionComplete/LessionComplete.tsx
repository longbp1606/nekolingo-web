import React from 'react';
import { Tag } from 'antd';
import { LessionWrapper, XPBox, Image, Title } from './LessionComplete.styled';
import complete from "@/assets/complete.gif";
import ButtonResult from '@/components/ButtonResult/ButtonResult';
import { theme } from '@/themes';

interface Props {
    onContinue: () => void;
}

const LessionComplete: React.FC<Props> = ({ onContinue }) => {
    return (
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
                    color: '#888',
                    background: 'white',
                    border: '2px solid #eee',
                    borderBottom: '5px solid #eee',
                    hoverBackground: `${theme.color.bgBlue}`,
                    hoverColor: '#fff',
                    hoverBorder: `${theme.color.primary}`,
                    onClick: () => console.log('Xem lại bài học'),
                }}
                rightButton={{
                    show: true,
                    title: 'Tiếp tục',
                    color: 'white',
                    background: `${theme.color.green}`,
                    border: '2px solid #eee',
                    borderBottom: `5px solid ${theme.color.darkGreen}`,
                    hoverBackground: `${theme.color.bgBlue}`,
                    hoverColor: `${theme.color.primary}`,
                    hoverBorder: `${theme.color.primary}`,
                    onClick: onContinue
                }}
            />

        </LessionWrapper>
    );
};

export default LessionComplete;
