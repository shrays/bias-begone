import React from "react";
import { Nav, NavLogo, NavLink, NavMenu }
    from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <NavLogo src="/logo.png" alt="Logo" />
                <NavMenu>
                    <NavLink to="/">
                        Home
                    </NavLink>
                    <NavLink to="/about">
                        About
                    </NavLink>
                    <NavLink to="/example">
                        Example
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};
 
export default Navbar;