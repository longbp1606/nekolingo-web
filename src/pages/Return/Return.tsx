
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReturnWrapper, SuccessCard, SuccessIcon, Title, Message, DetailItem, DetailLabel, DetailValue, ButtonContainer } from './Return.styled';
import { CheckCircleFilled, HomeFilled } from '@ant-design/icons';
import config from '@/config';
import { useAuth, useDocumentTitle } from '@/hooks';
import { useDispatch } from 'react-redux';
import { setBalance } from '@/store/user.slice';
import Button from '@/components/Button';
import { updateUser } from '@/services/usersAPI';

const Return = () => {
    useDocumentTitle('Payment Result | Nekolingo');
    const { profile } = useAuth();
    const userID = profile ? profile.id : null;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [paymentStatus, setPaymentStatus] = useState('success');
    const [paymentDetails, setPaymentDetails] = useState({
        amount: '0',
        transactionId: '',
        paymentDate: ''
    });

    const updateUserBalance = async (userID: string, balance: number) => {
        try {
            const response = await updateUser(userID, { balance });
            console.log('User balance updated:', response.data);
        } catch (error) {
            console.error('Error updating user balance:', error);
        }
    };

    useEffect(() => {
        // Parse URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const vnp_Amount = searchParams.get('vnp_Amount') || '0';
        const vnp_TransactionStatus = searchParams.get('vnp_TransactionStatus');
        const vnp_TxnRef = searchParams.get('vnp_TxnRef') || '';
        const vnp_PayDate = searchParams.get('vnp_PayDate') || '';
        
        // Format payment date if available
        let formattedDate = '';
        if (vnp_PayDate) {
            const year = vnp_PayDate.substring(0, 4);
            const month = vnp_PayDate.substring(4, 6);
            const day = vnp_PayDate.substring(6, 8);
            const hour = vnp_PayDate.substring(8, 10);
            const minute = vnp_PayDate.substring(10, 12);
            const second = vnp_PayDate.substring(12, 14);
            formattedDate = `${day}/${month}/${year} ${hour}:${minute}:${second}`;
        }

        // Convert amount from VND to gems (divide by 1000)
        const amountInGems = vnp_Amount ? Math.floor(parseInt(vnp_Amount) / 100000) : 0;
        
        setPaymentDetails({
            amount: amountInGems.toString(),
            transactionId: vnp_TxnRef,
            paymentDate: formattedDate
        });

        // Check payment status
        if (vnp_TransactionStatus === '00') {
            setPaymentStatus('success');
            // Update user balance in Redux store
            dispatch(setBalance(amountInGems));
            if (userID) {
                updateUserBalance(userID, amountInGems);
            }
        } else {
            setPaymentStatus('failed');
        }
    }, [location.search, dispatch, userID]);

    const handleReturnHome = () => {
        navigate(config.routes.public.home);
    };

    const handleReturnShop = () => {
        navigate(config.routes.user.shop);
    };

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
                    <div>
                        <DetailItem>
                            <DetailLabel>Amount:</DetailLabel>
                            <DetailValue>{paymentDetails.amount} Gems</DetailValue>
                        </DetailItem>
                        {paymentDetails.transactionId && (
                            <DetailItem>
                                <DetailLabel>Transaction ID:</DetailLabel>
                                <DetailValue>{paymentDetails.transactionId}</DetailValue>
                            </DetailItem>
                        )}
                        {paymentDetails.paymentDate && (
                            <DetailItem>
                                <DetailLabel>Payment Date:</DetailLabel>
                                <DetailValue>{paymentDetails.paymentDate}</DetailValue>
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
                        onClick={handleReturnShop}
                        title={"Return to Shop"}
                    />
                </ButtonContainer>
            </SuccessCard>
        </ReturnWrapper>
    );
};

export default Return;