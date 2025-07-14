import { EditFilled, RightOutlined } from '@ant-design/icons';
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
    FollowSection,
    FollowStats,
    StatsGrid,
    StatCard,
    StatImg,
    StatValue,
    StatLabel,
    EditButton,
    TabsContainer,
    TabButton,
    TabContent,
    EmptyMessage,
    AddFriendsSection,
    AddFriendsTitle,
    FriendOption,
    FriendText,
    ArrowIcon,
    Img,
    ImgIcon,
    ImgIconGlass,
    Title,
    MainCard,
} from './Profile.styled';
import Sidebar from '@/components/Sidebar';
import StatsBar from '@/components/StatsBar/StatsBar';
import { useState } from 'react';
import following from "@/assets/following.gif";
import addFriend from "@/assets/addfriend.gif";
import add from "@/assets/add.png";
import glass from "@/assets/glass.png";
import { Link, useNavigate } from 'react-router-dom';
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



const Profile = () => {
    const { profile } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'following' | 'followers'>('following');
    const [showPopup, setShowPopup] = useState(false);

    const logout = () => {
        cookieUtils.clear();
        navigate(config.routes.public.login);
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
                                    <FollowSection>
                                        <FollowStats>Đang theo dõi {0}</FollowStats>
                                        <FollowStats>
                                            <span>{0} Người theo dõi</span>
                                        </FollowStats>
                                    </FollowSection>
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
                            <Card>
                                <TabsContainer>
                                    <TabButton
                                        $active={activeTab === 'following'}
                                        onClick={() => setActiveTab('following')}
                                    >
                                        ĐANG THEO DÕI
                                    </TabButton>
                                    <TabButton
                                        $active={activeTab === 'followers'}
                                        onClick={() => setActiveTab('followers')}
                                    >
                                        NGƯỜI THEO DÕI
                                    </TabButton>
                                </TabsContainer>

                                <TabContent>
                                    {activeTab === 'following' ? (
                                        <>
                                            <Img src={following} alt="Following" />
                                            <EmptyMessage>
                                                Kết nối bạn bè giúp học vui và hiệu quả hơn.
                                            </EmptyMessage>
                                        </>
                                    ) : (
                                        <>
                                            <Img src={addFriend} alt="Add" />
                                            <EmptyMessage>
                                                Chưa có người theo dõi
                                            </EmptyMessage>
                                        </>
                                    )}
                                </TabContent>
                            </Card>
                            <Card style={{ padding: '16px' }}>
                                <AddFriendsSection>
                                    <AddFriendsTitle>Thêm bạn bè</AddFriendsTitle>
                                    <FriendOption>
                                        <ImgIconGlass src={glass} alt="Glass" />
                                        <FriendText as={Link} to={config.routes.user.search}>Tìm bạn bè</FriendText>
                                        <ArrowIcon>
                                            <RightOutlined />
                                        </ArrowIcon>
                                    </FriendOption>

                                    <FriendOption onClick={() => setShowPopup(true)}>
                                        <ImgIcon src={add} alt="Add" />
                                        <FriendText>Mời bạn bè</FriendText>
                                        <ArrowIcon>
                                            <RightOutlined />
                                        </ArrowIcon>
                                    </FriendOption>
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
                            <Button
                                onClick={logout}
                                color='danger'
                                title={"Đăng xuất"}
                                size='medium'
                            />
                        </StyledSidebar>
                    </HomeContent>
                </HomeWrapper>
            </BodyContent>
            {showPopup && <PopupInvite onClose={() => setShowPopup(false)} />}
        </>
    );
};

export default Profile;