import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./course.slice.ts";
import metadataReducer from "./metadata.slice.ts";
import userProgressReducer from "./userProgress.slice.ts";

export const store = configureStore({
    reducer: {
        course: courseReducer,
        metadata: metadataReducer,
        userProgress: userProgressReducer,
    },
    middleware: (getDefaultMiddleWare) => 
        getDefaultMiddleWare({
            serializableCheck: false
        }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;