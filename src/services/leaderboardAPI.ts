import { get } from "./apiCaller"

export const getLeaderboardOverall = () => {
    return get('/api/leaderboard/overall');
}