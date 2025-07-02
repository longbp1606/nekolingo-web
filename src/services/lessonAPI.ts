import { get, post, put, remove } from "./apiCaller";

export type CreateLesson = {
    title: string;
	order: number;
	xp_reward: number;
	topic: string;
	type: "vocabulary" | "grammar" | "listening" | "reading" | "speaking";
	description?: string;
};

export type UpdateLesson = {
    title?: string;
	order?: number;
	xp_reward?: number;
	topic?: string;
	type?: "vocabulary" | "grammar" | "listening" | "reading" | "speaking";
	description?: string;
};

export const getListLessons = (
  page: number,
  take: number
) => {
  let url = "/api/lesson?";
  if (page !== undefined) {
    url += `&page=${page}`;
  }
  if (take !== undefined) {
    url += `&take=${take}`;
  }
  return get(url);
};

export const getLessonDetail = (id: string) => {
  return get(`/api/lesson/${id}`);
};

export const createLesson = (lesson: CreateLesson) => {
  return post(`/api/lesson`, lesson);
};

export const updateLesson = (id: string, lesson: UpdateLesson) => {
  return put(`/api/lesson/${id}`, lesson);
};

export const deleteLesson = (id: string) => {
  return remove(`/api/lesson/${id}`);
};
