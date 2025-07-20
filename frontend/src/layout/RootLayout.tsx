import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../shared/Footer";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  const location = useLocation();
  const isAdminLayout = location.pathname.startsWith("/admin");
  return (
    <div>
      <Toaster position="top-right" />
      {!isAdminLayout && <Navbar />}
      <Outlet />
      {!isAdminLayout && <Footer />}
    </div>
  );
};

export default RootLayout;
