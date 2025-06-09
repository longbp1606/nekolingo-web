/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HomeWrapper,
  SectionHeader,
  SectionTitle,
  HomeContent,
  BodyContent,
  TopicContent,
  RightSection,
  DailyQuestCard,
  RewardCard,
  RewardImage,
  FooterLinks,
  StatHeader,
  MonthlyChallengeBox,
  SideCardContent,
  SideCardText,
  LeftSection,
  GroupCard,
  DividerLine,
  ContentChart,
  ButtonArea
} from './Quest.styled'
import { useDocumentTitle } from '@/hooks'
import Sidebar from '@/components/Sidebar'
import { Button, Flex, Image, Popover, Progress, Typography } from 'antd'
import { flags } from '@/utils/assets';
import { HeartFilled } from '@ant-design/icons';

const { Text } = Typography;

const languageContent = (
  <Flex gap={10} align='center'>
    Language
  </Flex>
)

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
                <RewardCard>
                  <div className="skin-column">
                    <h3>🎉 Nhận thưởng khi xong nhiệm vụ!</h3>
                    <p>Hôm nay bạn đã hoàn thành <strong>0 trên tổng số 3 nhiệm vụ</strong>.</p>
                  </div>
                  <RewardImage />
                </RewardCard>

                <SectionHeader>
                  <SectionTitle>Nhiệm vụ hằng ngày</SectionTitle>
                  <div style={{ color: "#f59e0b", fontWeight: 600 }}>⏰ 22 TIẾNG</div>
                </SectionHeader>

                <GroupCard>
                  <DailyQuestCard>
                    <Flex justify="space-between" align="center">
                      <ContentChart>
                        <strong>⚡ Kiếm 10 KN</strong>
                        <div style={{ position: 'relative', width: '100%' }}>
                          <Progress
                            percent={100}
                            showInfo={false}
                            status="active"
                            strokeColor="#facc15"
                            strokeWidth={14}
                            trailColor="#e5e7eb"
                            style={{ borderRadius: 50 }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#9ca3af',
                            }}
                          >
                            10 / 10
                          </div>
                        </div>

                      </ContentChart>
                      <div className="icon">🧳</div>
                    </Flex>
                  </DailyQuestCard>
                  <DividerLine></DividerLine>

                  <DailyQuestCard>
                    <Flex justify="space-between" align="center">
                      <ContentChart>
                        <strong>🎯 Đạt điểm chính xác từ 80% trở lên của 3 bài học</strong>
                        <div style={{ position: 'relative', width: '100%' }}>
                          <Progress
                            percent={66}
                            showInfo={false}
                            status="active"
                            strokeColor="#a3e635"
                            strokeWidth={14}
                            trailColor="#e5e7eb"
                            style={{ borderRadius: 50 }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#9ca3af',
                            }}
                          >
                            2 / 3
                          </div>
                        </div>
                      </ContentChart>
                      <div className="icon">📘</div>
                    </Flex>
                  </DailyQuestCard>

                  <DividerLine></DividerLine>

                  <DailyQuestCard>
                    <Flex justify="space-between" align="center">
                      <ContentChart>
                        <strong>🔊 Nghe 7 bài tập</strong>
                        <div style={{ position: 'relative', width: '100%' }}>
                          <Progress
                            percent={28}
                            showInfo={false}
                            status="active"
                            strokeColor="#38bdf8"
                            strokeWidth={14}
                            trailColor="#e5e7eb"
                            style={{ borderRadius: 50 }}
                          />
                          <div
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#9ca3af',
                            }}
                          >
                            2 / 7
                          </div>
                        </div>
                      </ContentChart>
                      <div className="icon">📙</div>
                    </Flex>
                  </DailyQuestCard>
                </GroupCard>
              </TopicContent>
            </LeftSection>

            <RightSection>
              <StatHeader>
                <Popover trigger={"hover"} content={languageContent}>
                  <Image src={flags.japan} alt='language' width={50} preview={false} />
                </Popover>
                <Popover>
                  <Flex gap={10} align='center'>
                    <HeartFilled className='text-xl text-red-500' />
                    <Text className='text-xl font-bold'>5</Text>
                  </Flex>
                </Popover>
              </StatHeader>

              <MonthlyChallengeBox>
                <SideCardContent>
                  <SideCardText>
                    <h4>Thử thách tháng sắp mở!</h4>
                    <p>Hoàn thành các thử thách hằng tháng để giành được huy hiệu độc đáo</p>
                  </SideCardText>
                  <img
                    src="https://d35aaqx5ub95lt.cloudfront.net/images/goals/e07e459ea20aef826b42caa71498d85f.svg"
                    alt="Practice Speaking"
                    width={70}
                    height={70}
                  />
                </SideCardContent>
                <ButtonArea>
                <Button type="primary" className="learn-btn" style={{width: '100%'}}>BẮT ĐẦU HỌC</Button>
                </ButtonArea>
              </MonthlyChallengeBox>

              <FooterLinks>
                <a>GIỚI THIỆU</a>
                <a>CỬA HÀNG</a>
                <a>TÍNH HIỆU QUẢ</a>
                <a>CÔNG VIỆC</a>
                <a>NHÀ ĐẦU TƯ</a>
                <a>ĐIỀU KHOẢN</a>
                <a>QUYỀN RIÊNG TƯ</a>
              </FooterLinks>
            </RightSection>
          </HomeContent>
        </HomeWrapper>
      </BodyContent>
    </>
  )
}

export default Quest
