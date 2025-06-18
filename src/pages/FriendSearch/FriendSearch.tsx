import React, { useState, useMemo } from 'react';
import { friendsData } from './data';
import {
  BodyContent,
  HomeContent,
  HomeWrapper,
  Title,
  SearchContainer,
  SearchInput,
  SearchIcon,
  ClearButton,
  MainContent,
  LeftSection,
  EmptyState,
  EmptyMessage,
  SearchResults,
  ResultsHeader,
  FriendsList,
  FriendItem,
  Avatar,
  FriendInfo,
  FriendName,
  FriendUsername,
  FollowButton,
  RightSidebar,
  SidebarTitle,
  SidebarItem,
  SidebarText,
  SidebarMainText,
  SidebarSubText,
  Img,
  ArrowIcon,
  ImgIcon
} from './FriendSearch.styled';
import Sidebar from '@/components/Sidebar';
import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import friend from "@/assets/friend.gif";
import add from "@/assets/add.png";
import PopupInvite from '@/components/PopupInvite/PopupInvite';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

const FriendSearch: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFriends = useMemo(() => {
    if (!searchQuery.trim()) return [];

    return friendsData.filter(friend =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const getAvatarProps = (friend: Friend) => {
    const colors = ['#4CAF50', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF8A65', '#BA68C8'];
    const colorIndex = parseInt(friend.id) % colors.length;

    return {
      backgroundColor: colors[colorIndex],
      initials: friend.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
  };

  return (
    <>
      <Sidebar />
      <BodyContent>
        <HomeWrapper>
          <HomeContent>
            <Title>Tìm bạn</Title>
            <SearchContainer>
              <SearchIcon>
                <SearchOutlined style={{ fontSize: '20px', color: '#afafaf' }} />
              </SearchIcon>
              <SearchInput
                type="text"
                placeholder="Tên hoặc tên người dùng"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <ClearButton onClick={handleClearSearch} />
              )}
            </SearchContainer>

            <MainContent>
              <LeftSection>
                {!searchQuery ? (
                  <EmptyState>
                    <Img src={friend} alt="Friend" />
                    <EmptyMessage>
                      Kết nối bạn bè giúp học vui và hiệu quả hơn.
                    </EmptyMessage>
                  </EmptyState>
                ) : (
                  <SearchResults>
                    <ResultsHeader>{filteredFriends.length.toLocaleString()} kết quả</ResultsHeader>
                    {filteredFriends.length > 0 ? (
                      <FriendsList>
                        {filteredFriends.map((friend) => {
                          const avatarProps = getAvatarProps(friend);
                          return (
                            <FriendItem key={friend.id}>
                              <Avatar backgroundColor={avatarProps.backgroundColor}>
                                {avatarProps.initials}
                              </Avatar>
                              <FriendInfo>
                                <FriendName>{friend.name}</FriendName>
                                <FriendUsername>{friend.username}</FriendUsername>
                              </FriendInfo>
                              <FollowButton>THEO DÕI</FollowButton>
                            </FriendItem>
                          );
                        })}
                      </FriendsList>
                    ) : (
                      <EmptyMessage>Không tìm thấy kết quả phù hợp.</EmptyMessage>
                    )}
                  </SearchResults>
                )}
              </LeftSection>

              <RightSidebar>
                <SidebarTitle>Những cách kết nối khác</SidebarTitle>
                <SidebarItem onClick={() => setShowPopup(true)}>
                  <ImgIcon src={add} alt="Add" />
                  <SidebarText>
                    <SidebarMainText>
                      Mời bạn bè
                    </SidebarMainText>
                    <SidebarSubText>
                      Chia sẻ trải nghiệm học ngôn ngữ miễn phí và vui nhộn trên Duolingo tới bạn bè!
                    </SidebarSubText>
                  </SidebarText>
                  <ArrowIcon>
                    <RightOutlined />
                  </ArrowIcon>
                </SidebarItem>
              </RightSidebar>
            </MainContent>
          </HomeContent>
        </HomeWrapper>
      </BodyContent>
      {showPopup && <PopupInvite onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default FriendSearch;