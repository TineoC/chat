import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Error from "../components/Error";
import SERVER_URL from "../../config/server";
import Input from "../components/Input";

const Login = () => {
	const [error, setError] = useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Auth Context
	const { setCurrentUser } = useContext(AuthContext);

	// React Router V6
	const navigate = useNavigate();

	const onSubmit = async (data) => {
		const URL = `${SERVER_URL}/auth/login`;

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
				className='flex flex-col bg-gray-200 w-5/6 rounded p-2'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className='text-2xl font-bold mx-auto mb-4'>Sign In</h1>

				<div className='mx-2'>
					<Input
						type='text'
						name='document'
						errors={errors}
						register={register}
						placeholder='Type your document...'
						validationSchema={{
							required: "Document is required",
						}}
						required
					/>

					<Input
						type='password'
						name='password'
						errors={errors}
						register={register}
						placeholder='Type your password...'
						validationSchema={{
							required: "Password is required",
						}}
						required
					/>

					{error && <Error text={error} />}

					<div className='text-md'>
						<Link className='text-blue-800' to='/register' replace>
							Not already registered?
						</Link>
					</div>
					<button
						className='bg-green-500 text-white font-bold text-xl w-full my-2 p-2 rounded-sm'
						type='submit'
					>
						Login
					</button>
				</div>
			</form>
		</main>
	);
};

export default Login;
