import { createSlice } from "@reduxjs/toolkit";

export type UserStateType = {
    hearts: number;
    balance: number;
    freeze_count: number;
}

const initialState: UserStateType = {
    hearts: 0,
    balance: 0,
    freeze_count: 0,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
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

export const { setHearts, addHeart, removeHeart, setBalance, setFreezeCount } = userSlice.actions;

export default userSlice.reducer;