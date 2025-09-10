export const Endpoints = {
  auth: {
    login: "/user/login",
    register: "/user/register",
    profile: "/user/me",
  },
  dashboard: {
    summary: "/dashboard",
  },
  demography: {
    summary: "/demography",
  },
  healthFacilities: {
    summary: "/health-facilities",
    zone: "/health-facilities/zonal",
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
