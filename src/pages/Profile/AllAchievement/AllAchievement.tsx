import {
    BodyContent,
    HomeWrapper,
    HomeContent,
} from './AllAchievement.styled';
import Sidebar from '@/components/Sidebar';
import AchievementList from '@/components/AchievementList/AchievementList';


const AllAchievement = () => {
    return (
        <>
            <Sidebar />
            <BodyContent>
                <HomeWrapper>
                    <HomeContent>
                        <AchievementList showViewAll={false} />
                    </HomeContent>
                </HomeWrapper>
            </BodyContent>
        </>
    );
};

export default AllAchievement;