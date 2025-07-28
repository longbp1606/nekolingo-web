import { CompleteFullLessonState } from "@/store/userProgress.slice";
import { post } from "./apiCaller";

const apiUrl = '/api/user-progress'

export const completeFullLesson = (request: CompleteFullLessonState) => {
    return post(`${apiUrl}/complete-full-lesson`, request);
}

export const explainAnswer = (payload: object) => {
    return post(`${apiUrl}/explain-answer`, payload);
}

export const generatePersonalizedLesson = (payload: object) => {
    return post(`${apiUrl}/generate-personalized-lesson`, payload);
}