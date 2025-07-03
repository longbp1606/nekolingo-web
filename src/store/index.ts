import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./course.slice.ts";

export const store = configureStore({
    reducer: {
        course: courseReducer,
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare({
            serializableCheck: false
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;