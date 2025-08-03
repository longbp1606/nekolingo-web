import { get } from "./apiCaller";

export const getTransactionDetail = (status: string, type: string) => {
    return get(`/api/transaction/detail?status=${status}&type=${type}`);
}

export const getUserTransactions = () => {
    return get(`/api/transaction/user-history`);
}

export const getTransactionTotal = (type: string) => {
    return get(`/api/transaction/total?type=${type}`);
}

