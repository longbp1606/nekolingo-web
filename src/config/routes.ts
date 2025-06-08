const routes = {
  public: {
    home: "/",
    welcome: "/welcome",
  },
  user: {
    exercise: "/exercise/:lessonId",
    result: "/exercise/result",
  },
  api: {
    loginGoogle: "/auth/signin",
  },
};

export default routes;