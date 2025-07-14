import { theme } from "@/themes";
import { Flex, Layout } from "antd";
import Title from "antd/es/typography/Title";
import styled from "styled-components";

export const SidebarWrapper = styled.div`
  background-color: ${theme.color.white};
  // border-right: 1px solid ${theme.color.borderSchedule};
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
  font-family: "Quicksand";
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
    font-family: "Quicksand";
    color: ${theme.color.textPrimary};
    margin: 0;
  }
`;

export const { Sider } = Layout;

export const SidebarHeader = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 20px;
  color: ${theme.color.primary};
`;

export const StyledSider = styled(Sider)`
  // background: none !important;
  background: #005960;
  height: calc(100vh - 32px);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  overflow: auto;
  border-radius: 20px;
  margin: 16px;
  color: #fff !important;

  .ant-menu-light {
    // background: none !important;
    background: #005960;
    border-right: none !important;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .ant-menu-light .ant-menu-item-selected {
  // background: ${theme.color.primary}30;
  // border: 1px solid ${theme.color.primary};
  background: rgba(255, 255, 255, 0.3);
  border: 1px solid #fff;
  }

  .ant-menu .ant-menu-item .anticon {
  font-size: 18px;}
`;
