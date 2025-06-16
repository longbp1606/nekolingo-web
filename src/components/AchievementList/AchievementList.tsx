import {
    Card,
    AchievementListWrapper,
    AchievementSection,
    AchievementHeader,
    AchievementTitle,
    AchievementText,
    ViewAllLink,
    AchievementItem,
    AchievementIconWrapper,
    AchievementInfo,
    AchievementName,
    AchievementDesc,
    AchievementProgress,
    AchievementLead,
    AchievementImg,
} from './AchievementList.styled';
import { Link } from 'react-router-dom';
import config from '@/config';
import { achievements } from './data';

interface AchievementListProps {
    showViewAll?: boolean;
    limit?: number;
}

const AchievementList = ({ showViewAll = true, limit }: AchievementListProps) => {
    const displayedAchievements = limit ? achievements.slice(0, limit) : achievements;

    return (
        <Card>
            <AchievementSection>
                <AchievementHeader>
                    <AchievementTitle>Thành tích</AchievementTitle>
                    {showViewAll && (
                        <ViewAllLink as={Link} to={config.routes.user.achievements}>
                            XEM TẤT CẢ
                        </ViewAllLink>
                    )}
                </AchievementHeader>
                <AchievementListWrapper>
                    {displayedAchievements.map((ach, index) => (
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
                </AchievementListWrapper>
            </AchievementSection>
        </Card>
    );
};

export default AchievementList;