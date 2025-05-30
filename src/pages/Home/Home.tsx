import {
    HomeWrapper,
    SectionHeader,
    SectionTitle,
    GuideButton,
    HomeContent,
    LeftSection,
    RightSection,
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
    ProgressIcon,
    StatsRow,
    StatItem,
    StatValue,
    StatLabel
} from './Home.styled'
import { useDocumentTitle } from '@/hooks'
import { FiHome, FiBook, FiAward, FiUser, FiArrowLeft, FiBookOpen, FiTarget, FiZap, FiCheck } from 'react-icons/fi'
import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import LessonRoad from '@/components/LessonRoad'
import { theme } from '@/themes'

const Home = () => {
    useDocumentTitle('Nekolingo');
    const [activeTab, setActiveTab] = useState('home');

    return (
        <>
            <Sidebar />
            <HomeWrapper>
                <HomeContent>
                    <LeftSection>
                        <SectionHeader>
                            <FiArrowLeft />
                            <SectionTitle>
                                SECTION 1, UNIT 1
                                <div>Getting started</div>
                            </SectionTitle>
                            <GuideButton>
                                <FiBookOpen />
                                GUIDEBOOK
                            </GuideButton>
                        </SectionHeader>
                        {/* Lesson Road */}
                        <LessonRoad
                            modules={[
                                {
                                    id: 1,
                                    title: 'Hiragana Basics',
                                    description: 'Learn the fundamental Japanese characters',
                                    status: 'completed'
                                },
                                {
                                    id: 2,
                                    title: 'Common Greetings',
                                    description: 'Master everyday Japanese expressions',
                                    status: 'current'
                                },
                                {
                                    id: 3,
                                    title: 'Simple Sentences',
                                    description: 'Build your first Japanese sentences',
                                    status: 'locked'
                                },
                                {
                                    id: 4,
                                    title: 'Numbers & Counting',
                                    description: 'Learn to count in Japanese',
                                    status: 'locked'
                                },
                                {
                                    id: 5,
                                    title: 'Daily Vocabulary',
                                    description: 'Essential words for everyday use',
                                    status: 'locked'
                                }
                            ]}
                            onModuleClick={(moduleId) => {
                                console.log(`Module ${moduleId} clicked`);
                                // Handle module navigation here
                            }}
                        />
                    </LeftSection>

                    <RightSection>
                        {/* League Card */}
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
                                    <LeagueStatus>
                                        You moved up 1 rank!
                                    </LeagueStatus>
                                </div>
                            </LeagueInfo>
                        </LeagueCard>

                        {/* Daily Quests */}
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

                        {/* Stats Card */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Stats</CardTitle>
                            </CardHeader>
                            <StatsRow>
                                <StatItem>
                                    <StatValue>73</StatValue>
                                    <StatLabel>Day Streak</StatLabel>
                                </StatItem>
                                <StatItem>
                                    <StatValue>2510</StatValue>
                                    <StatLabel>Total XP</StatLabel>
                                </StatItem>
                                <StatItem>
                                    <StatValue>12</StatValue>
                                    <StatLabel>Perfect Lessons</StatLabel>
                                </StatItem>
                            </StatsRow>
                        </Card>
                    </RightSection>
                </HomeContent>
            </HomeWrapper>
        </>
    )
}

export default Home;