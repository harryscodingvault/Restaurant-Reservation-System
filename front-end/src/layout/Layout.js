import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout-container">
      <Menu />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
