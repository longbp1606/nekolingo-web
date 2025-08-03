const routes = {
  public: {
    home: "/",
    welcome: "/welcome",
    login: "/login",
    register: "/register",
    verify: "/verify",
    verifyResult: "/verify/result",
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
    paymentResult: "/payment/result",
  },
  admin: {
    // dashboard: "/admin/dashboard",
    user: "/admin/user", 
    topic: "/admin/topic",
    grammar: "/admin/grammar",
    vocabulary: "/admin/vocabulary",
    category: "/admin/category",
    language: "/admin/language",
    course: "/admin/course",
    lesson: "/admin/lesson",
    exercise: "/admin/exercise",
    quest: "/admin/quest",
    archivement: "/admin/archivement",
    transaction: "/admin/transaction",
    account: "/admin/account",
  },
  api: {
    loginGoogle: "/auth/signin",
  },
};

export default routes;