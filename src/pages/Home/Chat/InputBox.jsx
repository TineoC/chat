import React, { useState } from "react";
import { TbSend, TbPlus } from "react-icons/tb";

const InputBox = () => {
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		setMessages((previousMessages) => [...previousMessages, payload]);

		// Set sent message as friend last message

		setMessage("");
	};
	const handleChange = (e) => {
		setMessage(e.target.value);
	};

	return (
		<div className='bg-gray-100 absolute bottom-0 w-screen py-2'>
			<div className='w-[90%] mx-auto'>
				<form
					className='w-full flex flex-row justify-between'
					onSubmit={handleSubmit}
				>
					<button
						type='submit'
						className='text-xl p-2 hover:bg-gray-200 rounded-full'
					>
						<TbPlus className=' text-blue-500 hover:text-blue-400' />
					</button>

					<input
						type='text'
						className=' bg-white rounded-full w-[70%] text-sm py-1 px-4'
						placeholder='Write some message...'
						value={message}
						onChange={handleChange}
						required
					/>

					<button
						type='submit'
						className='text-xl text-blue-500 hover:text-blue-400 p-2 hover:bg-gray-200 rounded-full'
					>
						<TbSend />
					</button>
				</form>
			</div>
		</div>
	);
};

export default InputBox;
