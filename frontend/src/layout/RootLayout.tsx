import React from "react";
import Navbar from "../shared/Navbar";
import { Outlet, useLocation } from "react-router";
import Footer from "../shared/Footer";

const RootLayout = () => {
  const location = useLocation();
  const isAdminLayout = location.pathname.startsWith("/admin");
  return (
    <div>
      {!isAdminLayout && <Navbar />}
      <Outlet />
      {!isAdminLayout && <Footer />}
    </div>
  );
};

export default RootLayout;
