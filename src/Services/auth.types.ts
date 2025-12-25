// src/services/auth.types.ts

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  agree_to_terms: number;
}

export interface OtpPayload {
  email: string;
  otp: string;
}

export interface ResetPasswordPayload {
  email: string;
  password: string;
  password_confirmation: string;
  key: string;
}

export interface GenericResponse<T> {
  data: T;
}

// export interface ErrorResponse {
//   response: {
//     data: {
//       message?: string;
//       [key: string]: any; // Allow any additional error fields
//     };
//   };
// }
