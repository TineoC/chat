import React from "react";
import { useMemo } from "react";
import { useContext } from "react";
import { MessagesContext } from "../../../context/MessagesContext";
import { ChatContext } from "../../../context/ChatContext";

import Message from "./Message";
import { useRef } from "react";
import { useEffect } from "react";
import useFetchMessages from "../../../hooks/useFetchMessages";

const Messages = () => {
	const messages = useFetchMessages();

	const bottomDiv = useRef(null);

	useEffect(() => {
		bottomDiv.current?.scrollIntoView();
	});

	if (!messages.length === 0) return;

	return (
		<div className='flex flex-col gap-2 h-[80%] px-2 box-content overflow-y-auto scroll-smooth'>
			{messages.map((message) => {
				return <Message key={message.id} message={message} />;
			})}

			<div ref={bottomDiv} />
		</div>
	);
};

export default Messages;
