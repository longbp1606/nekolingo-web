import { createSlice } from "@reduxjs/toolkit";

export type UserStateType = {
    hearts: number;
}

const initialState: UserStateType = {
    hearts: 0,
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
    },
});

export const { setHearts, addHeart, removeHeart } = userSlice.actions;

export default userSlice.reducer;