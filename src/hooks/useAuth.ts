import { getProfile } from "@/services/authAPI";
import cookieUtils from "@/services/cookieUtils";
import { useCallback, useEffect, useState } from "react";

type JwtType = {
    exp: number;
    iat: number;
    sub: string;
}

export type UserType = {
    id: string;
    email: string;
    role: number;
    currentLevel: number;
    xp: number;
    streakDays: number;
    is_primiere: boolean;
}

const getUserID = () => {
    const decoded = cookieUtils.decodeJwt(cookieUtils.getAccessToken()) as JwtType;
    if (!decoded || !decoded.sub) return null;

    return decoded.sub;
}

const useAuth = () => {
    const [profile, setProfile] = useState<UserType | null>(null);
    const [userID, setUserID] = useState<string | null>(getUserID());
    const [loading, setLoading] = useState(true);

    const accessToken = cookieUtils.getAccessToken();

    const checkTokenExpiration = useCallback(() => {
        if (accessToken) {
            const decoded = cookieUtils.decodeJwt('accessToken') as JwtType;

            if (!decoded || decoded.exp < Date.now() / 1000) {
                cookieUtils.clear();
                return;
            }
        }
    }, [accessToken]);

    const fetchProfile = async () => {
        try {
            const res = await getProfile();
            setProfile(res.data.data);
        } catch (error) {
            console.log(error); 
        }
    }

    useEffect(() => {
        const token = cookieUtils.getAccessToken();

        if (!token) {
            return;
        }

        try {
            setLoading(true);
            setUserID(getUserID());
            fetchProfile();
        } finally {
            setLoading(false);
        }

        const interval = setInterval(checkTokenExpiration, 1000);

        return () => clearInterval(interval);
    }, [checkTokenExpiration]);

    return { loading, profile, userID };
}

export default useAuth;