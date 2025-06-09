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
  },
  api: {
    loginGoogle: "/auth/signin",
  },
};

export default routes;