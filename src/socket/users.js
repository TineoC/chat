import { io } from "socket.io-client";
import { USERS_URL } from "./config";

console.log(USERS_URL);

const UsersSocket = io(USERS_URL, {
	autoConnect: false,
	withCredentials: true,
	secure: import.meta.env.VITE_SOCKET_SERVER_URL ? true : false,
});

export default UsersSocket;
