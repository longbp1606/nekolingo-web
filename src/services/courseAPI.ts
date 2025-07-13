import { get, post, patch, remove } from "./apiCaller";

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

export const getListCourses = (
  page: number,
  take: number
) => {
  let url = "/api/course?";
  if (page !== undefined) {
    url += `&page=${page}`;
  }
  if (take !== undefined) {
    url += `&take=${take}`;
  }
  return get(url);
};

export const getCourseDetail = (id: string) => {
  return get(`/api/course/${id}`);
};

export const createCourse = (course: CreateCourse) => {
  return post(`/api/course`, course);
};

export const updateCourse = (id: string, course: UpdateCourse) => {
  return patch(`/api/course/${id}`, course);
};

export const deleteCourse = (id: string) => {
  return remove(`/api/course/${id}`);
};

export const getCourseMetaData = (id: string) => {
  return get(`/api/course/metadata/${id}`);
}
