import { get, post, put, remove } from "./apiCaller"

export type CreateTopic = {
    title: string;
	order: number;
	description?: string;
	course: string;
}

export type UpdateTopic = {
    title?: string;
	order?: number;
	description?: string;
}

export const getListTopics = (page: number, take: number, courseId: string) => {
    return get(`/api/topic?page=${page}&take=${take}&courseId=${courseId}`);
}

export const getTopicsAll = () => {
    return get("/api/topic/listTopics");
}

export const getTopicDetail = (id: string) => {
    return get(`/api/topic/${id}`);
}

export const getTopicCourse = (courseId: string) => {
    return get(`/api/topic/course/${courseId}`);
}

export const createTopic = (topic: CreateTopic) => {
    return post(`/api/topic`, topic);
}

export const updateTopic = (id: string, topic: Partial<UpdateTopic>) => {
    return put(`/api/topic/${id}`, topic);
}

export const deleteTopic = (id: string) => {
    return remove(`/api/topic/${id}`);
}