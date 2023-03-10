/* eslint-disable jsx-a11y/anchor-is-valid */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, TypeOf } from "zod";
import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Users from "../components/Users";
import { toast } from "react-toastify";

const createSessionSchema = object({
  password: string().min(1, { message: "Password is required" }),
  email: string()
    .min(1, {
      message: "Email is required",
    })
    .email("Not a valid email"),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const LoginPage = () => {
  const logo = require("../assets/azs_logo_transparent.png");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  async function onSubmit(values: CreateSessionInput) {
    try {
      await axios.post(`/sessions`, values, {
        withCredentials: true,
      });
      toast.success(" succesfully logged in ");
      navigate("/");
    } catch (e: any) {
      toast.error(e?.message);
      setLoginError(e?.message);
    }
  }
  return (
    <section className="h-screen">
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-3xl flex flex-row border border-green-200/50">
          <div className="w-full flex justify-center items-center mr-4 p-4">
            <img className="h-90 object-contain" alt="logo" src={logo} />
          </div>
          <div className="w-full p-6 m-auto flex flex-col justify-center">
            <h1 className="text-green-600 text-2xl font-bold">
              Welcome to AZS Statistics!
            </h1>
            <p>{loginError}</p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="please enter your email"
                  {...register("email")}
                  className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
                {errors.email?.message && (
                  <a href="#" className="text-xs text-red-600 hover:underline">
                    email error: {errors.email?.message}
                  </a>
                )}
                <br />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="block w-full px-4 py-2 mt-2 text-green-700 bg-white border rounded-md focus:border-green-400 focus:ring-green-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              {errors.password?.message && (
                <a href="#" className="text-xs text-red-600 hover:underline">
                  password error: {errors.password?.message}
                </a>
              )}
              <br />
              <a href="#" className="text-xs text-green-600 hover:underline">
                Forget Password?
              </a>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-green-700 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="mt-8 text-xs font-light text-center text-gray-700">
              {" "}
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-green-600 hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
