import { useState } from 'react';
import { Menu } from 'antd';
import { HeartOutlined, } from '@ant-design/icons';
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
    TournamentSelector,
    TournamentOption,
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

const Leaderboard = () => {
    const [selectedTournament, setSelectedTournament] = useState('bronze');

    const tournaments = {
        bronze: {
            icon: '🥉',
            title: 'Giải đấu Đồng',
            subtitle: 'Top 15 sẽ được thăng hạng lên giải đấu cao hơn',
            gradient: 'linear-gradient(135deg, #CD7F32, #F4E4BC)',
            data: [
                { rank: 1, name: 'xFaKvB9u', score: '164 KN', avatar: 'X', color: '#ff9500', isOnline: true },
                { rank: 2, name: 'blevins', score: '117 KN', avatar: '🤓', color: '#ff69b4', isOnline: true },
                { rank: 3, name: 'tu.8zPhLRDVr49BC', score: '30 KN', avatar: 'T', color: '#ff4444', isOnline: true },
                { rank: 4, name: 'kaito', score: '30 KN', avatar: 'K', color: '#ff4444', isOnline: true },
                { rank: 5, name: 'Eduardo Picano', score: '28 KN', avatar: 'E', color: '#9966ff', isOnline: true },
                { rank: 6, name: 'tu.8zPhLBrEOdxpl', score: '20 KN', avatar: '🦉', color: '#333', isOnline: true },
                { rank: 7, name: 'Khanh Tr?n Th?y H?ng', score: '15 KN', avatar: 'K', color: '#ff4444', isOnline: true },
                { rank: 8, name: 'xFaKvB9u', score: '164 KN', avatar: 'X', color: '#ff9500', isOnline: true },
                { rank: 9, name: 'blevins', score: '117 KN', avatar: '🤓', color: '#ff69b4', isOnline: true },
                { rank: 10, name: 'tu.8zPhLRDVr49BC', score: '30 KN', avatar: 'T', color: '#ff4444', isOnline: true },
                { rank: 11, name: 'kaito', score: '30 KN', avatar: 'K', color: '#ff4444', isOnline: true },
                { rank: 12, name: 'Eduardo Picano', score: '28 KN', avatar: 'E', color: '#9966ff', isOnline: true },
                { rank: 13, name: 'tu.8zPhLBrEOdxpl', score: '20 KN', avatar: '🦉', color: '#333', isOnline: true },
                { rank: 14, name: 'Khanh', score: '15 KN', avatar: 'K', color: '#ff4444', isOnline: true },
                { rank: 15, name: 'Khanh Tr?n Th?y H?ng', score: '15 KN', avatar: 'K', color: '#ff4444', isOnline: true },
            ]
        },
        silver: {
            icon: '🥈',
            title: 'Giải đấu Bạc',
            subtitle: 'Top 10 sẽ được thăng hạng lên giải đấu cao hơn',
            gradient: 'linear-gradient(135deg, #C0C0C0, #E8E8E8)',
            data: [
                { rank: 1, name: 'ProGamer2024', score: '892 KN', avatar: 'P', color: '#ff9500', isOnline: true },
                { rank: 2, name: 'SilverKnight', score: '756 KN', avatar: '⚔️', color: '#ff69b4', isOnline: true },
                { rank: 3, name: 'MasterChef', score: '689 KN', avatar: '👨‍🍳', color: '#ff4444', isOnline: false },
                { rank: 4, name: 'CodeWarrior', score: '634 KN', avatar: 'C', color: '#4CAF50', isOnline: true },
                { rank: 5, name: 'NightHawk', score: '598 KN', avatar: '🦅', color: '#9966ff', isOnline: true },
                { rank: 6, name: 'DragonSlayer', score: '567 KN', avatar: 'D', color: '#ff4444', isOnline: false },
                { rank: 7, name: 'PhoenixRise', score: '523 KN', avatar: '🔥', color: '#ff9500', isOnline: true }
            ]
        },
        gold: {
            icon: '🥇',
            title: 'Giải đấu Vàng',
            subtitle: 'Top 5 sẽ được thăng hạng lên giải đấu cao hơn',
            gradient: 'linear-gradient(135deg, #FFD700, #FFF8DC)',
            data: [
                { rank: 1, name: 'GoldLegend', score: '2.1M KN', avatar: '👑', color: '#ff9500', isOnline: true },
                { rank: 2, name: 'ElitePlayer', score: '1.8M KN', avatar: 'E', color: '#ff69b4', isOnline: true },
                { rank: 3, name: 'ChampionX', score: '1.6M KN', avatar: '🏆', color: '#ff4444', isOnline: true },
                { rank: 4, name: 'GoldenEagle', score: '1.4M KN', avatar: '🦅', color: '#4CAF50', isOnline: false },
                { rank: 5, name: 'KingOfGames', score: '1.2M KN', avatar: 'K', color: '#9966ff', isOnline: true },
                { rank: 6, name: 'GoldRush', score: '1.1M KN', avatar: 'G', color: '#ff4444', isOnline: true },
                { rank: 7, name: 'UltimateWin', score: '980K KN', avatar: 'U', color: '#333', isOnline: true }
            ]
        },
        diamond: {
            icon: '💎',
            title: 'Giải đấu Kim Cương',
            subtitle: 'Giải đấu cao nhất - Chỉ dành cho những người chơi xuất sắc nhất',
            gradient: 'linear-gradient(135deg, #00BFFF, #E0F6FF)',
            data: [
                { rank: 1, name: 'DiamondKing', score: '10.5M KN', avatar: '💎', color: '#00BFFF', isOnline: true },
                { rank: 2, name: 'CrystalMaster', score: '9.8M KN', avatar: '🔮', color: '#9966ff', isOnline: true },
                { rank: 3, name: 'PlatinumPro', score: '9.2M KN', avatar: 'P', color: '#E5E4E2', isOnline: true },
                { rank: 4, name: 'DiamondQueen', score: '8.7M KN', avatar: '👸', color: '#ff69b4', isOnline: false },
                { rank: 5, name: 'GemLord', score: '8.1M KN', avatar: '💍', color: '#FFD700', isOnline: true },
                { rank: 6, name: 'CrystalHeart', score: '7.8M KN', avatar: '💖', color: '#ff4444', isOnline: true },
                { rank: 7, name: 'DiamondStorm', score: '7.3M KN', avatar: '⚡', color: '#ff9500', isOnline: true }
            ]
        }
    };

    const currentTournament = tournaments[selectedTournament as keyof typeof tournaments];

    const handleTournamentChange = (tournamentType: string) => {
        setSelectedTournament(tournamentType);
    };

    const tournamentMenu = (
        <Menu onClick={({ key }) => handleTournamentChange(key)}>
            <Menu.Item key="bronze" icon="🥉">
                Giải đấu Đồng
            </Menu.Item>
            <Menu.Item key="silver" icon="🥈">
                Giải đấu Bạc
            </Menu.Item>
            <Menu.Item key="gold" icon="🥇">
                Giải đấu Vàng
            </Menu.Item>
            <Menu.Item key="diamond" icon="💎">
                Giải đấu Kim Cương
            </Menu.Item>
        </Menu>
    );

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
                                <TournamentSelector>
                                    {Object.entries(tournaments).map(([key, tournament]) => (
                                        <TournamentOption
                                            key={key}
                                            isActive={selectedTournament === key}
                                            gradient={tournament.gradient}
                                            onClick={() => handleTournamentChange(key)}
                                        >
                                            {tournament.icon}
                                        </TournamentOption>
                                    ))}
                                </TournamentSelector>
                                <TournamentContent>
                                    <TournamentTitle>{currentTournament.title}</TournamentTitle>
                                    <TournamentSubtitle>
                                        {currentTournament.subtitle}
                                    </TournamentSubtitle>
                                    <TournamentDays>6 ngày</TournamentDays>
                                </TournamentContent>
                            </FixedHeader>


                            <LeaderboardContainer>
                                <LeaderboardList>
                                    {currentTournament.data.map((player, index) => (
                                        <LeaderboardItem key={index}>
                                            <RankBadge rank={player.rank} color={getRankColor(player.rank)}>
                                                {player.rank}
                                            </RankBadge>

                                            <div style={{ position: 'relative' }}>
                                                <UserAvatar color={player.color}>
                                                    {player.avatar}
                                                </UserAvatar>
                                                {player.isOnline && <OnlineIndicator />}
                                            </div>

                                            <UserInfo>
                                                <UserName>{player.name}</UserName>
                                            </UserInfo>

                                            <UserScore>{player.score}</UserScore>
                                        </LeaderboardItem>
                                    ))}
                                </LeaderboardList>
                            </LeaderboardContainer>
                        </LeftSection>


                        <StyledSidebar>
                            <StatsBar />
                            <Card>
                                <SidebarTitle>Đặt biểu tượng trang thái</SidebarTitle>

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