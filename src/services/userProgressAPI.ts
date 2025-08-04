import { CompleteFullLessonState } from "@/store/userProgress.slice";
import { get, post } from "./apiCaller";

const apiUrl = '/api/user-progress';

export type SubmitExerciseType = {
    user_id: string;
    exercise_id: string;
    user_answer: any;
    answer_time: number;
}

export const submitExercise = (request: SubmitExerciseType) => {
    return post(`${apiUrl}/submit-exercise`, request);
}

export const completeFullLesson = (request: CompleteFullLessonState) => {
    return post(`${apiUrl}/complete-full-lesson`, request);
}

export const explainAnswer = (payload: object) => {
    return post(`${apiUrl}/explain-answer`, payload);
}

export const generatePersonalizedLesson = (payload: object) => {
    return post(`${apiUrl}/generate-personalized-lesson`, payload);
}

export const getRecoveryLesson = (userId: string) => {
    return get(`${apiUrl}/heart-recovery-lesson/${userId}`);
}