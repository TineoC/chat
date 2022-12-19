import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Error from "../components/Error";

const Login = () => {
	const [error, setError] = useState("");
	const { register, handleSubmit } = useForm();

	// Auth Context
	const { setCurrentUser } = useContext(AuthContext);

	// React Router V6
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const URL = "http://localhost:3000/auth/login";

		const options = {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		try {
			const response = await fetch(URL, options);

			if (response.ok) {
				const result = await response.json(); //Read User info

				setCurrentUser(result); // Share user info in AuthContext

				setError("");
				navigate("/");
			} else if (response.status === 403) {
				setError("Incorrect password");
			} else {
				setError("User not found");
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main className='h-screen flex items-center justify-center bg-gray-100'>
			<form
				className='flex flex-col bg-gray-200 w-1/3 text-sm'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className='text-lg font-bold mx-auto'>Login</h1>

				<input
					className='mb-2'
					type='text'
					placeholder='Type your document...'
					{...register("document")}
					required
				/>

				<input
					className='mb-2'
					type='password'
					placeholder='Type your password...'
					{...register("password")}
					required
				/>

				{error && <Error text={error} />}

				<span className='text-xs'>
					<Link className='text-blue-800' to='/register' replace>
						Not already registered?
					</Link>
				</span>

				<button className='bg-green-500 text-white' type='submit'>
					Login
				</button>
			</form>
		</main>
	);
};

export default Login;
