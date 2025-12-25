/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";

import { cancelSubscription, checkoutFunction, FreeTrialFunction, getCurrentSubscriptionDetails, type SubscribePayload } from "./subscription.api";
import { useAuth } from "../Hooks/useAuth";
import toast from "react-hot-toast";

export const useSubscribe = (): UseMutationResult<string, unknown, SubscribePayload> => {
  return useMutation<string, unknown, SubscribePayload>({
    mutationKey: ["subscribe"],
    mutationFn: (payload) => checkoutFunction(payload),
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (err) => {
      console.log("Subscription error:", err);
    },
  });
};

export const useCurrentSubscription = () => {
  return useQuery({
    queryKey: ["current-subscription"],
    queryFn: getCurrentSubscriptionDetails,
  });
};


export const useCancelSubscription = () => {
  const { refetchUser } = useAuth(); // Get refetchUser from context
  return useMutation({
    mutationKey: ["cancel-subscription"],  // Unique key for React Query caching
    mutationFn: cancelSubscription,       // The API function for canceling subscription
    onSuccess: (data) => {
      // Handle success here
      console.log("Subscription canceled successfully:", data);
      refetchUser()
    },
    onError: (error) => {
      // Handle errors here
      console.error("Error canceling subscription:", error);
    },
  });
}




// Services/auth.api.hook.ts


export const useFreeTrial = () => {
  return useMutation({
    mutationKey: ["free-trial"],
    mutationFn: FreeTrialFunction,
    onSuccess: (checkoutUrl) => {
      toast.success("Redirecting to payment...");
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    },
    onError: (err: any) => {
      console.error("Free trial error:", err);
      toast.error(
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Free trial failed. Please try again."
      );
    },
  });
};