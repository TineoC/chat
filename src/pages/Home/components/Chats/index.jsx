import React, { useContext } from "react";
import { FriendsContext } from "../../../../context/FriendsContext";
import UsersSocket from "../../../../socket/users";
import { useEffect } from "react";
import Chat from "../../Chat";
import { ChatContext } from "../../../../context/ChatContext";

const Chats = () => {
	const { friendsList, setFriendsList } = useContext(FriendsContext);

	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		UsersSocket.on("friends", (friendsArray) => {
			setFriendsList(friendsArray);
		});

		return () => {
			UsersSocket.off("friends");
		};
	}, [UsersSocket]);

	if (friendsList.length === 0)
		return (
			<span className='flex flex-row text-slate-400 text-xs'>
				Add some contacts so you can chat with people...
			</span>
		);

	return (
		<div>
			{friendsList.map((user) => {
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
						<small className='font-thin'>Last message...</small>
					</div>
				);
			})}

			<Chat />
		</div>
	);
};

export default Chats;
