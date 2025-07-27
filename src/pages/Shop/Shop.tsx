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
import { Button, Flex, InputNumber, message, Modal } from 'antd'
import chill from "@/assets/chill.gif";
import { useEffect, useState } from 'react';
import { buyItem, getShopItem, getShopStatus } from '@/services/shopAPI';
import { useDocumentTitle } from '@/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { depositRequest } from '@/services/walletAPI';

const Shop = () => {
    useDocumentTitle('Shop | Nekolingo');

    const balance = useSelector((state: RootState) => state.user.balance);
    const [items, setItems] = useState<any>([]);
    const [status, setStatus] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [amount, setAmount] = useState(100);

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

    const createPaymentRequest = async () => {
        try {
            const res = await depositRequest(50000);
            if (res.status === 201) {
                window.location.href = res.data.url;
            }
        } catch (error: any) {
            messageApi.error(error.response.data.message);
        }
    }

    const createPaymentOrder = async (amount: number) => {
        try {
            const res = await depositRequest(amount);
            if (res.status === 201) {
                window.location.href = res.data.url;
            }
        } catch (error: any) {
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
                                    <div className="super-label">SUPER</div>
                                    <div className="super-box">
                                        <SuperImage src={chill} alt="Super Logo" className="super-img" />
                                        <Flex vertical>
                                            <div className="box-title">Đăng ký ngay Super Nekolingo để nhận được nhiều quyền lợi miễn phí</div>
                                            {/* Super Nekolingo interests list */}
                                            <ul style={{ margin: '16px 0 16px 0', padding: '0 0 0 20px', color: '#aaa', fontSize: '15px' }}>
                                                <li>Không giới hạn số lần hồi phục trái tim</li>
                                                <li>Truy cập các bài luyện tập nâng cao</li>
                                                <li>Nhận gấp đôi phần thưởng mỗi ngày</li>
                                                <li>Ưu tiên hỗ trợ khách hàng</li>
                                                <li>Không quảng cáo làm phiền</li>
                                            </ul>
                                        </Flex>
                                    </div>

                                    <Button
                                        type="primary"
                                        className="open-btn"
                                        style={{ width: '100%' }}
                                        onClick={() => createPaymentRequest()}
                                    >
                                        ĐĂNG KÝ CHỈ VỚI 50.000đ/THÁNG
                                    </Button>
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
                                        + NẠP TIỀN
                                    </Button>
                                </Flex>

                                <Section>
                                    {loading ? <div>Loading...</div> : (
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
                title="Nạp tiền"
                open={isModalOpen}
                onOk={() => createPaymentOrder(amount)}
                onCancel={() => setIsModalOpen(false)}
            >
                <p>Nhập số tiền cần nạp</p>
                <InputNumber
                    min={100}
                    max={10000000}
                    step={100}
                    defaultValue={100}
                    addonAfter="VNĐ"
                    onChange={(value) => setAmount(value === null ? 10000 : value)}
                />
            </Modal>
        </>
    );
};
export default Shop;