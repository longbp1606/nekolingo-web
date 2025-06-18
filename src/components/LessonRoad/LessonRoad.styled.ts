import styled from "styled-components";
import { theme } from "@/themes";

export const RoadContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 600px;
    margin: 40px auto;
    position: relative;
`;

export const Road = styled.div`
    position: relative;
    width: 100%;
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const RoadPath = styled.div`
    position: absolute;
    width: 12px;
    height: 100%;
    background-color: ${theme.color.lightPrimary};
    border-radius: 6px;
    z-index: 1;
`;

export const ModulesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
    z-index: 2;
    gap: 40px;
`;

interface ModuleProps {
    completed?: boolean;
    current?: boolean;
    locked?: boolean;
}

export const Module = styled.div<ModuleProps>`
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    
    &:nth-child(odd) {
        justify-content: flex-start;
    }
    
    &:nth-child(even) {
        justify-content: flex-end;
    }
`;

export const ModuleCard = styled.div<ModuleProps>`
    display: flex;
    flex-direction: column;
    width: 200px;
    padding: 16px;
    border-radius: 12px;
    background-color: ${props => 
        props.completed ? theme.color.lightPrimary : 
        props.current ? theme.color.white : 
        theme.color.borderSchedule};
    border: 2px solid ${props => 
        props.completed ? theme.color.primary : 
        props.current ? theme.color.quaternary : 
        theme.color.grey};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    cursor: ${props => props.locked ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.locked ? 0.7 : 1};
    transition: transform 0.2s ease-in-out;
    
    &:hover {
        transform: ${props => props.locked ? 'none' : 'translateY(-5px)'};
    }
`;

export const ModuleNumber = styled.div<ModuleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: ${props => 
        props.completed ? theme.color.primary : 
        props.current ? theme.color.quaternary : 
        theme.color.grey};
    color: ${props => 
        props.completed || props.current ? theme.color.white : 
        theme.color.description};
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 12px;
    align-self: center;
`;

export const ModuleTitle = styled.h3`
    font-size: 16px;
    font-weight: bold;
    margin: 8px 0;
    color: ${theme.color.title};
    text-align: center;
`;

export const ModuleDescription = styled.p`
    font-size: 14px;
    color: ${theme.color.textSecondary};
    margin: 0;
    text-align: center;
`;

export const ModuleStatus = styled.div<ModuleProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 12px;
    font-size: 12px;
    font-weight: bold;
    color: ${props => 
        props.completed ? theme.color.success : 
        props.current ? theme.color.primary : 
        theme.color.textSecondary};
`;

export const ConnectorLine = styled.div<{position: 'left' | 'right'}>`
    position: absolute;
    width: 40px;
    height: 2px;
    background-color: ${theme.color.primary};
    top: 50%;
    ${props => props.position === 'left' ? 'right: 100%;' : 'left: 100%;'}
    margin: ${props => props.position === 'left' ? '0 10px 0 0' : '0 0 0 10px'};
`;