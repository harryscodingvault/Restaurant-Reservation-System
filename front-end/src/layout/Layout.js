import React from "react";
import Menu from "./Menu";

import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout-container">
      <Menu />
      <Outlet />
      <h3>Footer</h3>
    </div>
  );
}

export default Layout;
