// contact.api.ts
import { axiosSecure } from "../Hooks/useAxiosSecure";

// Define types for the payload and response

export type ContactFormPayload = {
  name: string;
  email: string;
  company_name: string;
  company_website: string;
  message: string;
};

// Function to submit the contact form
export const submitContactForm = async (payload: ContactFormPayload) => {
  const formData = new FormData();
  formData.append("name", payload.name);
  formData.append("email", payload.email);
  formData.append("company_name", payload.company_name);
  formData.append("company_website", payload.company_website);
  formData.append("message", payload.message);

  // Making POST request with form data
  const { data } = await axiosSecure.post("/api/contact", formData, {
    headers: {
      Accept: "application/json",    },
  });

  return data;
};

