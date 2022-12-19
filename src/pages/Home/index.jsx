import React from "react";
import Sidebar from "./components/Sidebar";
import ChatBody from "./components/ChatBody";

const Home = () => {
	return (
		<main className='flex h-screen w-screen min-w-[600px]'>
			<Sidebar />
			<ChatBody />
		</main>
	);
};

export default Home;
