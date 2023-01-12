import React, { useContext } from "react";

import { ChatContext } from "../../../../context/ChatContext";

import Chat from "../../Chat";

const Chats = () => {
	const { data } = useContext(ChatContext);

	// Get your chats and last message

	// 1. Uid
	// 2. Name
	// 3. Last Message

	return (
		<div>
			<span className='flex flex-row text-sm text-slate-400'>
				Add some contacts so you can chat with people...
			</span>
			{/*{friendsList.map((user) => {
				return (
					<div
						key={user.document}
						className='p-4 rounded-md hover:bg-gray-100 mx-auto cursor-pointer'
						onClick={() => {
							dispatch({ type: "CHANGE_USER", payload: user });
						}}
					>
						<div className='flex flex-row justify-between'>
							<h3 className='font-medium'>{`${user.names} ${user.surnames}`}</h3>
							<small className='text-xs font-thin'>
								11:59 PM
							</small>
						</div>

						<div className='font-thin text-xs w-3/4 text-ellipsis overflow-hidden'>
							{user.lastMessage || ""}
						</div>
					</div>
				);
			})}*/}

			{data.receiver && <Chat />}
		</div>
	);
};

export default Chats;
