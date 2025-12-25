import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RegisterFunction } from "../../Services/auth.api"; 
import Container from "../../shared/Container";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Authslider from "../../components/Reusable/Authslider";
import { useSocialLogin } from "../../Services/auth.api.hook";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

type FormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  agree_to_terms: boolean;
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword(prev => !prev);
    const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    setLoading(true); // Set loading to true when registration starts
    try {
      const payload = {
        ...data,
        password_confirmation: data.password, // ensure passwords match
        agree_to_terms: data.agree_to_terms ? 1 : 0,
      };

      const response = await RegisterFunction(payload);

      toast.success("Registration successful!");
      console.log(response , "registration successful Verify your email"); 
      setLoading(false); // Set loading to false after successful registration
      navigate("/otp-verifyreg", { state: { email: data.email, password: data.password }});
      

    } catch (err) {
      setLoading(false)
      toast.error("Registration failed try again or another email")
      console.error("Registration failed:", err);
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
          {/* Left Form Section */}
          <div className="w-full xl:w-2/5 border border-[#E3E3E3] rounded-[30px] p-6 sm:p-10 lg:p-12 bg-white flex flex-col justify-between lg:mb-0 mb-5">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              {/* Name Field */}
              <div>
                <label className="block text-[18px] sm:text-[20px] font-semibold text-[#232323] font-popins capitalize mb-3">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  autoComplete="name"
                  {...register("name", {
                    required: "Name is required",
                    pattern: {
                      value: /^[a-zA-Z\s'-]+$/,
                      message: "Name cannot contain special characters",
                    },
                  })}
                  {...register("name", { required: "Name is required" })}
                  className="border border-[#E3E3E3] rounded-[20px] px-6 py-4 sm:px-10 sm:py-5 w-full text-[16px] sm:text-[18px] text-[#ADADAD] font-popins outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-[18px] sm:text-[20px] font-semibold text-[#232323] font-popins capitalize mb-3">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email",
                    },
                  })}
                  className="border border-[#E3E3E3] rounded-[20px] px-6 py-4 sm:px-10 sm:py-5 w-full text-[16px] sm:text-[18px] text-[#ADADAD] font-popins outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="relative w-full">
                <label className="block text-[18px] sm:text-[20px] font-semibold text-[#232323] font-popins capitalize mb-3">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="border border-[#E3E3E3] rounded-[20px] px-6 py-4 sm:px-10 sm:py-5 w-full text-[16px] sm:text-[18px] text-[#ADADAD] font-popins outline-none pr-[60px]"
                />
                <div
                  className="absolute lg:top-16 md:top-16 top-14 right-5 cursor-pointer text-[#ADADAD]"
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

              {/* Submit Button */}
              <button
                type="submit"
                className="px-10 py-4 w-full bg-[#52ABFF] rounded-[20px] mt-6 sm:mt-10 mb-2 border border-transparent text-white text-[18px] sm:text-[20px] font-popins font-semibold cursor-pointer hover:bg-transparent hover:border hover:border-[#E3E3E3] hover:text-black duration-300"
              >
                {loading ? "Signing..." : "Sign Up"}
              </button>

              {/* Google Sign Up Button */}
              <button
              onClick={() => handleSocialLogin()}
                type="button"
                className="xl:px-10 px-3 py-4 w-full flex justify-center items-center gap-x-2 rounded-[20px] text-[18px] sm:text-[20px] font-popins font-semibold cursor-pointer border border-[#E3E3E3] text-[#52ABFF] hover:border-transparent hover:bg-[#52ABFF] hover:text-[#FFF] duration-300"
              >
                <FaGoogle />
                Continue With Google
              </button>
            </form>

            {/* Redirect to Login */}
            <p className="text-center font-popins text-[#787878] font-normal pt-10 sm:pt-20 text-sm sm:text-base">
              Have an account?{" "}
              <Link
                to="/login"
                className="text-[#52ABFF] font-semibold cursor-pointer"
              >
                Log In
              </Link>
            </p>
          </div>

          {/* Right Side Auth Slider */}
          <div className="w-full lg:w-1/2 bg-[#003072] rounded-[30px] sm:rounded-[40px] py-[30px] px-6 sm:py-[50px] sm:px-12 flex items-center justify-center">
            <Authslider />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Signup;
