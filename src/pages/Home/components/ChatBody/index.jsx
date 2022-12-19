import React from "react";
import ChatDetails from "./ChatDetails";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatBody = () => {
	const styles = "h-screen flex-auto w-auto";
	return (
		<div className={styles + "flex flex-col"}>
			<ChatDetails />
			<MessageList />
			<MessageInput />
		</div>
	);
};

export default ChatBody;
