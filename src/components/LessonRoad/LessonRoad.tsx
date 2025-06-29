import React from 'react';
import { FiCheck, FiLock, FiStar, FiHeart, FiZap } from 'react-icons/fi';
import {
    RoadContainer,
    Road,
    RoadPath,
    ModulesContainer,
    Module,
    ModuleCard,
    ModuleNumber,
    ModuleTitle,
    ModuleDescription,
    ModuleStatus,
    FloatingIcon,
} from './LessonRoad.styled';

interface LessonModule {
    id: number;
    title: string;
    description: string;
    status: 'completed' | 'current' | 'locked';
}

interface LessonRoadProps {
    modules: LessonModule[];
    onModuleClick?: (moduleId: number) => void;
}

const LessonRoad: React.FC<LessonRoadProps> = ({ modules, onModuleClick }) => {
    const handleModuleClick = (module: LessonModule) => {
        if (module.status !== 'locked' && onModuleClick) {
            onModuleClick(module.id);
            window.location.href = '/exercise/' + module.id;
        }
    };

    return (
        <RoadContainer>
            <FloatingIcon><FiStar /></FloatingIcon>
            <FloatingIcon><FiHeart /></FloatingIcon>
            <FloatingIcon><FiZap /></FloatingIcon>

            <Road>
                <RoadPath />
                <ModulesContainer>
                    {modules.map((module, index) => {
                        const side = index % 2 === 0 ? 'right' : 'left';
                        return (
                            <Module key={module.id}>
                                <ModuleCard
                                    completed={module.status === 'completed'}
                                    current={module.status === 'current'}
                                    locked={module.status === 'locked'}
                                    onClick={() => handleModuleClick(module)}
                                >
                                    <ModuleNumber
                                        completed={module.status === 'completed'}
                                        current={module.status === 'current'}
                                        locked={module.status === 'locked'}
                                        side={side}
                                    >
                                        {module.status === 'completed' ? <FiCheck /> : module.id}
                                    </ModuleNumber>

                                    <ModuleTitle
                                        completed={module.status === 'completed'}
                                        current={module.status === 'current'}
                                        locked={module.status === 'locked'}
                                    >
                                        {module.title}
                                    </ModuleTitle>

                                    <ModuleDescription
                                        completed={module.status === 'completed'}
                                        current={module.status === 'current'}
                                        locked={module.status === 'locked'}
                                    >
                                        {module.description}
                                    </ModuleDescription>

                                    <ModuleStatus
                                        completed={module.status === 'completed'}
                                        current={module.status === 'current'}
                                        locked={module.status === 'locked'}
                                    >
                                        {module.status === 'completed' && 'COMPLETED'}
                                        {module.status === 'current' && 'IN PROGRESS'}
                                        {module.status === 'locked' && (
                                            <>
                                                <FiLock style={{ marginRight: '4px' }} />
                                                LOCKED
                                            </>
                                        )}
                                    </ModuleStatus>
                                </ModuleCard>
                            </Module>
                        );
                    })}
                </ModulesContainer>

            </Road>
        </RoadContainer>
    );
};

export default LessonRoad;