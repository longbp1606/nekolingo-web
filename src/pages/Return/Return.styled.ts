import styled from "styled-components";
import { theme } from "@/themes";

export const ReturnWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: ${theme.color.bgBlue};
    font-family: 'Quicksand', sans-serif;
`;

export const SuccessCard = styled.div<{ status: string }>`
    background-color: white;
    border-radius: 16px;
    padding: 40px;
    width: 100%;
    max-width: 500px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    border-top: 5px solid ${props => props.status === 'success' ? theme.color.green : theme.color.red};
`;

export const SuccessIcon = styled.div`
    font-size: 60px;
    color: ${theme.color.green};
    margin-bottom: 20px;
    
    .anticon-check-circle {
        color: ${theme.color.green};
    }
`;

export const Title = styled.h1`
    font-size: 24px;
    font-weight: 700;
    color: ${theme.color.title};
    margin-bottom: 16px;
`;

export const Message = styled.p`
    font-size: 16px;
    color: ${theme.color.description};
    margin-bottom: 30px;
    line-height: 1.5;
`;

export const DetailItem = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 12px 0;
    border-bottom: 1px solid ${theme.color.borderDefault};
    
    &:last-child {
        border-bottom: none;
    }
`;

export const DetailLabel = styled.span`
    font-weight: 600;
    color: ${theme.color.title};
`;

export const DetailValue = styled.span`
    color: ${theme.color.description};
    font-weight: 500;
    width: 50%;
    word-break: break-word;
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 16px;
    margin-top: 30px;
    
    .ant-btn {
        min-width: 140px;
    }
`;