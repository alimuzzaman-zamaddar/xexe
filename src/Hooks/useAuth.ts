// import { useContext } from "react";
// import { AuthContext } from "../Provider/AuthProvider";

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

import { useContext } from "react";
import { AuthContext, type AuthContextType} from "../Provider/AuthProvider";

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  // Ensure the context is available; otherwise, throw an error
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  // Return the context for easy access to user, token, etc.
  return context;
};
