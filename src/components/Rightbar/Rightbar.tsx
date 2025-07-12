import {
    Card,
    CardHeader,
    CardTitle,
    ViewLink,
    LeagueCard,
    LeagueIcon,
    LeagueInfo,
    LeagueRank,
    LeagueStatus,
    QuestItem,
    QuestHeader,
    QuestIcon,
    QuestInfo,
    QuestTitle,
    ProgressBar,
    ProgressFill,
    ProgressText,
    StatsRow,
    StatItem,
    StatValue,
    StatLabel,
    RightSection,
} from './Rightbar.styled';
import { theme } from '@/themes';
import { FiAward, FiTarget, FiZap, FiCheck } from 'react-icons/fi';
import StatsBar from '../StatsBar/StatsBar';
import { useAuth } from '@/hooks';

const RightSidebar = () => {
    const { profile } = useAuth();
    return (
        <RightSection>
            <StatsBar />

            <LeagueCard>
                <CardHeader>
                    <CardTitle>Sapphire League</CardTitle>
                    <ViewLink>VIEW LEAGUE</ViewLink>
                </CardHeader>
                <LeagueInfo>
                    <LeagueIcon>
                        <FiAward />
                    </LeagueIcon>
                    <div>
                        <LeagueRank>
                            You're ranked <span>#5</span>
                        </LeagueRank>
                        <LeagueStatus>You moved up 1 rank!</LeagueStatus>
                    </div>
                </LeagueInfo>
            </LeagueCard>

            <Card>
                <CardHeader>
                    <CardTitle>Daily Quests</CardTitle>
                    <ViewLink>VIEW ALL</ViewLink>
                </CardHeader>

                {/* Quest 1 */}
                <QuestItem>
                    <QuestHeader>
                        <QuestIcon style={{ backgroundColor: theme.color.primary }}>
                            <FiZap color="white" />
                        </QuestIcon>
                        <QuestInfo>
                            <QuestTitle>Earn 20 XP</QuestTitle>
                        </QuestInfo>
                    </QuestHeader>
                    <ProgressBar>
                        <ProgressFill width="75%" color={theme.color.primary} />
                        <ProgressText>15 / 20</ProgressText>
                    </ProgressBar>
                </QuestItem>

                {/* Quest 2 */}
                <QuestItem>
                    <QuestHeader>
                        <QuestIcon style={{ backgroundColor: theme.color.quaternary }}>
                            <FiCheck color="white" />
                        </QuestIcon>
                        <QuestInfo>
                            <QuestTitle>Get 5 in a row correct in 2 lessons</QuestTitle>
                        </QuestInfo>
                    </QuestHeader>
                    <ProgressBar>
                        <ProgressFill width="50%" color={theme.color.quaternary} />
                        <ProgressText>1 / 2</ProgressText>
                    </ProgressBar>
                </QuestItem>

                {/* Quest 3 */}
                <QuestItem>
                    <QuestHeader>
                        <QuestIcon style={{ backgroundColor: theme.color.tertiary }}>
                            <FiTarget color="white" />
                        </QuestIcon>
                        <QuestInfo>
                            <QuestTitle>Complete 3 perfect lessons</QuestTitle>
                        </QuestInfo>
                    </QuestHeader>
                    <ProgressBar>
                        <ProgressFill width="33%" color={theme.color.tertiary} />
                        <ProgressText>1 / 3</ProgressText>
                    </ProgressBar>
                </QuestItem>
            </Card>
        </RightSection>
    )
}

export default RightSidebar
