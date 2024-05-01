"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function SignupPage() {
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

  useEffect(() => {
    if (watch("confirmPassword") != watch("password"))
      setError("confirmPassword", { message: "Password did not match " });
    else if (watch("confirmPassword") == watch("password"))
      setError("confirmPassword", undefined);
  }, [watch("confirmPassword")]);

  const addNewUser = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        data
      );
      if (response.status == 200) {
        reset();
        router.push("/login");
      }
    } catch (err: any) {
      console.error(err, err.response.data.error);
    }
  };

  return (
    <div className="flex w-100 flex-col items-center justify-center min-h-screen py-2">
      <div className="p-4 rounded-lg bg-pink-100">
        <h1 className="text-center text-2xl text-blue-400">SIGN UP</h1>
        <hr />
        <form onSubmit={handleSubmit(addNewUser)}>
          <div className="my-2 flex justify-between ">
            <label htmlFor="username">User Name</label>
            <input
              id="username"
              type="text"
              {...register("userName", { required: "User Name is required" })}
              placeholder="Enter Your Name ..."
              className="mx-4"
            />
          </div>
          {errors?.userName && (
            <span className="text-red-600 bg-red-200 text-sm text-center">
              {errors.userName.message}
            </span>
          )}
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
          <div className="my-2 flex justify-between ">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              className="mx-4"
              type="password"
              {...register("confirmPassword", {
                required: "Please Confirm Your Password",
              })}
            />
          </div>
          {errors?.confirmPassword && (
            <span className="text-red-600 bg-red-200 text-sm text-center">
              {errors.confirmPassword.message}
            </span>
          )}
          <div className="my-2 flex flex-col justify-center ">
            <button
              type="submit"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Sign Up
            </button>
            <p className="flex justify-center items-center ">
              Already have an account{" "}
              <span className="text-red-600 mx-2">
                {" "}
                <Link href={"/signIn"}>click here</Link>
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
