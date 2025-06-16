import { theme } from "@/themes";
import styled from "styled-components";

export const HomeWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: "Quicksand", sans-serif;
  margin-bottom: 20px;
`;

export const BodyContent = styled.div`
  padding-left: 256px;
`;

export const HomeContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 40px;
  width: 100%;
  margin-top: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const LeftSection = styled.div`
  flex: 1;
  max-width: 600px;
`;

export const Sidebar = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

export const Card = styled.div`
    background-color: ${theme.color.white};
    border-radius: 12px;
    padding: 16px;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
`;

export const FooterWrapper = styled.div`
  font-size: 12px;
  color: #999;
  text-align: center;
  margin-top: 40px;
`;

export const FooterRow = styled.div`
  margin-bottom: 10px;
`;

export const FooterLink = styled.span`
  margin-right: 15px;

  &:last-child {
    margin-right: 0;
  }
`;

//Profile
// Profile Header Styles
export const ProfileHeader = styled.div`
  background: linear-gradient(135deg, #87CEEB 0%, #B0E0E6 100%);
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ProfileAvatar = styled.div`
  position: relative;
  margin-bottom: 20px;
  
  .avatar-placeholder {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    border: 3px dashed #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: white;
    font-weight: bold;
    transition: all 0.3s ease;
    cursor: pointer;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.4);
      transform: scale(1.05);
    }
  }
`;

export const EditButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: transparent;
  border: 2px solid white;
  border-bottom: 4px solid #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: #fff !important;
    transform: scale(1.1);
    border: 2px solid ${theme.color.primary};
    border-bottom: 4px solid ${theme.color.primary};
  }
  
  .anticon {
    font-size: 18px;
    color: ${theme.color.white};

    &:hover{
      color: ${theme.color.primary};
      transform: scale(1.1);
    }
`;

export const ProfileInfo = styled.div`
  text-align: center;
  color: white;
`;

export const ProfileName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0 0 5px 0;
  color: ${theme.color.title};
`;

export const ProfileHandle = styled.p`
  font-size: 16px;
  color: #fff;
  margin: 0 0 8px 0;
`;

export const ProfileJoinDate = styled.p`
  font-size: 14px;
  color: ${theme.color.description};
  margin: 0 0 20px 0;
`;

export const FollowSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
`;

// export const FollowButton = styled.button`
//   color: white;
//   border: none;
//   border-radius: 20px;
//   padding: 8px 20px;
//   font-size: 14px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: all 0.2s;
// `;

export const FollowStats = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #fff;
`;

export const USFlag = styled.span`
  font-size: 18px;
`;

// Stats Grid Styles
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

export const StatCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
    transform: translateY(-2px);
  }
`;

export const StatImg = styled.img`
  width: 60px;
  height: 100%;
  display: block;
`;


export const StatValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.color.title};
  line-height: 1.2;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: ${theme.color.description};
  line-height: 1.2;
`;

// Card Follow
export const TabsContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #f0f0f0;
`;

export const TabButton = styled.button<{ $active: boolean }>`
    flex: 1;
    padding: 16px 20px;
    border: none;
    background: none;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    position: relative;
    transition: all 0.2s;

    color: ${props => props.$active ? `${theme.color.primary}` : '#999'};

    &::after {
        content: '';
        position: absolute;
        border: none;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${theme.color.primary};
        transform: scaleX(${props => props.$active ? 1 : 0});
        transition: transform 0.2s ease;
    }
    
    &:hover {
        color: ${props => props.$active ? `${theme.color.primary}` : '#666'};
    }

    &:focus {
        outline: none;
        color: ${props => props.$active ? `${theme.color.primary}` : '#666'};
    }
    
    &:active {
    border: none;
        color: ${props => props.$active ? `${theme.color.primary}` : '${theme.color.title}'};
    }
`;

export const TabContent = styled.div`
    padding: 20px;
    text-align: center;
`;

export const Img = styled.img`
  width: 200px;
  height: 200px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const ImgIcon = styled.img`
  width: 60px;
  height: 60px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export const ImgIconGlass = styled.img`
  width: 60px;
  height: 60px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
`;

export const Character = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .character-body {
        width: 40px;
        height: 50px;
        border-radius: 20px 20px 8px 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        position: relative;
        
        &::before {
            content: '';
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background-color: inherit;
        }
        
        &.pink {
            background-color: #ffb3d9;
        }
        
        &.purple {
            background-color: #b19cd9;
        }
        
        &.blue {
            background-color: #87ceeb;
        }
        
        &.orange {
            background-color: #ffb84d;
        }
        
        &.dark {
            background-color: #666;
        }
        
        &.brown {
            background-color: #8b4513;
        }
        
        &.red {
            background-color: #ff6b6b;
        }
        
        &.green {
            background-color: #51cf66;
        }
        
        &.brown-light {
            background-color: #d2691e;
        }
        
        &.yellow {
            background-color: #ffd43b;
        }
    }
`;

export const EmptyMessage = styled.p`
    font-size: 14px;
    color: ${theme.color.description};
    margin-top: 15px;
    line-height: 1.5;
`;

export const AddFriendsSection = styled.div`
`;

export const Title = styled.h3`
  font-size: 25px;
  font-weight: 700;
  margin: 0;
  color: ${theme.color.title};
  margin-bottom: 10px;
`;

export const AddFriendsTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: ${theme.color.title};
    margin-bottom: 10px;
`;

export const FriendOption = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 8px;
`;

export const FriendIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-right: 16px;
    
    &.search {
        background-color: #e6f7ff;
    }
    
    &.invite {
        background-color: #f6ffed;
    }
`;

export const FriendText = styled.span`
    flex: 1;
    font-size: 14px;
    color: ${theme.color.title}; 
    font-weight: 600;
`;

export const ArrowIcon = styled.div`
    color: #999;
    font-size: 18px;
    transition: transform 0.2s;
    margin-right: 10px;
    
    ${FriendOption}:hover & {
        transform: translateX(4px);
    }
`;
