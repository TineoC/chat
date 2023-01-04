const SOCKET_SERVER_URL =
	import.meta.env.VITE_SOCKET_SERVER_URL || `http://localhost:99`;

export const USERS_URL = `${SOCKET_SERVER_URL}/users`;
