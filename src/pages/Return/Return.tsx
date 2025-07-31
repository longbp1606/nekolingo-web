
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReturnWrapper, SuccessCard, SuccessIcon, Title, Message, DetailItem, DetailLabel, DetailValue, ButtonContainer } from './Return.styled';
import { CheckCircleFilled, HomeFilled } from '@ant-design/icons';
import config from '@/config';
import { useDocumentTitle } from '@/hooks';
import Button from '@/components/Button';
import { saveTransaction } from '@/services/walletAPI';
import Loading from '../Loading';

const Return = () => {
    useDocumentTitle('Payment Result | Nekolingo');
    const navigate = useNavigate();
    const location = useLocation();
    const search = location.search;
    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('success');
    const [paymentDetails, setPaymentDetails] = useState({
        amountVND: '0',
        gemsAdded: '0',
    });

    const handleCallbackTransaction = async (searchParams: string) => {
        setLoading(true);
        try {
            const response = await saveTransaction(searchParams);
            if (response.status === 200 || response.data?.success) {
                setPaymentStatus(response.data?.success ? 'success' : 'failed');
                setPaymentDetails({
                    amountVND: response.data?.amountVND || '0',
                    gemsAdded: response.data?.gemsAdded || '',
                });
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            setPaymentStatus('failed');
        }
    }

    const hasFetched = useRef(false);

    useEffect(() => {
        if (!hasFetched.current) {
            handleCallbackTransaction(search);
            hasFetched.current = true;
        }
    }, [location.search]);

    const handleReturnHome = () => {
        navigate(config.routes.public.home);
    };

    const handleReturnProfile = () => {
        navigate(config.routes.user.profile);
    };

    if (loading) return <Loading />;

    return (
        <ReturnWrapper>
            <SuccessCard status={paymentStatus}>
                <SuccessIcon>
                    <CheckCircleFilled />
                </SuccessIcon>
                <Title>{paymentStatus === 'success' ? 'Payment Successful!' : 'Payment Failed'}</Title>
                <Message>
                    {paymentStatus === 'success' 
                        ? 'Your payment has been processed successfully. Your gems have been added to your account.'
                        : 'There was an issue processing your payment. Please try again or contact support.'}
                </Message>
                
                {paymentStatus === 'success' && (
                    <div className='w-full'>
                        <DetailItem>
                            <DetailLabel>Payment Amount:</DetailLabel>
                            <DetailValue>{paymentDetails.amountVND} VND</DetailValue>
                        </DetailItem>
                        {paymentDetails.gemsAdded && (
                            <DetailItem>
                                <DetailLabel>Gems Received:</DetailLabel>
                                <DetailValue>{paymentDetails.gemsAdded}</DetailValue>
                            </DetailItem>
                        )}
                    </div>
                )}
                
                <ButtonContainer>
                    <Button 
                        color="primary" 
                        icon={<HomeFilled />} 
                        onClick={handleReturnHome}
                        title={"Return to Home"}
                    />
                    <Button
                        color='success' 
                        onClick={handleReturnProfile}
                        title={"Return to Profile"}
                    />
                </ButtonContainer>
            </SuccessCard>
        </ReturnWrapper>
    );
};

export default Return;