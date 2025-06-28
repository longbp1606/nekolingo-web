import { get, post, put, remove } from "./apiCaller"

export type CreateGrammar = {
    name: string;
	description: string;
	condition: string;
}

export type UpdateGrammar = {
    name?: string;
	description?: string;
	condition?: string;
}

export const getListGrammars = () => {
    return get("/api/grammar");
}

export const getGrammarDetail = (id: string) => {
    return get(`/api/grammar/${id}`);
}

export const createGrammar = (grammar: CreateGrammar) => {
    return post(`/api/grammar`, grammar);
}

export const updateGrammar = (id: string, grammar: Partial<UpdateGrammar>) => {
    return put(`/api/grammar/${id}`, grammar);
}

export const deleteGrammar = (id: string) => {
    return remove(`/api/grammar/${id}`);
}