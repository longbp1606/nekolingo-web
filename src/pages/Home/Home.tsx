/* eslint-disable @typescript-eslint/no-explicit-any */
    import {
    HomeWrapper,
    SectionHeader,
    SectionTitle,
    GuideButton,
    HomeContent,
    LeftSection,
    BodyContent,
    TopicContent
} from './Home.styled'
import { useDocumentTitle } from '@/hooks'
import { FiArrowLeft, FiBookOpen} from 'react-icons/fi'
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

    const onModuleClick = (moduleId: any) => {
        console.log(`Module ${moduleId} clicked`);
        navigate(`/exercise/${moduleId}`);
    };

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
                                            <Flex vertical gap={10}>
                                                <Flex gap={10} align='center'>
                                                    <Button className='bg-transparent text-lg' type='primary' shape='circle' icon={<FiArrowLeft />} />
                                                    <SectionTitle>
                                                        SECTION {id + 1}, UNIT {id + 1}
                                                    </SectionTitle>
                                                </Flex>
                                                <div className='ml-10'>{topic.title}</div>
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