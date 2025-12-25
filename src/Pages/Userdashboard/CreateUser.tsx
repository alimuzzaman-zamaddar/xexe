import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useCreateUser } from "../../Services/auth.api.hook"; // adjust path

type FormValues = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  agree_to_terms: boolean;
  role: string;
};

export const CreateUser = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const [loading, setLoading] = useState(false);  // Define loading state
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

  const { mutate: createUser } = useCreateUser(setLoading);  // Pass setLoading function to the hook

  const onSubmit = async (data: FormValues) => {
    setLoading(true); // Set loading to true when registration starts

    try {
      const payload = {
        ...data,
        password_confirmation: data.password, // Ensure passwords match
        agree_to_terms: data.agree_to_terms ? 1 : 0,
      };

      await createUser(payload); // Trigger mutation hook with the payload

      toast.success("User created successfully!");
      setLoading(false);
      navigate("/userdashboard"); // Redirect to user dashboard after creation
    } catch (err) {
      console.error("Error creating user:", err);
      setLoading(false); // Reset loading in case of error
    }
  };

  return (
    <div className="w-full xl:w-2/5 border border-[#E3E3E3] rounded-[30px] p-6 sm:p-10 lg:p-12 bg-white flex flex-col justify-between lg:mb-0 mb-5">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name Field */}
        <div>
          <label className="block text-[18px] sm:text-[20px] font-semibold text-[#232323] font-popins capitalize mb-3">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            autoComplete="name"
            {...register("name", { required: "Name is required" })}
            className="border border-[#E3E3E3] rounded-[20px] px-6 py-4 sm:px-10 sm:py-5 w-full text-[16px] sm:text-[18px] text-[#ADADAD] font-popins outline-none"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
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
              pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" },
            })}
            className="border border-[#E3E3E3] rounded-[20px] px-6 py-4 sm:px-10 sm:py-5 w-full text-[16px] sm:text-[18px] text-[#ADADAD] font-popins outline-none"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Role Selection Dropdown */}
        <div>
          <label className="block text-[18px] sm:text-[20px] font-semibold text-[#232323] font-popins capitalize mb-3">
            Select Role
          </label>
          <select
            {...register("role", { required: "Role is required" })}
            className="border border-[#E3E3E3] rounded-[20px] px-6 py-4 sm:px-10 sm:py-5 w-full text-[16px] sm:text-[18px] text-[#ADADAD] font-popins outline-none"
          >
            <option value="">Select Role</option>
            <option value="viewer">Viewer</option>
            <option value="analyst">Analytics</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
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
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
            className="border border-[#E3E3E3] rounded-[20px] px-6 py-4 sm:px-10 sm:py-5 w-full text-[16px] sm:text-[18px] text-[#ADADAD] font-popins outline-none pr-[60px]"
          />
          <div
            className="absolute lg:top-16 md:top-16 top-14 right-5 cursor-pointer text-[#ADADAD]"
            onClick={togglePassword}
          >
            {showPassword ? <FiEyeOff size={24} /> : <FiEye size={24} />}
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-10 py-4 w-full bg-[#52ABFF] rounded-[20px] mt-6 sm:mt-10 mb-2 border border-transparent text-white text-[18px] sm:text-[20px] font-popins font-semibold cursor-pointer hover:bg-transparent hover:border hover:border-[#E3E3E3] hover:text-black duration-300"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};
