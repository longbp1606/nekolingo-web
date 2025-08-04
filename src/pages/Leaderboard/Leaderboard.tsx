import { useEffect, useRef, useState } from 'react';
import {
    BodyContent,
    LeaderboardContainer,
    LeftSection,
    TournamentTitle,
    TournamentSubtitle,
    TournamentDays,
    LeaderboardList,
    LeaderboardItem,
    RankBadge,
    UserAvatar,
    UserInfo,
    UserName,
    UserScore,
    OnlineIndicator,
    Sidebar as StyledSidebar,
    SidebarTitle,
    CompassContainer,
    CompassCircle,
    CompassDirection,
    IconGrid,
    IconButton,
    FixedHeader,
    TournamentContent,
    DeleteButton,
    FooterWrapper,
    FooterRow,
    FooterLink,
    HomeWrapper,
    HomeContent,
    Card,
} from './Leaderboard.styled';
import Sidebar from '@/components/Sidebar';
import { theme } from '@/themes';
import StatsBar from '@/components/StatsBar/StatsBar';
import { getWeeklyLeaderboard } from '@/services/leaderboardAPI';
import { getProfile } from '@/services/authAPI';
import { formatDateTime } from '@/utils/format-datetime';
import { dateFormat } from '@/utils/enum';

const Leaderboard = () => {
    const [leaderboardList, setLeaderboardList] = useState<any>([]);
    const [tournamentDetail, setTournamentDetail] = useState<any>({});
    const [currentRank, setCurrentRank] = useState<number>(-1);
    const hasFetchedLeaderboard = useRef(false);

    const fetchLeaderboard = async () => {
        try {
            const profile = await getProfile();
            const userID = profile.data?.data?.id;

            const response = await getWeeklyLeaderboard();
            if (response.status === 200) {
                setTournamentDetail(response.data);
                setLeaderboardList(response.data.users);
                const index = response.data?.users?.findIndex((user: any) => String(user._id) === String(userID));
                if (index !== -1) {
                    setCurrentRank(index + 1);
                } else {
                    setCurrentRank(-1); // Not found
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!hasFetchedLeaderboard.current) {
            fetchLeaderboard();
            hasFetchedLeaderboard.current = true;
        }
    }, [])

    // const tournamentMenu = (
    //     <Menu onClick={({ key }) => handleTournamentChange(key)}>
    //         <Menu.Item key="bronze" icon="🥉">
    //             Giải đấu Đồng
    //         </Menu.Item>
    //         <Menu.Item key="silver" icon="🥈">
    //             Giải đấu Bạc
    //         </Menu.Item>
    //         <Menu.Item key="gold" icon="🥇">
    //             Giải đấu Vàng
    //         </Menu.Item>
    //         <Menu.Item key="diamond" icon="💎">
    //             Giải đấu Kim Cương
    //         </Menu.Item>
    //     </Menu>
    // );

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1: return `${theme.color.yellow}`;
            case 2: return '#c0c0c0';
            case 3: return '#cd7f32';
            default: return `${theme.color.green}`;
        }
    };

    const [selectedStatusIcon, setSelectedStatusIcon] = useState<string | null>(null);
    const statusIcons = ['😎', '🎉', '😴', '👀', '🍿', '🚛', '💩', '🏆'];

    return (
        <>
            <Sidebar />

            <BodyContent>
                <HomeWrapper>
                    <HomeContent>
                        <LeftSection>
                            <FixedHeader>
                                <TournamentContent>
                                    <TournamentTitle>Giải đấu ngôn ngữ tuần {tournamentDetail?.week}</TournamentTitle>
                                    <TournamentSubtitle>
                                        Cùng nhau tranh tài nguyên và chiến đấu với những người bạn bốn phương!
                                    </TournamentSubtitle>
                                    <TournamentDays>
                                        {formatDateTime(new Date(tournamentDetail?.start), dateFormat.ddMMyyyy)} - {formatDateTime(new Date(tournamentDetail?.end), dateFormat.ddMMyyyy)}
                                    </TournamentDays>
                                </TournamentContent>
                            </FixedHeader>


                            <LeaderboardContainer>
                                <LeaderboardList>
                                    {leaderboardList?.map((player: any, index: number) => {
                                        return (
                                            <LeaderboardItem key={index} style={
                                                currentRank === index + 1 ? {
                                                    background: theme.color.lightPrimary,
                                                    color: theme.color.primary,
                                                } : {
                                                    background: 'white',
                                                    color: '#333',
                                                }
                                            }>
                                                <RankBadge rank={index + 1} color={getRankColor(index + 1)}>
                                                    {index + 1}
                                                </RankBadge>

                                                <div style={{ position: 'relative' }}>
                                                    <UserAvatar color={theme.color.primary}>
                                                        {player.avatar ? player.avatar : player.username?.charAt(0).toUpperCase()}
                                                    </UserAvatar>
                                                    {<OnlineIndicator />}
                                                </div>

                                                <UserInfo>
                                                    <UserName>{player?.username ? player.username : `Anonymous ${index}`}</UserName>
                                                </UserInfo>

                                                <UserScore>{player?.weekly_xp} XP</UserScore>
                                            </LeaderboardItem>
                                        )
                                    })}
                                </LeaderboardList>
                            </LeaderboardContainer>
                        </LeftSection>


                        <StyledSidebar>
                            <StatsBar />
                            <Card>
                                <SidebarTitle>Đặt biểu tượng trạng thái</SidebarTitle>

                                <CompassContainer>
                                    <CompassCircle>
                                        <CompassDirection>N</CompassDirection>
                                        {selectedStatusIcon && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "-6px",
                                                    right: "-6px",
                                                    background: "#fff",
                                                    borderRadius: "50%",
                                                    border: "2px solid #ccc",
                                                    fontSize: "18px",
                                                    padding: "2px",
                                                    zIndex: 1,
                                                }}
                                            >
                                                {selectedStatusIcon}
                                            </div>
                                        )}
                                        <div
                                            style={{
                                                position: "absolute",
                                                bottom: 0,
                                                right: 10,
                                                width: 12,
                                                height: 12,
                                                backgroundColor: `${theme.color.green}`,
                                                borderRadius: "50%",
                                            }}
                                        />
                                    </CompassCircle>
                                </CompassContainer>
                                <IconGrid>
                                    {statusIcons.map((icon, index) => (
                                        <IconButton
                                            key={index}
                                            selected={selectedStatusIcon === icon}
                                            onClick={() => setSelectedStatusIcon(icon)}
                                        >
                                            <span>{icon}</span>
                                        </IconButton>
                                    ))}
                                </IconGrid>
                                {selectedStatusIcon && (
                                    <div style={{ textAlign: "center", marginTop: "8px" }}>
                                        <DeleteButton onClick={() => setSelectedStatusIcon(null)}>
                                            XÓA
                                        </DeleteButton>
                                    </div>
                                )}

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

export default Leaderboard;