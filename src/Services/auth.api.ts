import { axiosPublic } from "../Hooks/useAxiosPublic";
import getAxiosSecure from "../Hooks/useAxiosSecure";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  agree_to_terms: number;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Define the type for payload
export interface CreateUserPayload {
  name: string;
  email: string;
  role: string;
  password: string;
}

// Create user API function using axios instance
export const CreateUserFunction = async (payload: CreateUserPayload) => {
  // Create FormData to send as a POST request
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  try {
    // Sending a POST request to create the user using axios instance
    const { data } = await getAxiosSecure().post("/api/enterprise-user-create", formData);
    
    // Returning the response data (adjust according to your API response structure)
    return data?.data; 
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Rethrow error to be handled in the hook
  }
};


export const RegisterFunction = async (payload: RegisterPayload) => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    formData.append(key, value.toString());
  });

  const { data } = await axiosPublic.post("/api/users/register", formData);
  console.log(data);
  return { email: payload.email }; // Adjust based on what you want to pass to OTP
};


export const LoginFunction = async (payload: LoginPayload) => {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("password", payload.password);

  const { data } = await axiosPublic.post("/api/users/login", formData, {
    headers: {
      Accept: "application/json",
    },
  });

  return data?.data; // This will return the user data with token
};

// This function is used to get user data after login
export const GetUserDataFunction = async () => {
  const axios = getAxiosSecure();

  const { data } = await axios.get("/api/users/data", {
    headers: {
      Accept: "application/json",
    },
  });

  return data?.data; // user object
};




interface SocialLoginPayload {
  token: string;
  provider: "google" | "facebook"; // add others if needed
  username: string;
  email: string;
  avatar?: string;
}

export const SocialLoginFunction = async (payload: SocialLoginPayload) => {
  const formData = new FormData();
  formData.append("token", payload.token);
  formData.append("provider", payload.provider);
  formData.append("username", payload.username);
  formData.append("email", payload.email);
  if (payload.avatar) {
    formData.append("avatar", payload.avatar);
  }

  const { data } = await axiosPublic.post("/api/social-login", formData, {
    headers: { Accept: "application/json" },
  });

  return data?.data; // contains user + token
};





export const OtpVerifyFunction = async (payload: { email: string; otp: string }) => {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("otp", payload.otp);

  const { data } = await axiosPublic.post("/api/users/register/otp-verify", formData, {
    headers: {
      Accept: "application/json",  // Required header
    },
  });

  return data?.data;
};



export const logoutApi = async () => {
  const axios = getAxiosSecure();
  const { data } = await axios.post(
    "/api/users/logout",
    {},
    { headers: { Accept: "application/json" } }
  );
  return data;
};


export interface UpdateUserPayload {
  name: string;
  email: string;
  avatar?: File | null;
}

export const updateUserData = async (payload: UpdateUserPayload) => {
  try {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    if (payload.avatar) {
      formData.append("avatar", payload.avatar); // ✅ send file properly
    }

    const { data } = await getAxiosSecure().post(
      "/api/users/data/update",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.log("Upload failed", error);
    throw new Error("Error updating user data");
  }
};





// EmailVerifyFunction.ts
export const EmailVerifyFunction = async (payload: { email: string }) => {
  const formData = new FormData();
  formData.append("email", payload.email);

  const { data } = await axiosPublic.post("/api/users/login/email-verify", formData, {
    headers: {
      Accept: "application/json", // Ensure correct header for Laravel backend
    },
  });

  return data?.data; // Return only the data payload
};


export const VerifyOtpFunction = async (payload: { email: string; otp: string }) => {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("otp", payload.otp);

  const { data } = await axiosPublic.post("/api/users/login/otp-verify", formData, {
    headers: {
      Accept: "application/json",
    },
  });

  return data?.data;
}



export const OtpResendFunction = async (payload: { email: string }) => {
  const formData = new FormData();
  formData.append("email", payload.email);

  const { data } = await axiosPublic.post("/api/users/login/otp-resend", formData, {
    headers: {
      Accept: "application/json",
    },
  });

  return data?.data;
};


export interface ResetPasswordPayload {
  email: string;
  password: string;
  password_confirmation: string;
}

export const ResetPasswordFunction = async (payload: ResetPasswordPayload) => {
  const formData = new FormData();
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  formData.append("password_confirmation", payload.password_confirmation);

  const { data } = await axiosPublic.post("/api/users/login/reset-password", formData, {
    headers: {
      Accept: "application/json",
    },
  });

  return data?.data;
};





interface ChangePasswordPayload {
  current_password: string;
  password: string;
  password_confirmation: string;
}

export const useChangePassword = () => {
  const axiosSecure = getAxiosSecure();

  const changePassword = async (data: ChangePasswordPayload) => {
    try {
      const res = await axiosSecure.post("/api/users/password/change", data, {
        headers: { Accept: "application/json" },
      });
      return res.data;
    } catch (error: any) {
      throw error?.response?.data || error;
    }
  };

  return { changePassword };
};


export const verifyOtpRequest = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("otp", otp);

  const { data } = await axiosPublic.post(
    "/api/users/register/otp-verify",
    formData
  );

  return data; // Should return token/user if successful
};


