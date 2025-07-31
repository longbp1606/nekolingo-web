import { CheckCircleFilled, CloseCircleFilled, EditFilled } from '@ant-design/icons';
import {
    BodyContent,
    LeftSection,
    Sidebar as StyledSidebar,
    FooterWrapper,
    FooterRow,
    FooterLink,
    HomeWrapper,
    HomeContent,
    Card,
    ProfileHeader,
    ProfileAvatar,
    ProfileInfo,
    ProfileName,
    ProfileHandle,
    ProfileJoinDate,
    StatsGrid,
    StatCard,
    StatImg,
    StatValue,
    StatLabel,
    EditButton,
    AddFriendsSection,
    AddFriendsTitle,
    Title,
    MainCard,
} from './Profile.styled';
import Sidebar from '@/components/Sidebar';
import StatsBar from '@/components/StatsBar/StatsBar';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '@/config';
import firefire from "@/assets/firefire.png";
import thunder from "@/assets/thunder.png";
import prize from "@/assets/prize.png";
import cup from "@/assets/cup.png";


import AchievementList from '@/components/AchievementList/AchievementList';
import PopupInvite from '@/components/PopupInvite/PopupInvite';
import { useAuth } from '@/hooks';
import Button from '@/components/Button';
import cookieUtils from '@/services/cookieUtils';
import { Divider, Flex, InputNumber, List, message, Modal } from 'antd';
import { depositRequest } from '@/services/walletAPI';
import { getUserTransactions } from '@/services/transactionAPI';
import { formatDateTime } from '@/utils/format-datetime';
import { dateFormat } from '@/utils/enum';
import { formatCurrency } from '@/utils/format-currency';
import InfiniteScroll from 'react-infinite-scroll-component';

const Profile = () => {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState(10000);
    const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const hasFetchedHistory = useRef(false);

    const logout = () => {
        cookieUtils.clear();
        navigate(config.routes.public.login);
    }

    const fetchTransactionHistory = async () => {
        try {
            setLoading(true)
            const res = await getUserTransactions();
            if (res.status === 200) {
                setTransactionHistory(res.data);
                setLoading(false);
            }
        } catch (error: any) {
            messageApi.error(error.response.data.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!hasFetchedHistory.current) {
            fetchTransactionHistory();
            hasFetchedHistory.current = true;
        }
    }, []);

    const createPaymentRequest = async (amount: number) => {
        try {
            const res = await depositRequest(amount);
            if (res.status === 201) {
                window.location.href = res.data.url;
                setIsModalOpen(false);
            }
        } catch (error: any) {
            messageApi.error(error.data.message);
        }
    }

    const stats = [
        {
            icon: firefire,
            label: "Ngày streak",
            value: profile ? profile.streakDays : 0,
            className: "streak",
        },
        {
            icon: thunder,
            label: "Tổng điểm XP",
            value: profile ? profile.xp : 0,
            className: "lightning",
        },
        {
            icon: prize,
            label: "Giải đấu hiện tại",
            value: "Đồng",
            className: "bronze",
        },
        {
            icon: cup,
            label: "Số dấu đạt top 3",
            value: "0",
            className: "trophy",
        },
    ];

    return (
        <>
            {contextHolder}
            <Sidebar />
            <BodyContent>
                <HomeWrapper>
                    <HomeContent>
                        <LeftSection>
                            <ProfileHeader>
                                <ProfileAvatar>
                                    <div className="avatar-placeholder">
                                        <span>+</span>
                                    </div>
                                </ProfileAvatar>
                                <EditButton>
                                    <EditFilled />
                                </EditButton>
                                <ProfileInfo>
                                    <ProfileName>{profile?.username || "User"}</ProfileName>
                                    <ProfileHandle>{profile?.username || "User"}</ProfileHandle>
                                    <ProfileJoinDate>{profile ? profile.createdAt.toString() : ""}</ProfileJoinDate>
                                </ProfileInfo>

                            </ProfileHeader>

                            <MainCard>
                                <Title>Thống kê</Title>
                                <StatsGrid>
                                    {stats.map((stat, index) => (
                                        <StatCard key={index}>
                                            <StatImg className={stat.className} src={stat.icon} alt={stat.label} />
                                            <div>
                                                <StatValue>{stat.value}</StatValue>
                                                <StatLabel>{stat.label}</StatLabel>
                                            </div>
                                        </StatCard>
                                    ))}
                                </StatsGrid>
                            </MainCard>
                            <AchievementList limit={3} showViewAll={true} />
                        </LeftSection>
                        <StyledSidebar>
                            <StatsBar />
                            <Card style={{ padding: '16px' }}>
                                <AddFriendsSection>
                                    <AddFriendsTitle>Lịch sử giao dịch</AddFriendsTitle>
                                    <div
                                        id="scrollableDiv"
                                        className="h-[400px] overflow-auto pr-2"
                                    >
                                        <InfiniteScroll
                                            dataLength={transactionHistory.length}
                                            next={() => {}}
                                            hasMore={transactionHistory.length < 50}
                                            loader={<></>}
                                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                            scrollableTarget="scrollableDiv"
                                        >
                                            <List
                                                loading={loading}
                                                itemLayout='horizontal'
                                                dataSource={transactionHistory}
                                                renderItem={(item: any) => (
                                                    <List.Item key={item?.id}>
                                                        <List.Item.Meta
                                                            avatar={item?.status === "SUCCESS" ? <CheckCircleFilled style={{ color: '#52c41a' }} /> : <CloseCircleFilled style={{ color: '#ff4d4f' }} />}
                                                            title={formatCurrency(item?.vnd_amount)}
                                                            description={formatDateTime(new Date(item?.createdAt), dateFormat.vietnamFormat)}
                                                        />
                                                        <span>{item?.gem_amount} 💎</span>
                                                    </List.Item>
                                                )}
                                            />
                                        </InfiniteScroll>
                                    </div>

                                </AddFriendsSection>
                            </Card>
                            <FooterWrapper>
                                <FooterRow>
                                    <FooterLink>GIỚI THIỆU</FooterLink>
                                    <FooterLink>CỬA HÀNG</FooterLink>
                                </FooterRow>
                                <FooterRow>
                                    <FooterLink>NHÀ ĐẦU TƯ</FooterLink>
                                    <FooterLink>ĐIỀU KHOẢN</FooterLink>
                                </FooterRow>
                                <FooterRow>
                                    <FooterLink>QUYỀN RIÊNG TƯ</FooterLink>
                                </FooterRow>
                            </FooterWrapper>
                            <Flex vertical gap={20}>
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    color='primary'
                                    title={"Nạp tiền"}
                                    size='medium'
                                />
                                <Button
                                    onClick={logout}
                                    color='danger'
                                    title={"Đăng xuất"}
                                    size='medium'
                                />
                            </Flex>
                        </StyledSidebar>
                    </HomeContent>
                </HomeWrapper>
            </BodyContent>
            {showPopup && <PopupInvite onClose={() => setShowPopup(false)} />}

            <Modal
                title="Nạp tiền"
                open={isModalOpen}
                onOk={() => createPaymentRequest(amount)}
                onCancel={() => setIsModalOpen(false)}
            >
                <p>Nhập số tiền cần nạp</p>
                <InputNumber
                    min={10000}
                    max={10000000}
                    step={10000}
                    defaultValue={10000}
                    addonAfter="VNĐ"
                    onChange={(value) => setAmount(value === null ? 10000 : value)}
                />
            </Modal>
        </>
    );
};

export default Profile;