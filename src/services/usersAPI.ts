import { get, post, patch, remove } from "./apiCaller";

export type CreateUser = {
    email: string;
	password: string;
	role?: number;
	username?: string;
	avatar_url?: string;
	current_level?: number;
	xp?: number;
	weekly_xp?: number;
	hearts?: number;
	streak_days?: number;
	is_freeze?: boolean;
	last_active_date?: Date;
	freeze_count?: number;
	language_from?: string;
	language_to?: string;
	is_premiere?: boolean;
};

export type UpdateUser = {
    _id: string;
	email: string;
	role: string;
	avatarUrl: string;
	currentLevel: number;
	xp: number;
	weeklyXp: number;
	streakDays: number;
	isFreeze: boolean;
	lastActiveDate: Date;
	freezeCount: number;
	languageFrom: string;
	languageTo: string;
	is_premiere: boolean;
};

export const getListUsers = () => {
    return get("/api/user");
}

export const getUserDetail = (id: string) => {
  return get(`/api/user/${id}`);
};

export const createUser = (user: CreateUser) => {
  return post(`/api/user`, user);
};

export const updateUser = (id: string, user: UpdateUser) => {
  return patch(`/api/user/${id}`, user);
};

export const deleteUser = (id: string) => {
  return remove(`/api/user/${id}`);
};
