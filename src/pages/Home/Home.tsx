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
import { Flex, message } from 'antd'
import { Navigate, useNavigate } from 'react-router-dom'
import RightSidebar from '@/components/Rightbar/Rightbar'
import { useEffect, useState } from 'react'
import config from '@/config'
import cookieUtils from '@/services/cookieUtils'
import { getCourseMetaData } from '@/services/courseAPI'
import { useDispatch } from 'react-redux'
import { setCourseMetadata } from '@/store/metadata.slice'

const Home = () => {
    useDocumentTitle('Nekolingo');
    // const [activeTab, setActiveTab] = useState('home');
    const { profile } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [topicList, setTopicList] = useState<any>([]); // Initialize topicLis

    const token = cookieUtils.getAccessToken();
    if (!token) return <Navigate to={config.routes.public.login} />;

    const courseId = "684f926a0fd356386a378630";

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await getCourseMetaData(courseId);
            dispatch(setCourseMetadata(response.data));
            setTopicList(response.data.topics);
        } catch (error: any) {
            messageApi.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const onModuleClick = (moduleId: any) => {
        console.log(`Module ${moduleId} clicked`);
        navigate(`/exercise/${moduleId}`);
    };

    return (
        <>
            {contextHolder}
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
                                                const currentLesson = profile?.currentLesson ? profile.currentLesson : '';
                                                const currentTopic = profile?.currentTopic ? profile.currentTopic : '';
                                                let currentStatus;
                                                if (currentLesson === lesson._id && currentTopic === topic._id) currentStatus = 'current';
                                                else if (currentLesson === lesson._id && currentTopic !== topic._id) currentStatus = 'locked';
                                                else if (currentLesson!== lesson._id && currentTopic === topic._id && index + 1 > lesson.order) currentStatus = 'completed';

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