// contact.hook.ts

import { useMutation } from "@tanstack/react-query";
import { submitContactForm, type ContactFormPayload } from "./contact.api";


// React Query hook for submitting contact form
export const useContactForm = () => {
  return useMutation({
    mutationKey: ["submit-contact-form"],
    mutationFn: (payload: ContactFormPayload) => submitContactForm(payload),
    onSuccess: (res) => {
      console.log("Contact form submitted successfully:", res);
      // Optionally show a toast message or handle success UI
    },
    onError: (err) => {
      console.error("Error submitting contact form:", err);
      // Optionally show error UI or toast message
    },
  });
};
