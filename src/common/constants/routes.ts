export const PATH_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  POSTS: {
    LIST: '/posts',
    CREATE: '/posts/new',
    DETAIL: (id: string) => `/posts/${id}`,
    EDIT: (id: string) => `/posts/${id}/edit`,
  },
  COMMENTS: {
    LIST: '/comments',
    DETAIL: (id: string) => `/comments/${id}`,
  },
} as const;

export const API_ROUTES = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
  },
  POSTS: {
    LIST: '/api/posts',
    CREATE: '/api/posts',
    DETAIL: (id: string) => `/api/posts/${id}`,
    UPDATE: (id: string) => `/api/posts/${id}`,
    DELETE: (id: string) => `/api/posts/${id}`,
    COMMENTS: (id: string) => `/api/posts/${id}/comments`,
  },
  COMMENTS: {
    LIST: '/api/comments',
    CREATE: '/api/comments',
    DETAIL: (id: string) => `/api/comments/${id}`,
    UPDATE: (id: string) => `/api/comments/${id}`,
    DELETE: (id: string) => `/api/comments/${id}`,
  },
} as const;

export type PathRouteKey = keyof typeof PATH_ROUTES;
export type PostPathKey = keyof typeof PATH_ROUTES.POSTS;
export type CommentPathKey = keyof typeof PATH_ROUTES.COMMENTS;

export type ApiRouteKey = keyof typeof API_ROUTES;
export type PostApiKey = keyof typeof API_ROUTES.POSTS;
export type CommentApiKey = keyof typeof API_ROUTES.COMMENTS;
