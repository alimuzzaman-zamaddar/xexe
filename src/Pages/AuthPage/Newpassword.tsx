import Container from "../../shared/Container";
import Authslider from "../../components/Reusable/Authslider";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useResetPassword } from "../../Services/auth.api.hook";
import toast from "react-hot-toast";

type FormValues = {
  password: string;
  Newpassword: string;
};

const Newpassword = () => {
  const location = useLocation();
  const { email,  } = location.state || {}; // Key = password_reset_token

  const [showPassword, setShowPassword] = useState(false);
  const [confirmpassword, setConfirmpassword] = useState(false);
  const togglePassword = () => setShowPassword(prev => !prev);
  const toggleConfirmPassword = () => setConfirmpassword(prev => !prev);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const { mutate: resetPassword, isPending } = useResetPassword();

const onSubmit = (data: FormValues) => {
  if (!email) {
    toast.error("Email is missing.");
    return;
  }

  resetPassword({
    email,
    password: data.password,
    password_confirmation: data.Newpassword,
  });
};



  return (
    <section className="py-10 sm:py-16 lg:py-20 2xl:px-0 px-4">
      <Container>
        <div className="flex flex-col lg:flex-row lg:items-stretch gap-8 lg:gap-12">
          {/* Left */}
          <div className="w-full xl:w-2/5 border border-[#E3E3E3] rounded-[30px] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
            <div>
              <h3 className="font-popins font-semibold text-2xl sm:text-3xl xl:text-[44px] text-black text-center pb-2">
                Reset your password
              </h3>
              <h5 className="font-popins text-base sm:text-lg xl:text-[24px] text-[#ADADAD] font-normal text-center pb-10 max-w-md mx-auto">
                The password must be different than before
              </h5>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                {/* New Password */}
                <div className="relative w-full">
                  <label className="block text-base sm:text-lg font-semibold text-[#232323] mb-3">
                    New Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className="border border-[#E3E3E3] rounded-[20px] px-6 py-4 w-full text-[16px] text-[#ADADAD] pr-[60px]"
                  />
                  <div onClick={togglePassword} className="absolute top-[55px] right-5 cursor-pointer text-[#ADADAD]">
                    {showPassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2">{errors.password.message}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative w-full">
                  <label className="block text-base sm:text-lg font-semibold text-[#232323] mb-3">
                    Confirm Password
                  </label>
                  <input
                    type={confirmpassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    {...register("Newpassword", {
                      required: "Confirm Password is required",
                      minLength: {
                        value: 6,
                        message: "Confirm Password must be at least 6 characters",
                      },
                      validate: value => value === watch("password") || "Passwords do not match",
                    })}
                    className="border border-[#E3E3E3] rounded-[20px] px-6 py-4 w-full text-[16px] text-[#ADADAD] pr-[60px]"
                  />
                  <div onClick={toggleConfirmPassword} className="absolute top-[55px] right-5 cursor-pointer text-[#ADADAD]">
                    {confirmpassword ? <FiEyeOff size={22} /> : <FiEye size={22} />}
                  </div>
                  {errors.Newpassword && (
                    <p className="text-red-500 text-sm mt-2">{errors.Newpassword.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="px-10 py-4 w-full bg-[#52ABFF] rounded-[20px] mt-6 border border-transparent text-white text-[18px] font-popins font-semibold hover:bg-transparent hover:border-[#E3E3E3] hover:text-black duration-300"
                >
                  {isPending ? "Submitting..." : "Continue"}
                </button>
              </form>
            </div>

            <p className="text-center font-popins text-[#787878] font-normal pt-6 text-sm sm:text-base">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-[#52ABFF] font-semibold cursor-pointer">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 bg-[#003072] rounded-[30px] sm:rounded-[40px] py-10 sm:py-[50px] px-6 sm:px-10 lg:px-12">
            <Authslider />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Newpassword;
