import config from "@/config";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: '/'});

class CookieUtils {
    getItem(key: string, defaultValue = '') {
        const item = cookies.get(key);
        return item !== undefined ? item : defaultValue;
    }

    setItem(key: string, value = '') {
        cookies.set(key, value, { path: '/'});
    }

    removeItem(key: string) {
        cookies.remove(key);
    }

    deleteUser() {
        cookies.remove(config.cookies.accessToken);
    }

    decodeJwt(tokenParam: string) {
        const token = this.getItem(tokenParam);
        if (token) {
            try {
                const jwtUser = jwtDecode(token);
                return jwtUser;
            } catch (err) {
                this.deleteUser();
            }
        }
        return undefined;
    }

    getAccessToken() {
        return this.getItem(config.cookies.accessToken);
    }

    getRefreshToken() {
        return this.getItem(config.cookies.refreshToken);
    }

    getRole() {
        return this.getItem(config.cookies.role);
    }

    setAccessToken(value = '') {
        this.setItem(config.cookies.accessToken, value);
    }

    setRefreshToken(value = '') {
        this.setItem(config.cookies.refreshToken, value);
    }

    setRole(value = '') {
        this.setItem(config.cookies.role, value);
    }

    clear() {
        cookies.remove(config.cookies.accessToken, { path: '/'});
    }
}

export default new CookieUtils();