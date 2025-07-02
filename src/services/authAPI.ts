import { get, post } from "./apiCaller"

export const login = (user: object) => {
    return post('/api/auth/login', user)
}

export const register = (user: object) => {
    return post('/api/auth/register', user)
}

export const getProfile = () => {
    return get('/api/auth/profile');
}