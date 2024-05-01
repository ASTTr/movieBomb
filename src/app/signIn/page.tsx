"use client";
import Link from "next/link";
import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    reset,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm();

  const loginUser = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/users/SignInUser",
        data
      );
      console.log(response);
      if (response.status == 200) {
        router.push("/profile");
        localStorage.setItem("token", response.data.token);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex w-100 flex-col items-center justify-center min-h-screen py-2">
      <div className="p-4 rounded-lg bg-pink-100">
        <h1 className="text-center text-2xl text-blue-400">Sign In</h1>
        <hr />
        <form onSubmit={handleSubmit(loginUser)}>
          <div className="my-2 flex justify-between ">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="mx-4"
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter Your Email"
            />
          </div>
          {errors?.email && (
            <span className="text-red-600 bg-red-200 text-sm text-center">
              {errors.email.message}
            </span>
          )}
          <div className="my-2 flex justify-between ">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              className="mx-4"
              type="password"
              {...register("password", { required: "password is required" })}
              placeholder="Enter Your Password"
            />
          </div>
          {errors?.password && (
            <span className="text-red-600 bg-red-200 text-sm text-center">
              {errors.password.message}
            </span>
          )}
          <div className="my-2 flex flex-col justify-center ">
            <button
              type="submit"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Login
            </button>
          </div>
          <p className="flex justify-center items-center ">
            Don't have an account{" "}
            <span className="text-red-600 mx-2">
              {" "}
              <Link href={"/signup"}>click here</Link>
            </span>
          </p>
          <p className="flex justify-center items-center text-red-600">
            <span className="text-red-600 mx-2">
              {" "}
              <Link href={"/forgotPassword"}>Forgot password</Link>
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
