import { createContext, useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import useLocalStorage from "../Hooks/useLocalStorage";
import { useGetUserData } from "../Services/auth.api.hook";

// Define the user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
  provider: string | null;
  provider_id: string | null;
  agree_to_terms: boolean;
  stripe_id: string | null;
  pm_type: string | null;
  pm_last_four: string | null;
  trial_ends_at: string | null;
  trial_used: number;
  isSubscribed: boolean;
  isSubscriptionExpired: boolean;
  isTrial: boolean;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
  refetchUser: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start with true

  const [token, setToken, clearToken] = useLocalStorage<string | null>(
    "token",
    null
  );

  const { data: userData, isLoading, refetch } = useGetUserData(token);

  const refetchUser = useCallback(() => {
    if (token) {
      refetch().then((res) => {
        if (res.data) {
          setUser(res.data); // Update user data after successful refetch
        }
      });
    }
  }, [token, refetch]);

  useEffect(() => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    if (userData && !isLoading) {
      setUser(userData);
      setLoading(false);
    }
  }, [token, userData, isLoading]);

  const allValues: AuthContextType = {
    user,
    setUser,
    loading,
    setLoading,
    token,
    setToken,
    clearToken,
    refetchUser, // Expose refetchUser to the context
  };

  return (
    <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
