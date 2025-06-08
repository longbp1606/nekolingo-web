import React from 'react';
import { FiCheck, FiLock } from 'react-icons/fi';
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
            window.location.href = '/exercise/' + module.id; // Navigate to the exercise page
        }
    };

    return (
        <RoadContainer>
            <Road>
                <RoadPath />
                <ModulesContainer>
                    {modules.map((module) => (
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
                                >
                                    {module.status === 'completed' ? <FiCheck /> : module.id}
                                </ModuleNumber>
                                <ModuleTitle>{module.title}</ModuleTitle>
                                <ModuleDescription>{module.description}</ModuleDescription>
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
                            {/* {index % 2 === 0 ? (
                                <ConnectorLine position="right" />
                            ) : (
                                <ConnectorLine position="left" />
                            )} */}
                        </Module>
                    ))}
                </ModulesContainer>
            </Road>
        </RoadContainer>
    );
};

export default LessonRoad;