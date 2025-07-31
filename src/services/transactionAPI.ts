import { get } from "./apiCaller";

export const getUserTransactions = () => {
    return get(`/api/transaction/user-history`);
}
