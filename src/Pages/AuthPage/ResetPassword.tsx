import { useForm } from "react-hook-form";
import Authslider from "../../components/Reusable/Authslider";
import Container from "../../shared/Container";
import OTPInput from "react-otp-input";
import { useState } from "react";

type FormValues = {
  otp: string;
};

const ResetPassword = () => {
  const [otp, setOtp] = useState<string>("");

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    
    if (otp.length !== 5) {
      setError("otp", {
        type: "manual",
        message: "Please enter all 5 digits",
      });
    } else {
      clearErrors("otp");
      console.log("OTP submitted:", otp);
    }
  };

  return (
    <section className="py-10 sm:py-16 lg:py-20 2xl:px-0 px-4">
      <Container>
        <div className="flex flex-col xl:flex-row justify-between gap-8">
          {/* Left */}
          <div className="w-full xl:w-2/5 border border-[#E3E3E3] rounded-[30px] flex flex-col justify-between p-6 sm:p-10 lg:p-12">
            <div>
              <h3 className="font-popins font-semibold text-2xl sm:text-3xl lg:text-[44px] text-black text-center pb-2">
                Enter verification code
              </h3>
              <h5 className="font-popins text-base sm:text-lg lg:text-[24px] text-[#ADADAD] font-normal text-center pb-10 max-w-md mx-auto">
                We have sent a code to{" "}
                <span className="text-black font-medium">
                  emina0052@gmail.com
                </span>
              </h5>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3"
              >
                <label className="block text-base sm:text-lg lg:text-[20px] font-semibold text-[#232323] font-popins capitalize">
                  OTP
                </label>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={5}
                  renderSeparator={
                    <span className="mx-1 sm:mx-2 text-xl text-gray-400">
                      -
                    </span>
                  }
                  renderInput={(props, index) => (
                    <input
                      {...props}
                      key={index}
                      style={{ width: "100%", maxWidth: "60px" }}
                      className="h-14 sm:h-20 border border-[#E8E8E8] rounded-[16px] text-center text-[24px] font-popins text-[#232323] outline-none focus:border-[#52ABFF]"
                    />
                  )}
                  containerStyle="flex justify-center gap-2 sm:gap-3"
                />

                {errors.otp && (
                  <p className="text-red-500 text-sm">{errors.otp.message}</p>
                )}

                <button
                  type="submit"
                  className="px-10 py-3 sm:py-4 w-full bg-[#52ABFF] rounded-[20px] mt-10 mb-2 border border-transparent text-white text-[18px] sm:text-[20px] font-popins font-semibold cursor-pointer hover:bg-transparent hover:border hover:border-[#E3E3E3] hover:text-black duration-300"
                >
                  Continue
                </button>

                <button
                  type="button"
                  className="px-10 py-3 sm:py-4 w-full flex justify-center items-center gap-x-2 rounded-[20px] text-[18px] sm:text-[20px] font-popins font-semibold cursor-pointer border border-[#E3E3E3] text-[#ADADAD] hover:border-transparent hover:bg-[#52ABFF] hover:text-[#FFF] duration-300"
                >
                  Cancel
                </button>
              </form>
            </div>

            <p className="text-center font-popins text-[#787878] font-normal pt-6 text-sm sm:text-base">
              Didn’t get the OTP?{" "}
              <span className="text-[#52ABFF] font-semibold cursor-pointer">
                Resend
              </span>
            </p>
          </div>

          {/* Right */}
          <div className="w-full xl:w-1/2 bg-[#003072] rounded-[30px] sm:rounded-[40px] py-10 sm:py-[50px] px-6 sm:px-10 lg:px-12">
            <Authslider />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ResetPassword;
