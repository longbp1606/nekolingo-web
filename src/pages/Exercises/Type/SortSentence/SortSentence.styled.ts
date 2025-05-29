import styled from 'styled-components';

export const Wrapper = styled.div`
    font-family: 'Segoe UI', sans-serif;
    max-width: 640px;
    margin: auto;
`;

export const Title = styled.h2`
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 8px;
`;

export const PersonSay = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 12px 0;

    img {
        border-radius: 50%;
        background-color: #d6f0ff;
    }

    .speech-bubble {
        background: #f2f2f2;
        border-radius: 16px;
        padding: 10px 16px;
        font-size: 16px;
        position: relative;
    }

    .speech-bubble::after {
        content: '';
        position: absolute;
        top: 50%;
        left: -10px;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-right: 10px solid #f2f2f2;
    }
`;

export const SentenceBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    min-height: 40px;
    margin-top: 16px;
`;

export const OptionBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 24px;
`;

export const WordButton = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    border-radius: 999px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background-color: #eee;
    }
`;

export const SelectedWordButton = styled(WordButton)`
    background-color: #dfe6e9;
    border: 2px solid #0984e3;
`;
