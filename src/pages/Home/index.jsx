import React from "react";
import Chats from "./components/Chats";
import Header from "./components/Header";
import { AddContactsProvider } from "../../context/AddContactsContext";

import { ChatProvider } from "../../context/ChatContext";
import { FriendsProvider } from "../../context/FriendsContext";

import UsersSocket from "../../socket/users";
import { useState } from "react";

const Home = () => {
	const [searchFriend, setSearchFriend] = useState("");

	UsersSocket.connect();

	return (
		<main className='my-4 w-[90%] mx-auto flex flex-col gap-y-4'>
			<AddContactsProvider>
				<ChatProvider>
					<FriendsProvider>
						<Header />

						<h1 className='text-2xl font-bold'>Chats</h1>

						<input
							className='bg-gray-200 p-2'
							onChange={(e) => setSearchFriend(e.target.value)}
							value={searchFriend}
							type='text'
							placeholder='Search your chats...'
						/>

						<Chats search={searchFriend} />
					</FriendsProvider>
				</ChatProvider>
			</AddContactsProvider>
		</main>
	);
};

export default Home;
