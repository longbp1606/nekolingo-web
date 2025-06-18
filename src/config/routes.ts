const routes = {
  public: {
    home: "/",
    welcome: "/welcome",
  },
  user: {
    exercise: "/exercise/:lessonId",
    result: "/exercise/result",
    practice: "/practice",
    quest: "/quest",
    leaderboard: "/leaderboard",
    profile: "/profile",
    shop: "/shop",
    achievements: "/profile/achievements",
    search: "/search",
  },
  api: {
    loginGoogle: "/auth/signin",
  },
};

export default routes;