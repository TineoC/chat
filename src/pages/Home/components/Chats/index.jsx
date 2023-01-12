import React, { useContext } from "react";

import { ChatContext } from "../../../../context/ChatContext";

import Chat from "../../Chat";
import useFetchChats from "../../../../hooks/useFetchChats";
import Avatar from "../../components/Avatar";

const Chats = () => {
	const { data, dispatch } = useContext(ChatContext);

	const chats = useFetchChats();

	if (!chats)
		return (
			<span className='flex flex-row text-sm text-slate-400'>
				Add some contacts so you can chat with people...
			</span>
		);

	const handleSelect = (user) => {
		dispatch({ type: "CHANGE_USER", payload: user });
	};

	return (
		<div>
			{chats.map((chat) => {
				return (
					<div
						key={chat[0]}
						className='p-4 rounded-md hover:bg-gray-100 mx-auto cursor-pointer'
						onClick={() => {
							handleSelect(chat[1].userInfo);
						}}
					>
						<div className='flex flex-row gap-4'>
							<Avatar url={chat[1].userInfo.photoURL} />

							<div className='flex flex-col w-full'>
								<h3 className='text-xl'>
									{chat[1].userInfo.displayName}
								</h3>
								<span className='font-normal text-md text-slate-500 text-ellipsis overflow-hidden'>
									{chat[1].lastMessage?.message}
								</span>
							</div>
						</div>
					</div>
				);
			})}

			{!(Object.keys(data.user).length === 0) && <Chat />}
		</div>
	);
};

export default Chats;
