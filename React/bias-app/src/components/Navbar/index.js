import React from "react";
import { Nav, NavLogo, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavLogo src="/logo.png" alt="Logo" />
        <NavMenu>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/linear">Linear</NavLink>
          <NavLink to="/nonlinear">NonLinear</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
