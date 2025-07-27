import { get, post } from "./apiCaller"

export const buyItem = (payload: object) => {
    return post("/api/shop/buy", payload);
}

export const getShopItem = () => {
    return get("/api/shop/items");
}

export const getShopStatus = () => {
    return get("/api/shop/status");
}

export const getShopHistory = () => {
    return get("/api/shop/history");
}