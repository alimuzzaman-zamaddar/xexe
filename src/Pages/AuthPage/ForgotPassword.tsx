import { useForm } from "react-hook-form";
import Authslider from "../../components/Reusable/Authslider";
import Container from "../../shared/Container";
import { Link } from "react-router-dom";
import { useEmailVerify } from "../../Services/auth.api.hook";
import { useState } from "react";

type FormValues = {
  email: string;
};

const ForgotPassword = () => {
 const [loading, setLoading] = useState(false);

  const { mutate: verifyEmail } = useEmailVerify(setLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    verifyEmail({ email: data.email });
  };
  return (
    <section className="py-16 2xl:px-0 px-4">
      <Container>
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-8 h-full">
          <div className="w-full xl:w-2/5 border border-[#E3E3E3] rounded-[30px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <h3 className="font-popins font-semibold text-2xl sm:text-3xl lg:text-[44px] text-black text-center pb-10 lg:pb-20">
                Enter your email
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <label className="block text-base sm:text-lg font-semibold text-[#232323] font-popins capitalize">
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
                  className="border border-[#E3E3E3] rounded-[20px] px-6 sm:px-10 py-4 sm:py-5 w-full text-[16px] sm:text-[18px] text-[#ADADAD] font-popins outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="px-10 py-4 w-full bg-[#52ABFF] rounded-[20px] mt-6 sm:mt-10 mb-2 border border-transparent text-white text-[18px] sm:text-[20px] font-popins font-semibold cursor-pointer hover:bg-transparent hover:border hover:border-[#E3E3E3] hover:text-black duration-300 disabled:opacity-60"
                >
                  {loading ? "Processing..." : "Continue"}
                </button>
              </form>
            </div>

            <p className="text-center font-popins text-[#787878] font-normal pt-6 text-sm sm:text-base">
              Have an account?{" "}
              <Link to="/signup">
              <span className="text-[#52ABFF] font-semibold cursor-pointer">
                  Sign Up
              </span>
              </Link>
            </p>
          </div>


          <div className="w-full lg:w-1/2 bg-[#003072] rounded-[30px] sm:rounded-[40px] py-10 sm:py-[50px] px-6 sm:px-10 lg:px-12">
            <Authslider />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ForgotPassword;
