import React, { useContext } from "react";
import { HiLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext";
import { FaUserPlus } from "react-icons/fa";

const User = () => {
	const navigate = useNavigate();

	// Auth Context
	const { currentUser, setCurrentUser } = useContext(AuthContext);

	const { names, surnames } = currentUser;

	const handleLogout = async () => {
		const URL = "http://localhost:3000/auth/logout";

		const options = {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		};

		try {
			navigate("/");

			const response = await fetch(URL, options);

			if (response.ok) {
				setCurrentUser(null);
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className='flex flex-row items-center'>
			<div className='w-5/6'>
				{names} {surnames}
			</div>
			<button className='ml-2 hover:bg-gray-200 rounded-full p-0.5'>
				<FaUserPlus className='text-blue-800 hover:text-blue-600' />
			</button>

			<button
				onClick={handleLogout}
				className='ml-2 hover:bg-gray-200 rounded-full p-0.5'
			>
				<HiLogout className=' text-red-600 hover:text-red-500' />
			</button>
		</div>
	);
};

export default User;
