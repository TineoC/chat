import { io } from "socket.io-client";
import { USERS_URL } from "./config";

const UsersSocket = io(USERS_URL, {
	autoConnect: false,
	withCredentials: true,
	secure: USERS_URL === "https://luna-united.com:3555/users" ? true : false,
});

console.log({ url: USERS_URL, secure: UsersSocket.secure });

export default UsersSocket;
