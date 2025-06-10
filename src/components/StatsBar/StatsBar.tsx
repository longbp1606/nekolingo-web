import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import {
    StatsBarContainer,
    StatItemWrapper,
    StatContent,
    StatIcon,
    StatValue,
    DropdownContent,
    DropdownTitle,
    DropdownDescription,
    //   ProgressBar,
    //   ProgressFill,
    HeartContainer,
    HeartIcon,
    WeeklyProgress,
    DayCircle,
    CheckIcon,
    StreakIcon
} from './StatsBar.styled';

interface StatItemData {
    id: string;
    icon: React.ReactNode;
    value: string | number;
    color: string;
    bgColor: string;
    borderColor: string;
    dropdown: {
        title: string;
        content: string;
        description?: string;
        type: 'country' | 'streak' | 'hearts';
        progress?: number;
        maxProgress?: number;
        hearts?: number;
        maxHearts?: number;
    };
}

const StatsBar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const statsData: StatItemData[] = [
        {
            id: 'country',
            icon: (
                <img
                    src="https://flagcdn.com/w40/vn.png"
                    alt="Vietnam Flag"
                    width="20"
                    height="14"
                    style={{ borderRadius: "2px" }}
                />
            ),
            value: 'VN',
            color: '#ff4757',
            bgColor: '#fff5f5',
            borderColor: '#ff4757',
            dropdown: {
                title: 'Quốc gia',
                content: 'Bạn đang học từ Việt Nam',
                description: 'Tham gia cộng đồng học tập toàn cầu',
                type: 'country'
            }
        },
        {
            id: 'streak',
            icon: <StreakIcon>🔥</StreakIcon>,
            value: 3,
            color: '#ff9500',
            bgColor: '#fff8f0',
            borderColor: '#ff9500',
            dropdown: {
                title: '3 ngày streak',
                content: 'Hôm qua streak của bạn đã được đóng băng. Tôi lúc nối dài streak rồi!',
                type: 'streak',
                progress: 3,
                maxProgress: 7
            }
        },
        {
            id: 'hearts',
            icon: <HeartIcon>❤️</HeartIcon>,
            value: 5,
            color: '#ff6b6b',
            bgColor: '#fff5f5',
            borderColor: '#ff6b6b',
            dropdown: {
                title: 'Trái tim',
                content: 'Bạn có đầy đủ trái tim',
                description: 'Tiếp tục học',
                type: 'hearts',
                hearts: 5,
                maxHearts: 5
            }
        }
    ];

    const renderDropdownContent = (item: StatItemData) => {
        const { dropdown } = item;

        return (
            <DropdownContent>
                <DropdownTitle color={item.color}>{dropdown.title}</DropdownTitle>
                <DropdownDescription>{dropdown.content}</DropdownDescription>

                {dropdown.type === 'streak' && (
                    <>
                        <WeeklyProgress>
                            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, index) => (
                                <DayCircle
                                    key={day}
                                    completed={index < (dropdown.progress || 0)}
                                    color={item.color}
                                >
                                    {index < (dropdown.progress || 0) && <CheckIcon>✓</CheckIcon>}
                                    <span>{day}</span>
                                </DayCircle>
                            ))}
                        </WeeklyProgress>
                    </>
                )}

                {dropdown.type === 'hearts' && (
                    <HeartContainer>
                        {Array.from({ length: dropdown.maxHearts || 5 }).map((_, index) => (
                            <HeartIcon
                                key={index}
                                filled={index < (dropdown.hearts || 0)}
                                color={item.color}
                            >
                                ❤️
                            </HeartIcon>
                        ))}
                    </HeartContainer>
                )}

                {dropdown.description && (
                    <DropdownDescription style={{ marginTop: '8px', fontSize: '12px', opacity: 0.7 }}>
                        {dropdown.description}
                    </DropdownDescription>
                )}
            </DropdownContent>
        );
    };

    const handleDropdownVisibleChange = (visible: boolean, itemId: string) => {
        setOpenDropdown(visible ? itemId : null);
    };

    return (
        <StatsBarContainer>
            {statsData.map((item) => (
                <Dropdown
                    key={item.id}
                    overlay={renderDropdownContent(item)}
                    trigger={['click']}
                    placement="bottomCenter"
                    onVisibleChange={(visible) => handleDropdownVisibleChange(visible, item.id)}
                    overlayStyle={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                    }}
                >
                    <StatItemWrapper
                        color={item.color}
                        bgColor={item.bgColor}
                        borderColor={item.borderColor}
                        isActive={openDropdown === item.id}
                    >
                        <StatContent>
                            <StatIcon>{item.icon}</StatIcon>
                            <StatValue color={item.color}>{item.value}</StatValue>
                            <CaretDownOutlined
                                style={{
                                    color: item.color,
                                    fontSize: '12px',
                                    transition: 'transform 0.2s ease',
                                    transform: openDropdown === item.id ? 'rotate(180deg)' : 'rotate(0deg)'
                                }}
                            />
                        </StatContent>
                    </StatItemWrapper>
                </Dropdown>
            ))}
        </StatsBarContainer>
    );
};

export default StatsBar;