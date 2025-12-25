import getAxiosSecure, { axiosSecure } from "../Hooks/useAxiosSecure";

export type SubscribePayload = {
  slug: string;
  success_redirect_url: string;
  cancel_redirect_url?: string;
};


export const checkoutFunction = async (payload:SubscribePayload) => {
  const { data } = await axiosSecure.post("/api/create-checkout-session", payload);
  return data?.data;
};

export interface Invoice {
  id: string;
  total: string;
  date: string;
  paid: string;
  download_url: string;
  plan: string;
}

export interface CurrentSubscriptionResponse {
  description: string;
  plan: string;
  isSubscriptionActive: boolean;
  expire_date: string;
  userRole: string;
  invoices: Invoice[];
}
export const getCurrentSubscriptionDetails = async (): Promise<CurrentSubscriptionResponse> => {
  const axiosSecure = getAxiosSecure();
  const { data } = await axiosSecure.get("/api/current-subscription-details");
  return data;
};


export const cancelSubscription = async () => {
  try {
    // Send GET request with the Authorization header
    const response = await axiosSecure.get("/api/cancel-subscription");
    
    // Return the response data
    return response.data;
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw error;  // Rethrow the error to be handled in the hook
  }
};




// Services/auth.api.ts

type FreeTrialPayload = {
  email: string;
  success_redirect_url: string;
  cancel_redirect_url: string;
};

export const FreeTrialFunction = async (payload: FreeTrialPayload) => {
  const axios = getAxiosSecure(); // Secure axios instance

  // Instead of FormData, send JSON if backend supports it
  try {
    const { data } = await axios.post("/api/free-trial", payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    // Updated: Use correct key 'status' and return only if true
    if (data?.status) {
      return data.data; // This is the Stripe Checkout URL
    } else {
      throw new Error(data?.message || "Free trial registration failed");
    }
  } catch (error: any) {
    console.error("Error during free trial request:", error);
    throw error;
  }
};