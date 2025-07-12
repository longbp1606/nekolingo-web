import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ExerciseProgressState = {
    exercise_id: string;
    user_answer: any;
    answer_time: number;
    is_correct?: boolean;
    correct_answer?: any;
    question?: any;
}

export type CompleteFullLessonState = {
    user_id: string;
    lesson_id: string;
    exercises: ExerciseProgressState[]
}

const initialState: CompleteFullLessonState = {
    user_id: '',
    lesson_id: '',
    exercises: [] 
}

const userProgressSlice = createSlice({
    name: "userProgress",
    initialState,
    reducers: {
        setUserProgress: (state, action: PayloadAction<CompleteFullLessonState>) => {
            state.user_id = action.payload.user_id;
            state.lesson_id = action.payload.lesson_id;
            state.exercises = action.payload.exercises;
        },
        setExercisesProgress: (state, action: PayloadAction<ExerciseProgressState[]>) => {
            state.exercises = action.payload;
        },
    }
});

export const { setUserProgress, setExercisesProgress } = userProgressSlice.actions;

export default userProgressSlice.reducer;