import React from "react";
import Menu from "./Menu";
import Footer from "./Footer";

import Wrapper from "./Layout.style";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <Wrapper>
      <Menu />
      <Outlet />
      <Footer />
    </Wrapper>
  );
}

export default Layout;
