import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfile } from "@/services/authAPI";

export type UserStateType = {
    user_id: string;
    hearts: number;
    balance: number;
    freeze_count: number;
    freeze_bought: boolean;
}

const initialState: UserStateType = {
    user_id: '',
    hearts: 0,
    balance: 0,
    freeze_count: 0,
    freeze_bought: false,
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
        setFreezeBought: (state, action) => {
            state.freeze_bought = action.payload;
        },
    },
});

export const { setHearts, addHeart, removeHeart, setBalance, setFreezeCount, setUserIDStore, setFreezeBought } = userSlice.actions;

// Async thunk to fetch profile
export const fetchProfile = createAsyncThunk(
    "user/fetchProfile",
    async (_, { dispatch }) => {
        const res = await getProfile();
        const data = res.data.data;
        console.log(data);
        // Dispatch actions to update each field
        dispatch(setUserIDStore(data.id));
        dispatch(setHearts(data.hearts));
        dispatch(setBalance(data.balance));
        dispatch(setFreezeCount(data.freeze_count));
        // Optionally return data if you want to use it in extraReducers
        return data;
    }
);

export default userSlice.reducer;