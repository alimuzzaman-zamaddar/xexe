/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Container from "../../shared/Container";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Authslider from "../../components/Reusable/Authslider";
import { Link, useNavigate } from "react-router-dom";
import { setItem } from "../../utils/localStorage";
import { LoginFunction } from "../../Services/auth.api";
import { useSocialLogin } from "../../Services/auth.api.hook";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../Hooks/useAuth";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const { setUser, setToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setLoading(true); // Set loading to true when login starts
    try {
      const response = await LoginFunction({
        email: data.email,
        password: data.password,
      });

      // Set user and token in localStorage
      setItem("token", response.token);
      setItem("user", response);

      // Update context immediately with the new user and token
      setToken(response.token); // Update token in context
      setUser(response); // Update user in context

      console.log(response);

      // Handle redirection based on role and subscription
      if (response?.isSubscribed === true) {
        navigate("/userdashboard"); // Redirect to user dashboard
        toast.success("Login successful");
      } else if (response.role === "admin") {
        navigate("/admindashboard"); // Redirect to admin dashboard
        toast.success("Admin login successful");
      } else {
        navigate("/"); // Redirect to home if neither
      }

      setLoading(false); // Set loading to false once login is completed
    } catch (err: any) {
      setLoading(false); // Set loading to false on error
      toast(err?.response?.data?.message || "Login failed");
    }
  };

  const { mutate: socialLogin } = useSocialLogin();

  const handleSocialLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google login success:", tokenResponse);

      const token = tokenResponse.access_token;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_GOOGLE_URL}/oauth2/v2/userinfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const updatedData = {
          token,
          provider: "google" as const,
          username: data?.name,
          email: data?.email,
          avatar: data?.picture,
        };

        // Send to your backend
        await socialLogin(updatedData);
      } catch (error) {
        console.error("Error fetching Google user info:", error);
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);

    },
  });

  return (
    <section className="py-10 lg:py-20 2xl:px-0 px-4">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">
          {/* Left Login Form */}
          <div className="w-full xl:w-2/5 border border-[#E3E3E3] rounded-[30px] bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Email */}
              <div>
                <label className="block text-[18px] font-semibold mb-3">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email",
                    },
                  })}
                  className="border rounded-[20px] px-6 py-4 w-full text-[16px] text-[#ADADAD]"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="relative w-full">
                <label className="block text-[18px] font-semibold mb-3">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="border rounded-[20px] px-6 py-4 w-full text-[16px] text-[#ADADAD] pr-[60px]"
                />
                <div
                  className="absolute top-14 right-5 cursor-pointer text-[#ADADAD]"
                  onClick={togglePassword}
                >
                  {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <Link to="/forgot-password">
                  <span className="text-[16px] text-[#ADADAD] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="px-10 py-4 w-full bg-[#52ABFF] rounded-[20px] mt-6 text-white text-[18px] font-semibold border border-[#52ABFF] hover:bg-transparent hover:border hover:border-[#E3E3E3] hover:text-black duration-300"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
              <button
                onClick={() => handleSocialLogin()}
                type="button"
                className="xl:px-10 px-3 py-4 w-full flex justify-center items-center gap-x-2 rounded-[20px] text-[18px] sm:text-[20px] font-popins font-semibold cursor-pointer border border-[#E3E3E3] text-[#52ABFF] hover:border-transparent hover:bg-[#52ABFF] hover:text-[#FFF] duration-300"
              >
                <FaGoogle />
                Continue With Google
              </button>
            </form>

            {/* Signup Redirect */}
            <p className="text-center text-[#787878] pt-10 text-sm sm:text-base">
              Don’t have an account?{" "}
              <Link to="/signup">
                <span className="text-[#52ABFF] font-semibold cursor-pointer">
                  Sign Up
                </span>
              </Link>
            </p>
          </div>

          {/* Right Slider */}
          <div className="w-full lg:w-1/2 bg-[#003072] rounded-[30px] sm:rounded-[40px] py-[30px] px-6 flex items-center justify-center">
            <Authslider />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Login;
