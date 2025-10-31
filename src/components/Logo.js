import React from "react";
import logoLight from "../assets/logo-light.png";
import logoDark from "../assets/logo-dark.png";

const Logo = ({ size = 40, theme = "light" }) => {
  const logoSrc = theme === "dark" ? logoLight : logoDark;
  return (
    <img
      src={logoSrc}
      alt="PDFly Logo"
      style={{ height: size, width: "auto" }}
    />
  );
};

export default Logo;
