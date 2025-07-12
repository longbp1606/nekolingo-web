import { CompleteFullLessonState } from "@/store/userProgress.slice";
import { post } from "./apiCaller";

const apiUrl = '/api/user-progress'

export const completeFullLesson = (request: CompleteFullLessonState) => {
    return post(`${apiUrl}/complete-full-lesson`, request);
}