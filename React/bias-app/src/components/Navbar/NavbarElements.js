import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #fffffe;
  height: 85px;
  display: flex;
  justify-content: space-between;
  padding: 0 10rem 0 10rem;
  border-bottom: 20px solid;
  border-image-source: linear-gradient(to right, #77fbaf, #35a68d);
  border-image-slice: 1;
  margin-bottom: 2%;
`;

export const NavLogo = styled.img`
  height: 200%;
`;

export const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  padding: 0 0 0 2rem;
  font-size: 1.5rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &.active {
    color: #041734;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
