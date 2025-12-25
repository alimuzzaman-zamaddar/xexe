import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { CreateUserFunction, EmailVerifyFunction, GetUserDataFunction, logoutApi, OtpResendFunction, RegisterFunction, ResetPasswordFunction, SocialLoginFunction, updateUserData, VerifyOtpFunction, type ResetPasswordPayload, type UpdateUserPayload } from "./auth.api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";
import type { AxiosError } from "axios";
import type { User } from "../Provider/AuthProvider";

// Define the response error structure
interface ErrorResponse {
  message: string; // Assuming the response contains a 'message' property
}

export const useCreateUser = (setLoading: (val: boolean) => void) => {
  return useMutation({
    mutationFn: CreateUserFunction, // The API function for creating the user
    mutationKey: ["create-user"], // Unique key for caching the mutation in React Query
    onMutate: () => {
      setLoading(true); // Set loading to true when mutation starts
    },
    onSuccess: (data) => {
      setLoading(false); // Set loading to false when mutation is successful
      toast.success(data?.message || "User created successfully!"); // Display success message
    },
    onError: (err: AxiosError) => {
      setLoading(false); // Reset loading in case of error

      // Check if the error has a response and display an appropriate message
      if (err.response) {
         console.log(err.response);
      } else {
        toast.error("An unknown error occurred while creating user.");
      }
    },
  });
};
export const useRegister = (setLoading: (val: boolean) => void) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: RegisterFunction,
    mutationKey: ['register'],
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      setLoading(false);
      toast.success("Registration successful!");

      if (data?.email) {
        navigate("/otp-verifyreg", { state: { email: data.email } });
      } else {
        toast.error("Something went wrong. Email not found.");
      }
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      setLoading(false);

      if (err.response) {
        toast.error(err.response.data?.message || 'Registration failed');
      } else {
        toast.error('An unknown error occurred');
      }
    },
  });
};

export const useGetUserData = (token: string | null) => {
  const options: UseQueryOptions<User, any> = {
    queryKey: ["userData"],
    queryFn: GetUserDataFunction,
    enabled: !!token,
  };

  return useQuery(options);
};

export const useSocialLogin = (setLoading?: (val: boolean) => void) => {
  const { setToken, setUser } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["social-login"],
    mutationFn: SocialLoginFunction,
    onMutate: () => setLoading?.(true),
    onSuccess: (data) => {
      setLoading?.(false);
      if (data?.token) {
        setToken(data.token);
        setUser({
          id: data.id,
          name: data.name,
          email: data.email,
          role: data.role || "user",           // Ensure `role` is provided
          avatar: data.avatar || null,         // Ensure `avatar` is provided
          provider: data.provider || null,     // Ensure `provider` is provided
          provider_id: data.provider_id || null,
          agree_to_terms: data.agree_to_terms || false,
          stripe_id: data.stripe_id || null,
          pm_type: data.pm_type || null,
          pm_last_four: data.pm_last_four || null,
          trial_ends_at: data.trial_ends_at || null,
          trial_used: data.trial_used || 0,
          isSubscribed: data.isSubscribed || false, // Ensure isSubscribed is included
          isSubscriptionExpired: data.isSubscriptionExpired || false, // Ensure this is included
          isTrial: data.isTrial || false,  // Ensure this is included
          token: data.token || "",  // Make sure to include the token
        });
        toast.success("Social login successful!");
        navigate("/"); // Navigate after social login
      }
    },
    onError: (err: any) => {
      setLoading?.(false);
      toast.error(err?.response?.data?.message || "Social login failed");
    },
  });
};


export const useLogout = () => {
  const { setUser, clearToken } = useAuth();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success("Logged out successfully!");
      clearToken(); // This also removes from localStorage
      setUser(null); // Clear user from context
      window.location.href = "/login"; // Redirect
    },
    onError: (err) => {
      console.error("Logout failed:", err);
    },
  });
};


export const useUpdateUserData = () => {
  return useMutation({
    mutationKey: ["update-user-data"], // Unique key for caching
    mutationFn: (payload: UpdateUserPayload) => updateUserData(payload), // Call the API function
    onSuccess: (data) => {
      console.log("User data updated successfully", data);
    },
    onError: (err) => {
      console.error("Error updating user data:", err);
    },
  });
};


// Optional error structure
interface ErrorResponse {
  message: string;
}

export const useEmailVerify = (setLoading?: (val: boolean) => void) => {
    const navigate = useNavigate();
  return useMutation({
    mutationFn: EmailVerifyFunction,
    mutationKey: ["email-verify"],
    onMutate: () => {
      setLoading?.(true);
    },
    onSuccess: (data) => {
      setLoading?.(false);
      toast.success(data?.message || "Verification email sent successfully!");
            if (data?.email) {
        navigate("/otp-verify", { state: { email: data.email } });
      }
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      setLoading?.(false);
      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Email verification failed.");
      }
    },
  });
};


export const useOtpVerify = (setLoading?: (val: boolean) => void) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: VerifyOtpFunction,
    mutationKey: ["verify-otp"],
    onMutate: () => setLoading?.(true),
onSuccess: (data) => {
  setLoading?.(false);
  toast.success("OTP verified successfully!");

  console.log("OTP verification response:", data);

            if (data?.email) {
        navigate("/new-password", { state: { email: data.email } });
      }
},
    onError: (err: AxiosError<ErrorResponse>) => {
      setLoading?.(false);
      toast.error(err.response?.data?.message || "OTP verification failed.");
    },
  });
};





interface ErrorResponse {
  message: string;
}

export const useOtpResend = (setLoading?: (val: boolean) => void) => {
  return useMutation({
    mutationFn: OtpResendFunction,
    mutationKey: ["otp-resend"],
    onMutate: () => setLoading?.(true),
    onSuccess: (data) => {
      setLoading?.(false);
      toast.success(data?.message || "OTP has been resent!");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      setLoading?.(false);
      toast.error(err.response?.data?.message || "Failed to resend OTP.");
    },
  });
};



interface ErrorResponse {
  message: string;
}

export const useResetPassword = (setLoading?: (val: boolean) => void) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => ResetPasswordFunction(payload),
    mutationKey: ["reset-password"],
    onMutate: () => setLoading?.(true),
    onSuccess: (data) => {
      console.log(data);
      setLoading?.(false);
      toast.success("Password reset successfully!");
         navigate("/login");  // <--- Redirect to login here
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      setLoading?.(false);
      toast.error(err.response?.data?.message || "Password reset failed.");
    },
  });
};


