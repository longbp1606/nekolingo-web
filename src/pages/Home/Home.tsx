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
import { useDocumentTitle } from '@/hooks'
import { FiBookOpen, FiStar, FiZap } from 'react-icons/fi'
// import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import LessonRoad from '@/components/LessonRoad'
import { Flex, message } from 'antd'
import { sampleData } from '../sampleData'
import { useNavigate } from 'react-router-dom'
import RightSidebar from '@/components/Rightbar/Rightbar'
import { useEffect, useState } from 'react'
import { getTopicCourse } from '@/services/topicAPI'
import { getLessonByTopic } from '@/services/lessonAPI'

const Home = () => {
    useDocumentTitle('Nekolingo');
    // const [activeTab, setActiveTab] = useState('home');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [topicList, setTopicList] = useState<any>([]); // Initialize topicLis
    const [lessonList, setLessonList] = useState<any>([]);

    const courseId = "684f926a0fd356386a378630";

    const fetchData = async () => {
        try {
            setLoading(true);
            const topicList = await getTopicCourse(courseId);
            console.log("✅ Topic list: ", topicList.data.data);
            setTopicList(topicList.data.data);
            fetchLessonData(topicList.data.data[0]._id);
        } catch (error: any) {
            messageApi.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchLessonData = async (topicId: any) => {
        try {
            setLoading(true);
            const lessonList = await getLessonByTopic(topicId);
            console.log("✅ Lesson list: ", lessonList.data);
            setLessonList(lessonList.data);
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
                                            modules={lessonList?.map((lesson: any, index: number) => ({
                                                index,
                                                id: lesson._id,
                                                title: lesson.title,
                                                description: lesson.description,
                                                status: lesson.status as "current" | "completed" | "locked"
                                            }))}
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