import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";

import SERVER_URL from "../../config/server";
import Error from "../components/Error";
import Input from "../components/Input";
import Success from "../components/Success";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState();
  const [success, setSucess] = useState(false);

  const onSubmit = async (data) => {
    const URL = `${SERVER_URL}/auth/register`;

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
    <main className="h-screen flex items-center justify-center bg-gray-100">
      <form
        className="flex flex-col bg-gray-200 w-5/6 rounded py-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-2xl font-bold mx-auto mb-4">Register</h1>
        <div className="mx-4">
          <Input
            type="text"
            name="document"
            register={register}
            placeholder="Type your dominican cedula..."
          />

          <Input
            type="text"
            name="names"
            register={register}
            placeholder="Type your names..."
          />

          <Input
            type="text"
            name="surnames"
            register={register}
            placeholder="Type your surnames..."
          />

          <Input
            type="email"
            name="email"
            register={register}
            placeholder="Type your email..."
          />

          <Input
            type="email"
            name="confirmEmail"
            register={register}
            placeholder="Confirm your email..."
          />

          <Input
            type="password"
            name="password"
            register={register}
            placeholder="Type your password..."
          />

          <Input
            type="password"
            name="confirmPassword"
            register={register}
            placeholder="Confirm your password..."
          />

          {error && <Error text={error} />}
          {success && <Success text={"User created"} />}
          <div className="text-md">
            <Link className="text-blue-800" to="/login" replace>
              Have already an account?
            </Link>
          </div>
          <button
            className="bg-green-500 text-white font-bold text-xl w-full my-2 p-2 rounded-sm"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </main>
  );
};

export default Register;
