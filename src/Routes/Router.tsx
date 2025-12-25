import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../Pages/Home";
import Pricing from "../Pages/Pricing";
import Signup from "../Pages/AuthPage/Signup";
import Login from "../Pages/AuthPage/Login";
import ForgotPassword from "../Pages/AuthPage/ForgotPassword";
import ResetPassword from "../Pages/AuthPage/ResetPassword";
import Newpassword from "../Pages/AuthPage/Newpassword";
import Contact from "../Pages/Contact";
import AdminDashboardLayout from "../Layout/AdminDashboardLayout";
import Dashboard from "../Pages/AdminDashboard/Dashboard";
import UserdashboardLayout from "../Layout/UserdashboardLayout";
import Scanfiles from "../Pages/Userdashboard/Scanfiles";
import Reports from "../Pages/Userdashboard/Reports";
import Error from "../Pages/Error";
import OtpVerify from "../Pages/AuthPage/OtpVerify";
import PrivateRoute from "./PrivateRoute";
import { CreateUser } from "../Pages/Userdashboard/CreateUser";
import PrivacyPolicy from "../Pages/legal/privacy-policy";
import TermsAndConditions from "../Pages/legal/terms-and-conditions";
import ChangePassword from "../Pages/AuthPage/ChangePassword";
import DataTable from "../components/Reusable/DataTable";
import OtpVerifyreg from "../Pages/AuthPage/OtpVerifyreg";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      { path: "pricing", element: <Pricing /> },
      { path: "contact", element: <Contact /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/terms-and-conditions", element: <TermsAndConditions /> },
    ],
  },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
  { path: "/otp-verify", element: <OtpVerify /> },
  { path: "/otp-verifyreg", element: <OtpVerifyreg /> },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/reset-password", element: <ResetPassword /> },
  { path: "/new-password", element: <Newpassword /> },

  {
    path: "/admindashboard",
    element: (
      <PrivateRoute allowedRoles={["admin"]}>
        <AdminDashboardLayout />{" "}
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "allfiles", element: <DataTable /> },
     { path: "scanfiles", element: <Scanfiles /> },
    ],
  },
  {
    path: "/userdashboard",
    element: (
      <PrivateRoute allowedRoles={["user", "viewer", "analyst"]}>
        {" "}
        <UserdashboardLayout />{" "}
      </PrivateRoute>
    ),
    errorElement: <Error />,
    children: [
      { index: true, element: <Scanfiles /> },
      { path: "scanfiles", element: <Scanfiles /> },
      { path: "reports", element: <Reports /> },
      { path: "create-user", element: <CreateUser /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
