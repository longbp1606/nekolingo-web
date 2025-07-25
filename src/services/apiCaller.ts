import axios, { AxiosResponse } from "axios";
import cookieUtils from "./cookieUtils.ts";
import config from "@/config/index.ts";

export const request = (
    endpoint: string, 
    method: string,
    headers: object = {},
    params: object = {},
    body: object = {},
): Promise<AxiosResponse> => {
    const token = cookieUtils.getAccessToken();
    
    return axios({
        url: config.publicRuntime.API_URL + endpoint,
        method: method,
        headers: Object.assign({}, headers, {Authorization: `Bearer ${token}`}),
        params: Object.assign(params),
        data: body,
    });
}

export const get = (
    endpoint: string,
    params: object = {},
    headers: object = {},
): Promise<AxiosResponse> => {
    return request(endpoint, 'GET', headers, params);
}

export const post = (
    endpoint: string,
    body: object = {},
    params: object = {},
    headers: object = {},
): Promise<AxiosResponse> => {
    return request(endpoint, 'POST', headers, params, body);
};

export const put = (
    endpoint: string,
    body: object = {},
    params: object = {},
    headers: object = {},
): Promise<AxiosResponse> => {
    return request(endpoint, 'PUT', headers, params, body);
}

export const patch = (
    endpoint: string,
    body: object = {},
    params: object = {},
    headers: object = {},
): Promise<AxiosResponse> => {
    return request(endpoint, 'PATCH', headers, params, body);
}

export const remove = (
    endpoint: string, 
    body: object = {},
    params: object = {},
    headers: object = {}
): Promise<AxiosResponse> => {
    return request(endpoint, 'DELETE', headers, params, body);
}