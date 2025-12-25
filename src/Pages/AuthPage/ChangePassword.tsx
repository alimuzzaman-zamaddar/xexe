import { useForm } from "react-hook-form";
import Container from "../../shared/Container";

import { useState } from "react";
import toast from "react-hot-toast";
import { useChangePassword } from "../../Services/auth.api";
import { Link } from "react-router-dom";

type FormValues = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  const [loading, setLoading] = useState(false);
  const { changePassword } = useChangePassword();

  const onSubmit = async (data: FormValues) => {
    if (data.password !== data.password_confirmation) {
      setError("password_confirmation", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    try {
      setLoading(true);
      await changePassword(data);
      toast.success("Password changed successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Password change failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-10 sm:py-16 lg:py-20 2xl:px-0 px-4">
      <Container>
        <div className="max-w-xl mx-auto border border-[#E3E3E3] rounded-[30px] p-6 sm:p-10 lg:p-12">
          <h3 className="text-center font-popins font-semibold text-3xl lg:text-[36px] text-black mb-8">
            Change Password
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="font-semibold text-[#232323] block mb-1">Current Password</label>
              <input
                type="password"
                {...register("current_password", { required: true })}
                className="w-full border rounded-[16px] p-3"
                placeholder="Current password"
              />
              {errors.current_password && (
                <p className="text-red-500 text-sm mt-1">Current password is required</p>
              )}
            </div>

            <div>
              <label className="font-semibold text-[#232323] block mb-1">New Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="w-full border rounded-[16px] p-3"
                placeholder="New password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">Password must be at least 6 characters</p>
              )}
            </div>

            <div>
              <label className="font-semibold text-[#232323] block mb-1">Confirm Password</label>
              <input
                type="password"
                {...register("password_confirmation", { required: true })}
                className="w-full border rounded-[16px] p-3"
                placeholder="Confirm password"
              />
              {errors.password_confirmation && (
                <p className="text-red-500 text-sm mt-1">{errors.password_confirmation.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#52ABFF] text-white rounded-[20px] py-3 font-popins font-semibold text-lg hover:bg-[#3498ff] duration-300"
            >
              {loading ? "Changing..." : "Change Password"}
            </button>
          </form>

                        <div className="text-right mt-10">
                <Link to="/forgot-password">
                  <span className="text-[16px] text-[#ADADAD] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </Link>
              </div>
        </div>
      </Container>
    </section>
  );
};

export default ChangePassword;
