import { io } from "socket.io-client";
import { USERS_URL } from "./config";

const UsersSocket = io(USERS_URL, {
	autoConnect: false,
	withCredentials: true,
	secure: true,
});

console.log({ url: USERS_URL, secure: UsersSocket.secure });

export default UsersSocket;
