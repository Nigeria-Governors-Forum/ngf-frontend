export const Endpoints = {
  auth: {
    login: "/user/login",
    register: "/user/register",
    profile: "/user/me",
  },
  users: {
    list: "/user",
    email: (id: string) => `/user/${id}`,
  },
  documents: {
    list: "/documents",
    upload: "/documents/upload",
  },
  health: {
    stats: "/stats",
    reports: "/reports",
  },
};
