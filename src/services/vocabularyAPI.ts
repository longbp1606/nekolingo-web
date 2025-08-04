import { get, post, put, remove } from "./apiCaller"

export type CreateVocab = {
    word: string;
	meaning: string;
	language_from?: string;
	language_to?: string;
	type?: string;
}

export type UpdateVocab = {
    word?: string;
	meaning?: string;
	language_from?: string;
	language_to?: string;
	type?: string;
}

export const getListVocabs = (page: number, take: number) => {
    return get(`/api/vocabulary?page=${page}&take=${take}`);
}

export const getVocabDetail = (id: string) => {
    return get(`/api/vocabulary/${id}`);
}

export const createVocab = (vocab: CreateVocab) => {
    return post(`/api/vocabulary`, vocab);
}

export const updateVocab = (id: string, vocab: Partial<UpdateVocab>) => {
    return put(`/api/vocabulary/${id}`, vocab);
}

export const deleteVocab = (id: string) => {
    return remove(`/api/vocabulary/${id}`);
}