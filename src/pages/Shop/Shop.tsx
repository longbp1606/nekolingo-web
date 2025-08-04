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
import { Divider, Flex, List, message, Modal, Spin } from 'antd'
import chill from "@/assets/chill.gif";
import { useEffect, useRef, useState } from 'react';
import { buyItem, getShopItem, getShopStatus } from '@/services/shopAPI';
import { useAuth, useDocumentTitle } from '@/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { HistoryOutlined } from '@ant-design/icons';
import Button from '@/components/Button';
import InfiniteScroll from 'react-infinite-scroll-component';
import { formatDateTime } from '@/utils/format-datetime';
import { dateFormat } from '@/utils/enum';
import { fetchProfile, setFreezeBought } from '@/store/user.slice';

const Shop = () => {
    useDocumentTitle('Shop | Nekolingo');

    const { profile } = useAuth();
    const balance = useSelector((state: RootState) => state.user.balance);
    const freezeBought = useSelector((state: RootState) => state.user.freeze_bought);
    const dispatch = useDispatch<AppDispatch>();
    const [items, setItems] = useState<any>([]);
    const [histories, setHistories] = useState<any[]>([]);
    const [status, setStatus] = useState<any>();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hasFetchedItemList = useRef(false);

    const fetchItemList = async () => {
        setLoading(true);
        try {
            const res = await getShopItem();
            const statusRes = await getShopStatus();
            setItems(res.data.items);
            setStatus(statusRes.data.status);
            setHistories(statusRes.data.history);
        } catch (error) {
            setItems([]);
            setHistories([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!hasFetchedItemList.current) {
            fetchItemList();
            hasFetchedItemList.current = true;
        }
    }, []);

    const postBuyItem = async (item: any) => {
        try {
            const payload = {
                item: item
            }
            const res = await buyItem(payload);
            setItems(res.data.items);
            if (res.status === 201) {
                if (item === 'STREAK_FREEZE') {
                    dispatch(setFreezeBought(true));
                }
                messageApi.success('Mua vật phẩm thành công');
                fetchItemList();
                dispatch(fetchProfile());
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
                            <ProgressText>ĐÃ TRANG BỊ {profile?.hearts} / 5</ProgressText>
                            <HeartDescription>
                                Lấp đầy trái tim để không phải lo lắng mắc lỗi sai trong bài học
                            </HeartDescription>
                        </ContentArea>
                        <PurchaseButton
                            className="buy"
                            size='large'
                            disabled={balance < item?.price || Number(profile?.hearts) >= 5}
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
                            <ProgressText>Đang có {status?.freeze?.quantity}/2</ProgressText>
                            <HeartDescription style={{ marginTop: '8px' }}>
                                Streak Freeze cho phép bạn giữ nguyên streak trong một ngày bạn không có hoạt động nào.
                            </HeartDescription>
                        </ContentArea>
                        <PurchaseButton
                            className="buy"
                            size='large'
                            disabled={balance < item?.price || !status?.freeze?.can_buy || freezeBought}
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
                            disabled={balance < item?.price || !status?.repair?.can_buy}
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
                            <ProgressText>{status?.double?.active ? "ĐÃ" : "CHƯA"} TRANG BỊ</ProgressText>
                            <HeartDescription>
                                Double or Nothing giúp bạn có thể nhận được gấp đôi phần thưởng nếu đạt yêu cầu.
                            </HeartDescription>
                        </ContentArea>
                        <PurchaseButton
                            className="buy"
                            size='large'
                            disabled={balance < item?.price || !status?.double?.can_buy}
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
                                        size='small'
                                        color='primary'
                                        className="open-btn mt-2"
                                        onClick={() => setIsModalOpen(true)}
                                        title={'Lịch sử mua hàng'}
                                        icon={<HistoryOutlined />}
                                    />

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
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <div
                    id="scrollableDiv"
                    className="h-[400px] overflow-auto pr-2"
                >
                    <InfiniteScroll
                        dataLength={histories.length}
                        next={() => { }}
                        hasMore={false}
                        loader={<></>}
                        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            loading={loading}
                            itemLayout='horizontal'
                            dataSource={histories}
                            renderItem={(item: any) => (
                                <List.Item key={item?.id}>
                                    <List.Item.Meta
                                        avatar={
                                            item?.item === 'HEART_REFILL' ? '❤️' :
                                                item?.item === 'STREAK_FREEZE' ? '🧊' :
                                                    item?.item === 'STREAK_REPAIR' ? '🔧' :
                                                        item?.item === 'DOUBLE_OR_NOTHING' ? '⭐' :
                                                            null
                                        }
                                        title={item?.item.replaceAll('_', ' ')}
                                        description={formatDateTime(new Date(item?.createdAt), dateFormat.vietnamFormat)}
                                    />
                                    <span>{item?.price} 💎</span>
                                </List.Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </Modal >
        </>
    );
};
export default Shop;