import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Authslider from "../../components/Reusable/Authslider";
import { verifyOtpRequest } from "../../Services/auth.api";
import { useOtpResend } from "../../Services/auth.api.hook";

type FormValues = {
  otp: string;
};

const OtpVerifyreg = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { email } = location.state || {};
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { mutate: resendOtp } = useOtpResend(setLoading); 

const onSubmit = async (data: FormValues) => {
  if (!email) {
    toast.error("Email is missing.");
    return;
  }

  try {
    setLoading(true);
    const res = await verifyOtpRequest({ email, otp: data.otp });

    // Auto-login: Save token or user data
if (res?.token) {
  localStorage.setItem("token", res.token);
  toast.success("OTP verified and logged in!");
} else {
  toast.success("OTP Verified Please");
  navigate("/login"); 

}
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Verification failed");
  } finally {
    setLoading(false);
  }
};


  const handleResend = () => {
    if (!email) {
      toast.error("Email is missing.");
      return;
    }
    resendOtp({ email });
  };

  return (
  <div className="min-h-screen flex justify-center items-center px-4">
  <div className="flex flex-col lg:flex-row justify-center items-center gap-10 w-full max-w-[1200px] mx-auto">
    {/* OTP Section */}
    <section className="w-full lg:w-[40%] py-10 lg:py-20">
      <div className="bg-white rounded-2xl p-6 sm:p-10 border">
        <h2 className="text-2xl font-semibold mb-6">Please Verify Email Before login </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-[18px] sm:text-[20px] font-semibold text-[#232323] font-popins capitalize mb-3">
              Enter OTP
            </label>
            <input
              type="text"
              {...register("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "OTP must be exactly 4 digits",
                },
              })}
              className="w-full border rounded-lg px-4 py-3"
              placeholder="Enter OTP"
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">
                {errors.otp.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#52ABFF] text-white font-semibold rounded-lg"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Didn’t receive an OTP?{" "}
          <span
            onClick={handleResend}
            className="text-[#52ABFF] cursor-pointer font-medium"
          >
            Resend OTP
          </span>
        </p>
      </div>
    </section>

    {/* Slider Section */}
    <div className="w-full lg:w-[60%]">
      <div className="w-full bg-[#003072] rounded-[30px] sm:rounded-[40px] py-10 sm:py-[50px] px-6 sm:px-10 lg:px-12">
        <Authslider />
      </div>
    </div>
  </div>
</div>

  );
};

export default OtpVerifyreg;
