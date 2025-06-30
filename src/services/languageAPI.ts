import { get, post, put, remove } from "./apiCaller"

export type CreateLanguage = {
    name: string;
	code: string;
	flag_url?: string;
}

export type UpdateLanguage = {
    name?: string;
	code?: string;
	flag_url?: string;
}

export const getListLanguages = (
    page: number,
    take: number
  ) => {
    let url = "/api/language?";
    if (page !== undefined) {
      url += `&page=${page}`;
    }
    if (take !== undefined) {
      url += `&take=${take}`;
    }
    return get(url);
  };

export const getLanguageDetail = (id: string) => {
    return get(`/api/language/${id}`);
}

export const createLanguage = (language: CreateLanguage) => {
    return post(`/api/language`, language);
}

export const updateLanguage = (id: string, language: UpdateLanguage) => {
    return put(`/api/language/${id}`, language);
}

export const deleteLanguage = (id: string) => {
    return remove(`/api/language/${id}`);
}