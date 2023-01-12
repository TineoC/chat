import React from "react";

const Avatar = ({ url }) => {
	return (
		<img
			className='w-12 rounded-full'
			src={url}
			referrerPolicy='no-referrer'
		/>
	);
};

export default Avatar;
