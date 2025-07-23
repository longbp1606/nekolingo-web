import { createSlice } from "@reduxjs/toolkit";

export type RegisterStateType = {
    language_from: string;
    language_to: string;
    currentLevel: number;
}

export const initialState: RegisterStateType = {
    language_from: 'vi',
    language_to: '',
    currentLevel: 0,
}

export const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setLanguageFrom: (state, action) => {
            state.language_from = action.payload;
        },
        setLanguageTo: (state, action) => {
            state.language_to = action.payload;
        },
        setLevel: (state, action) => {
            state.currentLevel = action.payload;
        },
    },
});

export const { setLanguageFrom, setLanguageTo, setLevel } = registerSlice.actions;

export default registerSlice.reducer;