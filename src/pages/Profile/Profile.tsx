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
    // FollowButton,
    FollowStats,
    StatsGrid,
    StatCard,
    StatImg,
    StatValue,
    StatLabel,
    AchievementSection,
    AchievementHeader,
    AchievementTitle,
    AchievementText,
    ViewAllLink,
    AchievementList,
    AchievementItem,
    AchievementIconWrapper,
    AchievementInfo,
    AchievementName,
    AchievementDesc,
    AchievementProgress,
    EditButton,
    AchievementLead,
    TabsContainer,
    TabButton,
    TabContent,
    // Character,
    EmptyMessage,
    AddFriendsSection,
    AddFriendsTitle,
    FriendOption,
    // FriendIcon,
    FriendText,
    ArrowIcon,
    Img,
    ImgIcon,
    ImgIconGlass,
    AchievementImg,
} from './Profile.styled';
import Sidebar from '@/components/Sidebar';
import StatsBar from '@/components/StatsBar/StatsBar';
import { useState } from 'react';
import following from "@/assets/following.gif";
import addFriend from "@/assets/addfriend.gif";
import add from "@/assets/add.png";
import glass from "@/assets/glass.png";


import {
    profile,
    stats,
    achievements
} from './data';



const Profile = () => {
    const [activeTab, setActiveTab] = useState<'following' | 'followers'>('following');

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
                                    <ProfileName>{profile.name}</ProfileName>
                                    <ProfileHandle>{profile.handle}</ProfileHandle>
                                    <ProfileJoinDate>{profile.joinDate}</ProfileJoinDate>
                                    <FollowSection>
                                        <FollowStats>Đang theo dõi {profile.following}</FollowStats>
                                        <FollowStats>
                                            <span>{profile.followers} Người theo dõi</span>
                                        </FollowStats>
                                    </FollowSection>
                                </ProfileInfo>
                            </ProfileHeader>

                            <Card>
                                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>Thống kê</h3>
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
                            </Card>

                            <Card>
                                <AchievementSection>
                                    <AchievementHeader>
                                        <AchievementTitle>Thành tích</AchievementTitle>
                                        <ViewAllLink>XEM TẤT CẢ</ViewAllLink>
                                    </AchievementHeader>
                                    <AchievementList>
                                        {achievements.map((ach, index) => (
                                            <AchievementItem key={index}>
                                                <AchievementIconWrapper className={ach.className}>
                                                    <AchievementImg className="streak" src={ach.icon} alt={ach.name} />
                                                    <AchievementText className={ach.className}>{ach.level}</AchievementText>
                                                </AchievementIconWrapper>

                                                <AchievementInfo>
                                                    <AchievementLead>
                                                        <AchievementName>{ach.name}</AchievementName>
                                                        <AchievementDesc>{ach.progressText}</AchievementDesc>
                                                    </AchievementLead>
                                                    <AchievementProgress>
                                                        <div className="progress-bar" style={{ height: '12px' }}>
                                                            <div
                                                                className={`progress-fill ${ach.percentage === 100 ? "complete" : "incomplete"}`}
                                                                style={{ width: `${ach.percentage}%` }}
                                                            ></div>
                                                        </div>
                                                    </AchievementProgress>
                                                    <AchievementDesc>{ach.desc}</AchievementDesc>
                                                </AchievementInfo>
                                            </AchievementItem>
                                        ))}
                                    </AchievementList>
                                </AchievementSection>
                            </Card>
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
                            <Card>
                                <AddFriendsSection>
                                    <AddFriendsTitle>Thêm bạn bè</AddFriendsTitle>
                                    <FriendOption>
                                        <ImgIconGlass src={glass} alt="Glass" />
                                        <FriendText>Tìm bạn bè</FriendText>
                                        <ArrowIcon>
                                            <RightOutlined />
                                        </ArrowIcon>
                                    </FriendOption>

                                    <FriendOption>
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
                        </StyledSidebar>
                    </HomeContent>
                </HomeWrapper>
            </BodyContent>
        </>
    );
};

export default Profile;