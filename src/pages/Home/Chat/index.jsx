import React, { useState, useContext } from "react";
import { ChatContext } from "../../../context/ChatContext";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { TbSend, TbPlus } from "react-icons/tb";

const Chat = () => {
	const { data, dispatch } = useContext(ChatContext);

	const [message, setMessage] = useState("");

	if (!data.receiver) return;

	const { names, surnames } = data.receiver;

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(data);
	};

	const handleCloseChat = () => {
		dispatch({ type: "RESET_USER" });
	};

	return (
		<div className='z-10 h-screen absolute top-0 left-0 w-screen bg-gray-50'>
			<div className='flex flex-col justify-between py-5 w-[90%] mx-auto'>
				<div>
					<span className='flex flex-row items-center'>
						<button
							className='flex align-center hover:bg-slate-100 rounded-full p-2 mr-4'
							onClick={handleCloseChat}
						>
							<MdOutlineArrowBackIosNew className='text-blue-600' />
						</button>

						<h2 className='font-medium text-xl'>{`${names} ${surnames}`}</h2>
					</span>

					<small className='text-xs text-slate-700'>
						Online || Offline || Typing...
					</small>

					<main className='flex flex-col w-full height-full'>
						Messages
					</main>
				</div>
			</div>

			<div className='bg-gray-100 absolute bottom-0 w-screen py-2'>
				<div className='w-[90%] mx-auto'>
					<form
						className='w-full flex flex-row justify-between'
						onSubmit={handleSubmit}
					>
						<button
							type='submit'
							className='p-2 hover:bg-gray-200 rounded-full'
						>
							<TbPlus className='text-blue-500 hover:text-blue-400' />
						</button>

						<input
							type='text'
							className=' bg-white rounded-full w-[70%] text-sm py-1 px-2'
							placeholder='Write some message...'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
						/>

						<button
							type='submit'
							className='text-blue-500 hover:text-blue-400 p-2 hover:bg-gray-200 rounded-full'
						>
							<TbSend />
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Chat;
