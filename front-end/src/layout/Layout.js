import React from "react";
import Menu from "./Menu";

import { Outlet } from "react-router-dom";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
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
