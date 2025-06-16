import RightSidebar from '@/components/Rightbar/Rightbar';
import {
    BodyContent,
    LeftSection,
    HomeWrapper,
    HomeContent,
    DeepPracticeBox,
    SuperImage,
    Container,
    Title,
    Section,
    PinkHeartIcon,
    HeartCard,
    HeartSymbol,
    ContentArea,
    HeartTitle,
    HeartDescription,
    GradientHeartIcon,
    InfinitySymbol,
    SectionTitle,
    BlueHeartIcon,
    IceSymbol,
    ProgressText,
    PurchaseButton,
    GemsIcon,
} from './Shop.styled';
import Sidebar from '@/components/Sidebar';
import { Button } from 'antd'
import chill from "@/assets/chill.gif";

const Shop = () => {
    return (
        <>
            <Sidebar />
            <BodyContent>
                <HomeWrapper>
                    <HomeContent>
                        <LeftSection>
                            <DeepPracticeBox>
                                <div className="box-header">
                                    <div className="super-label">SUPER</div>
                                    <div className="super-box">
                                        <SuperImage src={chill} alt="Super Logo" className="super-img" />
                                        <div className="box-title">Bắt đầu 2 tuần dùng thử miễn phí để tận hưởng các quyền lợi độc quyền của Super</div>
                                    </div>

                                    <Button type="primary" className="open-btn" style={{ width: '100%' }}> BẮT ĐẦU 14 NGÀY DÙNG THỬ MIỄN PHÍ</Button>
                                </div>
                            </DeepPracticeBox>
                            <Container>
                                <Title>Trái tim</Title>

                                <Section>
                                    <HeartCard>
                                        <PinkHeartIcon>
                                            <HeartSymbol>❤️</HeartSymbol>
                                        </PinkHeartIcon>
                                        <ContentArea>
                                            <HeartTitle>Hồi phục Trái tim</HeartTitle>
                                            <HeartDescription>
                                                Lấp đầy trái tim để không phải lo lắng mắc lỗi sai trong bài học
                                            </HeartDescription>
                                        </ContentArea>
                                        <PurchaseButton className="full">ĐẦY ĐỦ</PurchaseButton>
                                    </HeartCard>

                                    <HeartCard>
                                        <GradientHeartIcon>
                                            <InfinitySymbol>∞</InfinitySymbol>
                                        </GradientHeartIcon>
                                        <ContentArea>
                                            <HeartTitle>Trái tim vô hạn</HeartTitle>
                                            <HeartDescription>
                                                Không bao giờ hết trái tim khi học với Super!
                                            </HeartDescription>
                                        </ContentArea>
                                        <PurchaseButton className="free">THỬ MIỄN PHÍ</PurchaseButton>
                                    </HeartCard>
                                </Section>

                                <Section>
                                    <SectionTitle>Tăng sức mạnh</SectionTitle>

                                    <HeartCard>
                                        <BlueHeartIcon>
                                            <IceSymbol>🧊</IceSymbol>
                                        </BlueHeartIcon>
                                        <ContentArea>
                                            <HeartTitle>Streak Freeze</HeartTitle>
                                            <ProgressText>ĐÃ TRANG BỊ 0 / 2</ProgressText>
                                            <HeartDescription style={{ marginTop: '8px' }}>
                                                Streak Freeze cho phép bạn giữ nguyên streak trong một ngày bạn không có hoạt động nào.
                                            </HeartDescription>
                                        </ContentArea>
                                        <PurchaseButton className="buy">
                                            MUA VỚI GIÁ: <GemsIcon>💎</GemsIcon> 200
                                        </PurchaseButton>
                                    </HeartCard>
                                </Section>
                            </Container>
                        </LeftSection>
                        <RightSidebar />
                    </HomeContent>
                </HomeWrapper>
            </BodyContent>
        </>
    );
};
export default Shop;