import { io } from "socket.io-client";
import { USERS_URL } from "./config";

const UsersSocket = io(USERS_URL, {
	autoConnect: false,
	withCredentials: true,
});

export default UsersSocket;
