import { theme } from "@/themes";
import { Form, Row, Typography } from "antd";
import styled from "styled-components";

const { Title, Text } = Typography;

export const AuthForm = styled.div`
    display: flex;
    position: fixed;
    inset: 0;
    overflow-y: auto;
`;

export const FormRow = styled(Row)`
    margin: auto;
    position: relative;
    width: 1066px;
    height: 700px;
    padding: 24px;
    border-radius: 30px;

    ${({ theme }) => theme.breakpoints.down('lg')} {
        width: auto;
        margin: auto;
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
        border-radius: unset;
        box-shadow: unset;
    }

    ${({ theme }) => theme.breakpoints.down('xs')} {
        padding: 12px;
    }
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 370px;
    margin: 0 auto;

    ${({ theme }) => theme.breakpoints.down('sm')} {
        width: 100%;
    }
`;

export const FormWrapper = styled(Form)`
    display: flex;
    flex-direction: column;
    row-gap: 20px;
`;

export const FormTitle = styled(Title)`
    &.ant-typography {
        margin-bottom: 24px;
        color: ${theme.color.primary};
        font-size: 2.4rem;
        font-weight: 700;
        text-align: center;
    }
`;

export const FormRedirect = styled(Text)`
    display: flex;
    align-items: center;
    justify-content: center;

    column-gap: 8px;
    margin-top: 36px;
    color: ${theme.color.textPrimary};
    font-size: 1.2rem;
`;