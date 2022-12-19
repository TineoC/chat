import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Error from "../components/Error";
import Success from "../components/Success";

const Register = () => {
	const { register, handleSubmit } = useForm();
	const [error, setError] = useState();
	const [success, setSucess] = useState(false);

	const onSubmit = async (data) => {
		const URL = "http://localhost:3000/users";

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

			const result = await response.json(); //Read User info

			if (!response.ok) {
				setSucess(false);
				return setError(result.message);
			}

			setError("");
			setSucess(true);
		} catch (error) {
			console.error(error);
			setError(error);
		}
	};

	return (
		<main className='h-screen flex items-center justify-center bg-gray-100'>
			<form
				className='flex flex-col bg-gray-200 w-1/3 text-sm'
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className='text-lg font-bold mx-auto'>Register</h1>
				<input
					type='text'
					className='mb-2'
					placeholder='Type your dominican cedula...'
					{...register("document")}
					required
				/>
				<input
					type='text'
					className='mb-2'
					placeholder='Type your names...'
					{...register("names")}
					required
				/>
				<input
					type='text'
					className='mb-4'
					placeholder='Type your surnames...'
					{...register("surnames")}
					required
				/>
				<input
					type='email'
					className='mb-2'
					placeholder='Type your email...'
					{...register("email")}
				/>
				<input
					type='email'
					className='mb-4'
					placeholder='Confirm your email...'
					{...register("email")}
				/>
				<input
					type='password'
					className='mb-2'
					placeholder='Type your password...'
					{...register("password")}
					required
				/>
				<input
					type='password'
					className='mb-2'
					placeholder='Confirm your password...'
					{...register("confirm-password")}
					required
				/>
				{error && <Error text={error} />}
				{success && <Success text={"User created"} />}
				<span className='text-xs'>
					<Link className='text-blue-800' to='/login' replace>
						Have already an account?
					</Link>
				</span>
				<button className='bg-green-500 text-white' type='submit'>
					Register
				</button>{" "}
			</form>
		</main>
	);
};

export default Register;
