import { get, post, put, remove } from "./apiCaller";

export type CreateCourse = {
  title: string;
  description?: string;
  language_from: string;
  language_to: string;
};

export type UpdateCourse = {
  title?: string;
  description?: string;
  language_from?: string;
  language_to?: string;
};

export const getListCourses = (page: number, take: number) => {
  return get(`/api/course?page=${page}&take=${take}`);
};

export const getCourseDetail = (id: string) => {
  return get(`/api/course/${id}`);
};

export const createCourse = (course: CreateCourse) => {
  return post(`/api/course`, course);
};

export const updateCourse = (id: string, topic: UpdateCourse) => {
  return put(`/api/course/${id}`, topic);
};

export const deleteCourse = (id: string) => {
  return remove(`/api/course/${id}`);
};
