import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CourseStoreState = {
    courseId: string;
};

const initialState: CourseStoreState = {
    courseId: '',
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourseId: (state, action: PayloadAction<string>) => {
            state.courseId = action.payload;
        }
    }
});

export const { setCourseId } = courseSlice.actions;

export default courseSlice.reducer;