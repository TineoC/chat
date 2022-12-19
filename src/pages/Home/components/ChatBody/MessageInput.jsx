import React from "react";

const MessageInput = () => {
	return (
		<form className='w-full text-sm'>
			<input
				className='bg-gray-200 w-11/12'
				type='text'
				placeholder='Type a message...'
			/>
			<button className='bg-green-500 w-1/12' type='submit'>
				Send
			</button>
		</form>
	);
};

export default MessageInput;
