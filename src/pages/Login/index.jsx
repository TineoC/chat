import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import { AuthContext } from "../../context/AuthContext";
const Login = () => {
	const { signInWithGoogle } = useContext(AuthContext);
	// React Router V6
	const navigate = useNavigate();

	const handleGoogleSignIn = async () => {
		try {
			await signInWithGoogle();
			navigate("/");
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<main className='h-screen flex flex-col items-center justify-center bg-gray-100'>
			<h1 className='text-3xl font-bold mx-auto mb-4'>Sign In</h1>

			<GoogleButton onClick={handleGoogleSignIn} />
		</main>
	);
};

export default Login;
