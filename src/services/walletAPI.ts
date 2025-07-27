import { post } from "./apiCaller";

export const depositRequest = (amount: number) => {
    return post(`/api/wallet/vnpay/deposit`, { amount });
}