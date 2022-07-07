import React from "react";
import Wrapper from "./Footer.style";

const Footer = () => {
  const thisYear = new Date().getFullYear();

  return (
    <Wrapper>
      <p>Copyright © {thisYear} harrys.one</p>
    </Wrapper>
  );
};

export default Footer;
