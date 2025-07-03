import { get, post, put, remove } from "./apiCaller";

export type CreateExercise = {
  type: string;
  question_format: string;
  question: string;
  correct_answer: string;
  options?: string[];
  audio_url?: string;
  image_url?: string;
  lesson: string;
  vocabulary?: string;
  grammar?: string;
  extra_data?: Record<string, string>;
};

export type UpdateExercise = {
  type?: string;
  question_format?: string;
  question?: string;
  options?: string[];
  audio_url?: string;
  image_url?: string;
  lesson?: string;
  ocabulary?: string;
  grammar?: string;
  extra_data?: Record<string, string>;
};

export const getListExercises = (page: number, take: number) => {
  let url = "/api/exercise?";
  if (page !== undefined) {
    url += `&page=${page}`;
  }
  if (take !== undefined) {
    url += `&take=${take}`;
  }
  return get(url);
};

export const getExerciseDetail = (id: string) => {
  return get(`/api/exercise/${id}`);
};

export const createExercise = (exercise: CreateExercise) => {
  return post(`/api/exercise`, exercise);
};

export const updateExercise = (id: string, exercise: UpdateExercise) => {
  return put(`/api/exercise/${id}`, exercise);
};

export const deleteExercise = (id: string) => {
  return remove(`/api/exercise/${id}`);
};
