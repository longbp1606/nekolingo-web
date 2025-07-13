import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MetadataState = {
    courseMetadata: any;
    lessonMetadata: any;
}

const initialState: MetadataState = {
    courseMetadata: {},
    lessonMetadata: {},
};

const metadataSlice = createSlice({
    name: "metadata",
    initialState,
    reducers: {
        setCourseMetadata: (state, action: PayloadAction<any>) => {
            state.courseMetadata = action.payload;
        },
        setLessonMetadata: (state, action: PayloadAction<any>) => {
            state.lessonMetadata = action.payload;
        },
    } 
});

export const {
    setCourseMetadata,
    setLessonMetadata,
} = metadataSlice.actions;

export default metadataSlice.reducer;