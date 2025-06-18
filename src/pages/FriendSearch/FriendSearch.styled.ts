import { theme } from "@/themes";
import styled from 'styled-components';

export const HomeWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding-bottom: 20px;
`;

export const BodyContent = styled.div`
  padding-left: 256px;
`;

export const HomeContent = styled.div`
  width: 1200px;
  margin: 0 auto;
  padding-right: 40px;
`;

export const Title = styled.h1`
  font-size: 25px;
  font-weight: 700;
  color: ${theme.color.title};
  margin: 40px 0;
`;

export const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 16px 20px 16px 48px;
  border: 2px solid #e5e5e5;
  border-radius: 16px;
  background-color: #f7f7f7;
  font-size: 16px;
  color: #666;
  outline: none;
  transition: all 0.2s;
  
  &:focus {
    border-color: ${theme.color.primary}; ;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(28, 176, 246, 0.2);
  }
  
  &::placeholder {
    color: #afafaf;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none; 
  color: ${theme.color.description} ; 
`;

export const Img = styled.img`
  width: 300px;
  height: 300px;
  margin-bottom: 24px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  border-radius: 50%;
  padding: 2px 12px;
  
  &::before {
    content: '×';
  }

`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 2px solid #e5e5e5;
  gap: 40px;
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  width: 100%;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const EmptyMessage = styled.p`
  color: ${theme.color.description};
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
  font-weight: 500;
`;

export const SearchResults = styled.div`
  flex: 1;
  width: 100%;
`;

export const ResultsHeader = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.color.title};
  margin-bottom: 16px;
`;

export const FriendsList = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid #e5e5e5;
`;

export const FriendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  transition: all 0.2s;
  position: relative;
  
  & + &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0px;
    right: 0px;
    height: 2px;
    background-color: #e5e5e5;
  }
  
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const Avatar = styled.div<{ backgroundColor: string; }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${props => props.backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 16px;
  border: 2px solid #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

export const FriendInfo = styled.div`
  flex: 1;
`;

export const FriendName = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.color.title};
  margin-bottom: 2px;
`;

export const FriendUsername = styled.div`
  font-size: 14px;
  color: ${theme.color.description};
`;

export const FollowButton = styled.button`
  padding: 8px 20px;
  background-color: ${theme.color.primary};
  color: white;
  border: none;
  border-bottom: 5px solid ${theme.color.darkPrimary};
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  text-transform: uppercase;
  
  &:hover {
    background-color: ${theme.color.bgBlue};
    border-bottom: 5px solid ${theme.color.primary};
    color: ${theme.color.primary};
    transform: translateY(-1px);
  }
  
  &::before {
    content: '+';
    font-size: 16px;
    font-weight: 700;
  }
`;

export const RightSidebar = styled.div`
  width: 400px;
  margin-top: 40px;
`;

export const SidebarTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.color.title};
  margin-bottom: 16px;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px 20px;
  transition: all 0.2s;
  background-color: #fff;
  border-radius: 8px;
  border: 2px solid #e5e5e5;
  cursor: pointer;
`;

export const SidebarText = styled.div`
  flex: 1;
`;

export const SidebarMainText = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.color.title};
  margin-bottom: 8px;
`;

export const SidebarSubText = styled.div`
  font-size: 14px;
  color: ${theme.color.description};
  line-height: 1.3;
`;


export const ArrowIcon = styled.div`
    color: #999;
    font-size: 18px;
    transition: transform 0.2s;
    margin-right: 10px;
`;

export const ImgIcon = styled.img`
  width: 60px;
  height: 60px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;