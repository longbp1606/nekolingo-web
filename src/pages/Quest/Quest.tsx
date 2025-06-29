import {
  HomeWrapper,
  HomeContent,
  BodyContent,
  TopicContent,
  RewardCard,
  RewardImage,
  SideCardContent,
  SideCardText,
  LeftSection,
  CardSide,
  StyledSidebar,
  FooterWrapper,
  FooterRow,
  FooterLink,
  Card,
  AchievementSection,
  AchievementHeader,
  AchievementTitle,
  ViewAllLink,
  AchievementListWrapper,
  AchievementItem,
  AchievementIconWrapper,
  AchievementImg,
  AchievementInfo,
  AchievementLead,
  AchievementName,
  AchievementDesc,
  AchievementProgress,
  CardWrapper,
  HeaderTag,
  Title,
  SubText,
  ProgressWrapper,
  ProgressBar,
  ProgressFill,
  ProgressText
} from './Quest.styled'
import { useDocumentTitle } from '@/hooks'
import Sidebar from '@/components/Sidebar'
import { theme } from '@/themes';
import StatsBar from '@/components/StatsBar/StatsBar';
import { achievements } from './data';
import { Avatar } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

const Quest = () => {
  useDocumentTitle('Nekolingo')

  return (
    <>
      <Sidebar />

      <BodyContent>
        <HomeWrapper>
          <HomeContent>
            <LeftSection>
              <TopicContent>
                <CardWrapper>
                  <HeaderTag>THÁNG SÁU</HeaderTag>
                  <Title>Cày phim kiểu Zari</Title>
                  <SubText><ClockCircleOutlined style={{ marginRight: '3px' }} /> 1 NGÀY</SubText>
                  <ProgressWrapper>
                    <AchievementName>Hoàn thành 5 nhiệm vụ</AchievementName>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: '12px' }}>
                      <ProgressBar>
                        <ProgressFill style={{ width: '40%' }} />
                      </ProgressBar>
                      <ProgressText>2 / 5</ProgressText>
                    </div>
                  </ProgressWrapper>
                </CardWrapper>
                <Card>
                  <AchievementSection>
                    <AchievementHeader>
                      <AchievementTitle>Thành tích</AchievementTitle>

                      <ViewAllLink>
                        <ClockCircleOutlined style={{ marginRight: '5px' }} />
                        22 TIẾNG
                      </ViewAllLink>

                    </AchievementHeader>
                    <AchievementListWrapper>
                      {achievements.map((ach, index) => (
                        <AchievementItem key={index}>
                          <AchievementIconWrapper className={ach.className}>
                            <AchievementImg className="streak" src={ach.icon} alt={ach.name} />
                          </AchievementIconWrapper>
                          <AchievementInfo>
                            <AchievementLead>
                              <AchievementName>{ach.name}</AchievementName>
                              <AchievementDesc>{ach.progressText}</AchievementDesc>
                            </AchievementLead>
                            <AchievementProgress>
                              <div className="progress-bar" style={{ height: '18px' }}>
                                <div
                                  className={`progress-fill ${ach.percentage === 100 ? "complete" : "incomplete"}`}
                                  style={{ width: `${ach.percentage}%` }}
                                ></div>
                              </div>
                            </AchievementProgress>
                          </AchievementInfo>
                        </AchievementItem>
                      ))}
                    </AchievementListWrapper>
                  </AchievementSection>
                </Card>
              </TopicContent>
            </LeftSection>
            <StyledSidebar>
              <StatsBar />
              <CardSide>
                <SideCardContent>
                  <SideCardText>
                    <h4 style={{ color: theme.color.title, fontSize: '16px' }}>Thử thách tháng sắp mở!</h4>
                    <p style={{ color: theme.color.description, fontSize: '14px' }}>Hoàn thành các thử thách hằng tháng để giành được huy hiệu độc đáo</p>
                  </SideCardText>
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/e07e459ea20aef826b42caa71498d85f.svg"
                    alt="Practice Speaking"
                    width={70}
                    height={70}
                  />
                </SideCardContent>
              </CardSide>


              <FooterWrapper>
                <FooterRow>
                  <FooterLink>GIỚI THIỆU</FooterLink>
                  <FooterLink>CỬA HÀNG</FooterLink>
                </FooterRow>
                <FooterRow>
                  <FooterLink>NHÀ ĐẦU TƯ</FooterLink>
                  <FooterLink>ĐIỀU KHOẢN</FooterLink>
                </FooterRow>
                <FooterRow>
                  <FooterLink>QUYỀN RIÊNG TƯ</FooterLink>
                </FooterRow>
              </FooterWrapper>
            </StyledSidebar>
          </HomeContent>
        </HomeWrapper>
      </BodyContent>
    </>
  )
}

export default Quest
