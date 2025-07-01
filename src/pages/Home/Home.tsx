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
import { FiArrowLeft, FiBookOpen, FiStar, FiZap } from 'react-icons/fi'
// import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import LessonRoad from '@/components/LessonRoad'
import { Button, Flex } from 'antd'
import { sampleData } from '../sampleData'
import { useNavigate } from 'react-router-dom'
import RightSidebar from '@/components/Rightbar/Rightbar'

const Home = () => {
    useDocumentTitle('Nekolingo');
    // const [activeTab, setActiveTab] = useState('home');
    const navigate = useNavigate();
    const role = localStorage.getItem('role'); // hoặc từ context

    const onModuleClick = (moduleId: any) => {
        console.log(`Module ${moduleId} clicked`);
        navigate(`/exercise/${moduleId}`);
    };

    if (role === 'admin') {
        return (
            <>
                <Sidebar />
                <BodyContent>
                    <HomeWrapper>
                        <h1>Welcome Admin!</h1>
                        <p>Vui lòng chọn chức năng ở menu bên trái.</p>
                    </HomeWrapper>
                </BodyContent>
            </>
        );
    }

    return (
        <>
            <Sidebar />
            <BodyContent>
                <HomeWrapper>
                    <HomeContent>
                        <LeftSection>
                            <TopicContent>
                                {sampleData.topics.map((topic, id) => (
                                    <>
                                        <SectionHeader>
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
                                            modules={topic.lessons.map((lesson) => ({
                                                id: lesson.lesson_id,
                                                title: lesson.title,
                                                description: lesson.description,
                                                status: lesson.status as "current" | "completed" | "locked"
                                            }))}
                                            onModuleClick={onModuleClick}
                                        />
                                    </>
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