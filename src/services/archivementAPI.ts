import { get, post, patch, remove } from "./apiCaller";

export type ArchiveConditionDto = {
  type: string;
  value?: number;
};

export type CreateArchivement = {
  title: string;
  description: string;
  icon: string;
  condition: ArchiveConditionDto;
};

export type UpdateArchivement = {
  title: string;
  description: string;
  icon: string;
  condition: ArchiveConditionDto;
};

export type CreateUserArchivement = {
  user_id: string;
  archivement_id: string;
  unlock_at?: Date;
};

export const getArchivement = () => {
  return get("/api/archivement/list");
};

export const getArchivementDetail = (id: string) => {
  return get(`/api/archivement/${id}`);
};

export const createArchivement = (archive: CreateArchivement) => {
  return post(`/api/archivement`, archive);
};

export const updateArchivement = (id: string, archive: UpdateArchivement) => {
  return patch(`/api/archivement/${id}`, archive);
};

export const deleteArchivement = (id: string) => {
  return remove(`/api/archivement/${id}`);
};

// User Archivement APIs
export const getUserArchivement = (id: string) => {
  return get(`/api/user-archivement/${id}`);
};

export const createUserArchivement = (archive: CreateUserArchivement) => {
  return post(`/api/user-archivement`, archive);
};
