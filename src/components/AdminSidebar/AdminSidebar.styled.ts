import { theme } from "@/themes";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import styled from "styled-components";

export const SidebarWrapper = styled.div`
    background-color: ${theme.color.white};
    border-right: 1px solid ${theme.color.borderSchedule};
    height: 100vh;
    width: 256px;
    overflow: auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    padding: 0 16px;
`;

export const HeaderTitle = styled(Title)`
    font-size: 16px;
    font-weight: 800;
    margin-bottom: 16px;
    font-family: 'Quicksand';
    padding-top: 16px;
    font-size: 16px;
    color: ${theme.color.primary};
`;

export const SidebarContainer = styled(Flex)``;

export const NavbarItemContainer = styled(Flex)`
    padding: 12px 16px;
    border-radius: 8px;

    & svg {
        color: ${theme.color.primary};
    }
    
    & h4.ant-typography {
        font-weight: 700;
        margin-left: 8px;
        font-family: 'Quicksand';
        color: ${theme.color.textPrimary};
        margin: 0;
    }
`;