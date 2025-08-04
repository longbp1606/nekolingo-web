import { get } from "./apiCaller"

export const getLeaderboardOverall = () => {
    return get('/api/leaderboard/overall');
}

export const getWeeklyLeaderboard = () => {
    return get('/api/leaderboard/weekly');
}