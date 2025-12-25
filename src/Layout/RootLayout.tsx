import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
};

export default RootLayout;
