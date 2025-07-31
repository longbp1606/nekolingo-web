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
    BlueHeartIcon,
    IceSymbol,
    ProgressText,
    PurchaseButton,
    GemsIcon,
} from './Shop.styled';
import Sidebar from '@/components/Sidebar';
import { Button, Flex, message, Modal, Spin } from 'antd'
import chill from "@/assets/chill.gif";
import { useEffect, useState } from 'react';
import { buyItem, getShopItem, getShopStatus } from '@/services/shopAPI';
import { useDocumentTitle } from '@/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Shop = () => {
    useDocumentTitle('Shop | Nekolingo');

    const balance = useSelector((state: RootState) => state.user.balance);
    const [items, setItems] = useState<any>([]);
    const [status, setStatus] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchItemList = async () => {
        setLoading(true);
        try {
            const res = await getShopItem();
            const statusRes = await getShopStatus();
            setItems(res.data.items);
            setStatus(statusRes.data.status);
        } catch (error) {
            setItems([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchItemList();
    }, []);

    const postBuyItem = async (item: any) => {
        try {
            const payload = {
                item: item
            }
            const res = await buyItem(payload);
            setItems(res.data.items);
            if (res.status === 201) {
                messageApi.success('Mua vật phẩm thành công');
                fetchItemList();
            }
        } catch (error: any) {
            // console.log(error);
            messageApi.error(error.response.data.message);
        }
    }

    const renderItem = (item: any) => {
        switch (item.item) {
            case 'HEART_REFILL':
                return (
                    <HeartCard key={item.id}>
                        <PinkHeartIcon>
                            <HeartSymbol>❤️</HeartSymbol>
                        </PinkHeartIcon>
                        <ContentArea>
                            <HeartTitle>{item.item.replaceAll('_', ' ')}</HeartTitle>
                            <ProgressText>ĐÃ TRANG BỊ {status?.hearts} / 5</ProgressText>
                            <HeartDescription>
                                Lấp đầy trái tim để không phải lo lắng mắc lỗi sai trong bài học
                            </HeartDescription>
                        </ContentArea>
                        <PurchaseButton
                            className="buy"
                            size='large'
                            disabled={balance < item?.price}
                            onClick={() => postBuyItem(item?.item)}
                        >
                            MUA VỚI GIÁ: <GemsIcon>💎</GemsIcon> {item?.price}
                        </PurchaseButton>
                    </HeartCard>
                );
                break;
            case 'STREAK_FREEZE':
                return (
                    <HeartCard key={item.item}>
                        <BlueHeartIcon>
                            <IceSymbol>🧊</IceSymbol>
                        </BlueHeartIcon>
                        <ContentArea>
                            <HeartTitle>{item?.item?.replaceAll('_', ' ')}</HeartTitle>
                            <ProgressText>{status?.is_freeze ? "ĐÃ" : "CHƯA"} TRANG BỊ</ProgressText>
                            <HeartDescription style={{ marginTop: '8px' }}>
                                Streak Freeze cho phép bạn giữ nguyên streak trong một ngày bạn không có hoạt động nào.
                            </HeartDescription>
                        </ContentArea>
                        <PurchaseButton
                            className="buy"
                            size='large'
                            disabled={balance < item?.price}
                            onClick={() => postBuyItem(item?.item)}
                        >
                            MUA VỚI GIÁ: <GemsIcon>💎</GemsIcon> {item.price}
                        </PurchaseButton>
                    </HeartCard>
                )
                break;
            case 'STREAK_REPAIR':
                return (
                    <HeartCard key={item.id}>
                        <GradientHeartIcon>
                            <HeartSymbol>🔧</HeartSymbol>
                        </GradientHeartIcon>
                        <ContentArea>
                            <HeartTitle>{item?.item?.replaceAll('_', ' ')}</HeartTitle>
                            <HeartDescription>
                                Streak Repair giúp bạn có thể hoàn lại streak bị mất trong một ngày.
                            </HeartDescription>
                        </ContentArea>
                        <PurchaseButton
                            className="buy"
                            size='large'
                            disabled={balance < item?.price}
                            onClick={() => postBuyItem(item?.item)}
                        >
                            MUA VỚI GIÁ: <GemsIcon>💎</GemsIcon> {item.price}
                        </PurchaseButton>
                    </HeartCard>
                );
                break;
            case 'DOUBLE_OR_NOTHING':
                return (
                    <HeartCard key={item.id}>
                        <GradientHeartIcon>
                            <InfinitySymbol>⭐</InfinitySymbol>
                        </GradientHeartIcon>
                        <ContentArea>
                            <HeartTitle>{item?.item?.replaceAll('_', ' ')}</HeartTitle>
                            <ProgressText>{status?.double_or_nothing ? "ĐÃ" : "CHƯA"} TRANG BỊ</ProgressText>
                            <HeartDescription>
                                Double or Nothing giúp bạn có thể nhận được gấp đôi phần thưởng nếu đạt yêu cầu.
                            </HeartDescription>
                        </ContentArea>
                        <PurchaseButton
                            className="buy"
                            size='large'
                            disabled={balance < item?.price}
                            onClick={() => postBuyItem(item?.item)}
                        >
                            MUA VỚI GIÁ: <GemsIcon>💎</GemsIcon> {item.price}
                        </PurchaseButton>
                    </HeartCard>
                );
                break;
        }
    }

    return (
        <>
            {contextHolder}
            <Sidebar />
            <BodyContent>
                <HomeWrapper>
                    <HomeContent>
                        <LeftSection>
                            <DeepPracticeBox>
                                <div className="box-header">
                                    <div className="super-box">
                                        <SuperImage src={chill} alt="Super Logo" className="super-img" />
                                        <Flex vertical>
                                            <div className="box-title">Mua ngay vật phẩm để cải thiện tiến trình của bạn</div>
                                            {/* Super Nekolingo interests list */}
                                            <ul style={{ margin: '16px 0 16px 0', padding: '0 0 0 20px', color: '#eee', fontSize: '15px' }}>
                                                <li>Hồi phục trái tim</li>
                                                <li>Không lo mất chuỗi streak</li>
                                                <li>Nhận gấp đôi phần thưởng mỗi ngày</li>
                                            </ul>
                                        </Flex>
                                    </div>
                                </div>
                            </DeepPracticeBox>
                            <Container>
                                <Flex justify='space-between' align='center'>
                                    <Title>Danh sách vật phẩm</Title>
                                    <Button
                                        type="primary"
                                        className="open-btn mt-2"
                                        onClick={() => setIsModalOpen(true)}
                                    >
                                        Lịch sử mua hàng
                                    </Button>
                                </Flex>

                                <Section>
                                    {loading ? <Spin /> : (
                                        items?.map((item: any) => renderItem(item))
                                    )}
                                </Section>
                            </Container>
                        </LeftSection>
                        <RightSidebar />
                    </HomeContent>
                </HomeWrapper>
            </BodyContent>
            <Modal
                title="Lịch sử mua hàng"
                open={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
            >
                Test modal
            </Modal>
        </>
    );
};
export default Shop;