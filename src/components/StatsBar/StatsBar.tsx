import React, { useState } from 'react';
import { Dropdown } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
import {
    StatsBarContainer,
    StatItemWrapper,
    StatContent,
    StatIcon,
    StatValue,
    DropdownContent,
    DropdownTitle,
    DropdownDescription,
    HeartContainer,
    HeartIcon,
    WeeklyProgress,
    DayCircle,
    CheckIcon,
    StreakIcon,
    CourseList,
    CourseItem,
    CourseName,
    AddCourseItem,
    HeartShopContainer,
    HeartShopItem,
    HeartShopIcon,
    HeartShopText,
    HeartShopPrice,
    HeartIconArray,
} from './StatsBar.styled';
import { theme } from '@/themes';

interface Course {
    id: string;
    name: string;
    flag: string;
    code: string;
}

interface HeartShopItemData {
    id: string;
    icon: string;
    title: string;
    subtitle?: string;
    price?: number;
    isFree?: boolean;
}

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
        type: 'courses' | 'streak' | 'hearts';
        progress?: number;
        maxProgress?: number;
        hearts?: number;
        maxHearts?: number;
    };
}

const StatsBar: React.FC = () => {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [selectedCourse, setSelectedCourse] = useState<Course>({
        id: 'en',
        name: 'Tiếng Anh',
        flag: 'us',
        code: 'EN'
    });

    const heartShopItems: HeartShopItemData[] = [
        {
            id: 'unlimited',
            icon: '♾️',
            title: 'TRÁI TIM VÔ HẠN',
            subtitle: 'THỬ MIỄN PHÍ',
            isFree: true
        },
        {
            id: 'refill',
            icon: '❤️',
            title: 'HỒI PHỤC TRÁI TIM',
            price: 350
        },
        {
            id: 'practice',
            icon: '❤️',
            title: 'LUYỆN TẬP ĐỂ HỒI PHỤC TRÁI TIM'
        }
    ];

    const statsData: StatItemData[] = [
        {
            id: 'courses',
            icon: (
                <img
                    src={`https://flagcdn.com/w40/${selectedCourse.flag}.png`}
                    alt={`${selectedCourse.name} Flag`}
                    width="33"
                    height="36"
                    style={{ borderRadius: "2px" }}
                />
            ),
            value: selectedCourse.code,
            color: `${theme.color.primary}`,
            bgColor: `${theme.color.bgBlue}`,
            borderColor: `${theme.color.darkPrimary}`,
            dropdown: {
                title: 'Các khóa học',
                content: '',
                type: 'courses'
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
                content: 'Hôm qua streak của bạn đã được đóng băng. Tiếp tục duy trì streak!',
                type: 'streak',
                progress: 3,
                maxProgress: 7
            }
        },
        {
            id: 'hearts',
            icon: <HeartIcon>❤️</HeartIcon>,
            value: 5,
            color: `${theme.color.red}`,
            bgColor: `${theme.color.bgRed}`,
            borderColor: `${theme.color.darkRed}`,
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

    const handleCourseSelect = (course: Course) => {
        setSelectedCourse(course);
        setOpenDropdown(null);
    };

    const renderDropdownContent = (item: StatItemData) => {
        const { dropdown } = item;

        return (
            <DropdownContent>
                {dropdown.type === 'courses' && (
                    <>
                        <DropdownTitle color={item.color}>{dropdown.title}</DropdownTitle>
                        <CourseList>
                            <CourseItem
                                active={true}
                                onClick={() => handleCourseSelect(selectedCourse)}
                            >
                                <img
                                    src={`https://flagcdn.com/w40/${selectedCourse.flag}.png`}
                                    alt={`${selectedCourse.name} Flag`}
                                    width="20"
                                    height="14"
                                    style={{ borderRadius: "2px" }}
                                />
                                <CourseName>{selectedCourse.name}</CourseName>
                            </CourseItem>

                            <AddCourseItem>
                                <PlusOutlined style={{ fontSize: '16px', color: '#afafaf' }} />
                                <CourseName style={{ color: '#afafaf' }}>Thêm khóa học mới</CourseName>
                            </AddCourseItem>
                        </CourseList>
                    </>
                )}

                {dropdown.type === 'streak' && (
                    <>
                        <DropdownTitle color={item.color}>{dropdown.title}</DropdownTitle>
                        <DropdownDescription>{dropdown.content}</DropdownDescription>
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
                    <>
                        <DropdownTitle color={item.color}>{dropdown.title}</DropdownTitle>

                        <HeartContainer>
                            {Array.from({ length: dropdown.maxHearts || 5 }).map((_, index) => (
                                <HeartIconArray
                                    key={index}
                                    filled={index < (dropdown.hearts || 0)}
                                    color={item.color}
                                >
                                    ❤️
                                </HeartIconArray>
                            ))}
                        </HeartContainer>

                        <DropdownDescription>
                            Ban có đầy đủ trái tim
                        </DropdownDescription>
                        <DropdownDescription style={{ fontSize: '12px', color: '#666', marginTop: '4px', cursor: 'pointer' }}>
                            Tiếp tục học
                        </DropdownDescription>

                        <HeartShopContainer>
                            {heartShopItems.map((shopItem) => (
                                <HeartShopItem key={shopItem.id}>
                                    <HeartShopIcon>{shopItem.icon}</HeartShopIcon>
                                    <HeartShopText>
                                        <div style={{ fontWeight: '600', fontSize: '14px' }}>
                                            {shopItem.title}
                                        </div>
                                        {shopItem.subtitle && (
                                            <div style={{ color: '#1cb0f6', fontSize: '12px', fontWeight: '600' }}>
                                                {shopItem.subtitle}
                                            </div>
                                        )}
                                    </HeartShopText>
                                    {shopItem.price && (
                                        <HeartShopPrice>
                                            <span style={{ fontSize: '12px', color: '#666' }}>💎</span>
                                            <span style={{ fontSize: '14px', fontWeight: '600' }}>{shopItem.price}</span>
                                        </HeartShopPrice>
                                    )}
                                </HeartShopItem>
                            ))}
                        </HeartShopContainer>
                    </>
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
                        minWidth: item.id === 'hearts' ? '400px' : '280px'
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
                        </StatContent>
                    </StatItemWrapper>
                </Dropdown>
            ))}
        </StatsBarContainer>
    );
};

export default StatsBar;