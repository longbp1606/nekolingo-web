/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    HomeWrapper,
    SectionHeader,
    SectionTitle,
    GuideButton,
    HomeContent,
    LeftSection,
    BodyContent,
    TopicContent,
    FloatingIcon,
    TopicTitle,
} from './Home.styled'
import { useAuth, useDocumentTitle } from '@/hooks'
import { FiBookOpen, FiStar, FiZap } from 'react-icons/fi'
// import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import LessonRoad from '@/components/LessonRoad'
import { Flex } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'
import RightSidebar from '@/components/Rightbar/Rightbar'
import { useEffect, useState } from 'react'
import config from '@/config'
import cookieUtils from '@/services/cookieUtils'
import { getCourseMetaData } from '@/services/courseAPI'
import { useDispatch } from 'react-redux'
import { setCourseMetadata } from '@/store/metadata.slice'
import Loading from '../Loading'
import { generatePersonalizedLesson } from '@/services/userProgressAPI'

const Home = () => {
    useDocumentTitle('Nekolingo');
    // const [activeTab, setActiveTab] = useState('home');
    // const hearts = useSelector((state: RootState) => state.user.hearts);
    const { profile } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [topicList, setTopicList] = useState<any>([]); // Initialize topicLis
    // Remove completedLessons state
    // const [completedLessons, setCompletedLessons] = useState<number>(0);

    const token = cookieUtils.getAccessToken();
    const isFirstStep = localStorage.getItem('FIRST_STEP');
    if (isFirstStep === 'false') return <Navigate to={config.routes.public.welcome} />;
    if (!token) return <Navigate to={config.routes.public.login} />;

    const courseId = profile ? profile.currentCourse : '';

    useEffect(() => {
        fetchData();
    }, [profile]);

    const generatePersonalizedLessonsRequest = async () => {
        const payload = {
            userId: profile ? profile.id : '',
        };
        await generatePersonalizedLesson(payload);
    }

    const completedLessons = topicList.reduce((count: number, topic: any) => {
        if (!topic.lessons) return count;
        const currentLessonId = profile?.currentLesson ? profile.currentLesson : '';
        const currentTopic = profile?.currentTopic ? profile.currentTopic : '';
        return (
            count +
            topic.lessons.filter((lesson: any) => {
                if (currentLessonId !== lesson._id && currentTopic === topic._id) {
                    const currentLesson = topic.lessons.find((l: any) => l._id === currentLessonId);
                    return currentLesson && currentLesson.order > lesson.order;
                }
                return false;
            }).length
        );
    }, 0);

    useEffect(() => {
        if (completedLessons === 3) {
            generatePersonalizedLessonsRequest();
        } 
    }, [completedLessons]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getCourseMetaData(courseId);
            dispatch(setCourseMetadata(response.data));
            setTopicList(response.data.topics);
        } catch (error: any) {
            // messageApi.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const onModuleClick = (moduleId: any) => {
        console.log(`Module ${moduleId} clicked`);
        navigate(`/exercise/${moduleId}`);
    };

    if (loading) return <Loading />;

    return (
        <>
            <Sidebar />
            <BodyContent>
                <HomeWrapper>
                    <HomeContent>
                        <LeftSection>
                            <TopicContent key={1}>
                                {topicList?.map((topic: any, id: number) => (
                                    <div key={id}>
                                        <SectionHeader >
                                            <FloatingIcon><FiStar /></FloatingIcon>
                                            <FloatingIcon><FiZap /></FloatingIcon>
                                            <Flex vertical gap={5}>
                                                <Flex gap={10} align='center'>
                                                    <SectionTitle>
                                                        SECTION {id + 1}, UNIT {id + 1}
                                                    </SectionTitle>
                                                </Flex>
                                                <TopicTitle>{topic.title}</TopicTitle>
                                            </Flex>
                                            <GuideButton>
                                                <FiBookOpen />
                                                GUIDEBOOK
                                            </GuideButton>
                                        </SectionHeader>
                                        {/* Lesson Road */}
                                        <LessonRoad
                                            modules={topic.lessons?.map((lesson: any, index: number) => {
                                                const currentLessonId = profile?.currentLesson ? profile.currentLesson : '';
                                                const currentLesson = topic.lessons.find((lesson: any) => lesson._id === currentLessonId);
                                                const currentTopic = profile?.currentTopic ? profile.currentTopic : '';
                                                let currentStatus;
                                                if (currentLessonId === lesson._id && currentTopic === topic._id) currentStatus = 'current';
                                                else if (currentLessonId === lesson._id && currentTopic !== topic._id) currentStatus = 'locked';
                                                else if (currentLessonId !== lesson._id && currentTopic === topic._id && currentLesson.order > lesson.order) currentStatus = 'completed';

                                                // REMOVE setCompletedLessons here!

                                                return {
                                                    index,
                                                    id: lesson._id,
                                                    title: lesson.title,
                                                    description: lesson.description,
                                                    status: currentStatus as "current" | "completed" | "locked"
                                                }
                                            })}
                                            onModuleClick={onModuleClick}
                                        />
                                    </div>
                                ))}
                            </TopicContent>
                        </LeftSection>

                        <RightSidebar />
                    </HomeContent>
                </HomeWrapper>
            </BodyContent>
        </>
    )
}

export default Home;