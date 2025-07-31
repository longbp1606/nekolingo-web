import { get, post } from "./apiCaller";

export const depositRequest = (amount: number) => {
    return post(`/api/wallet/vnpay/deposit`, { amount });
}

export const saveTransaction = (searchParams: string) => {
    return get(`/api/wallet/vnpay/return${searchParams}`);
}