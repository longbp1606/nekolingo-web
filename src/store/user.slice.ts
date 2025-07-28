import { createSlice } from "@reduxjs/toolkit";

export type UserStateType = {
    user_id: string;
    hearts: number;
    balance: number;
    freeze_count: number;
}

const initialState: UserStateType = {
    user_id: '',
    hearts: 0,
    balance: 0,
    freeze_count: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserIDStore: (state, action) => {
            state.user_id = action.payload;
        },
        setHearts: (state, action) => {
            state.hearts = action.payload;
        },
        addHeart: (state) => {
            state.hearts += 1;
        },
        removeHeart: (state) => {
            state.hearts -= 1;
        },
        setBalance: (state, action) => {
            state.balance = action.payload; 
        },
        setFreezeCount: (state, action) => {
            state.freeze_count = action.payload;
        },
    },
});

export const { setHearts, addHeart, removeHeart, setBalance, setFreezeCount, setUserIDStore } = userSlice.actions;

export default userSlice.reducer;