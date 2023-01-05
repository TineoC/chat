const SOCKET_SERVER_URL =
  import.meta.env.VITE_SOCKET_SERVER_URL || `http://localhost:3555`;

export const USERS_URL = `${SOCKET_SERVER_URL}/users`;
