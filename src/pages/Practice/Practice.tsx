/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  HomeWrapper,
  SectionHeader,
  SectionTitle,
  HomeContent,
  LeftSection,
  TopicContent,
  BodyContent,
  DeepPracticeBox,
  PracticeCard,
  CommunicationSection,
  CardContent,
  CardText,
  CardTitle,
} from './Practice.styled'
import { useDocumentTitle } from '@/hooks'
import Sidebar from '@/components/Sidebar'
import { Button } from 'antd'
import RightSidebar from '@/components/Rightbar/Rightbar'

const Practice = () => {
  useDocumentTitle('Nekolingo');

  return (
    <>
      <Sidebar />
      <BodyContent>
        <HomeWrapper>
          <HomeContent>
            <LeftSection>
              <TopicContent>

                {/* Ôn tập hằng ngày */}
                <SectionHeader>
                  <SectionTitle>Ôn tập hằng ngày</SectionTitle>
                </SectionHeader>

                {/* Luyện tập chuyên sâu */}
                <DeepPracticeBox>
                  <div className="box-header">
                    <div className="super-label">SUPER</div>
                    <div className="box-title">Luyện tập chuyên sâu</div>
                    <div className="box-subtitle">Tập trung ôn luyện những điểm còn yếu</div>
                    <Button type="primary" className="open-btn">MỞ KHÓA</Button>
                  </div>
                </DeepPracticeBox>

                {/* Luyện giao tiếp */}
                <SectionHeader>
                  <SectionTitle>Luyện giao tiếp</SectionTitle>
                </SectionHeader>
                <CommunicationSection>
                  <PracticeCard>
                    <CardContent>
                      <CardText>
                        <CardTitle>
                          <div className="practice-title">Luyện nói</div>
                          <div className="super-label">SUPER</div>
                        </CardTitle>
                        <div className="practice-subtitle">Cải thiện kỹ năng nói những cụm từ này nhé</div>
                      </CardText>
                      {/* <div className="icon-circle">🎤</div> */}
                      <img
                        src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/3e81c469cbffa24102aa839524868adf.svg"
                        alt="Practice Speaking"
                        width={70}
                        height={70}
                      />
                    </CardContent>
                  </PracticeCard>

                  <PracticeCard>
                    <CardContent>
                      <CardText>
                        <CardTitle>
                          <div className="practice-title">Luyện nghe</div>
                          <div className="super-label">SUPER</div>
                        </CardTitle>
                        <div className="practice-subtitle">Trau dồi kỹ năng nghe với phiên bản chỉ có âm thanh của câu</div>
                      </CardText>
                      {/* <div className="icon-circle">🎧</div> */}
                      <img
                        src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/2ebe830fd55a7f2754d371bcd79faf32.svg"
                        alt="Practice Listening"
                        width={70}
                        height={70}
                      />
                    </CardContent>
                  </PracticeCard>
                </CommunicationSection>

                {/* Góc học tập */}
                <SectionHeader>
                  <SectionTitle>Góc học tập</SectionTitle>
                </SectionHeader>
                <PracticeCard>
                  <CardContent>
                    <CardText>
                      <CardTitle>
                        <div className="practice-title">Các lỗi sai cũ</div>
                        <div className="super-label">SUPER</div>
                      </CardTitle>
                      <div className="practice-subtitle">Hãy bắt đầu bài học tập trung vào các lỗi sai của riêng bạn</div>
                    </CardText>
                    {/* <div className="error-tag">3</div> */}
                    <img
                      src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/648b88c8b70ebaaff919e49b0aa54949.svg"
                      alt="Practice Listening"
                      width={70}
                      height={70}
                    />
                  </CardContent>
                </PracticeCard>

                <PracticeCard>
                  <CardContent>
                    <CardText>
                      <CardTitle>
                        <div className="practice-title">Từ vựng</div>
                        <div className="super-label">SUPER</div>
                      </CardTitle>
                      <div className="practice-subtitle">Ôn tập từ vựng Tiếng Anh của riêng bạn bất kỳ lúc nào</div>
                    </CardText>
                    {/* <div className="error-tag">3</div> */}
                    <img
                      src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/9d1604d8e8f843b492862b21a8a4e822.svg"
                      alt="Practice Listening"
                      width={70}
                      height={70}
                    />
                  </CardContent>
                </PracticeCard>

                <PracticeCard>
                  <CardContent>
                    <CardText>
                      <CardTitle>
                        <div className="practice-title">Kho truyện</div>
                        <div className="super-label">SUPER</div>
                      </CardTitle>
                      <div className="practice-subtitle">Đọc lại một câu chuyện để ôn tập các từ vựng trong ngữ cảnh nhé</div>
                    </CardText>
                    {/* <div className="error-tag">3</div> */}
                    <img
                      src="https://d35aaqx5ub95lt.cloudfront.net/images/practiceHub/2c76c04c8e99125ccda0b74b11ac468e.svg"
                      alt="Practice Listening"
                      width={70}
                      height={70}
                    />
                  </CardContent>
                </PracticeCard>

              </TopicContent>
            </LeftSection>
            <RightSidebar />
          </HomeContent>
        </HomeWrapper>
      </BodyContent>
    </>
  )
}

export default Practice;