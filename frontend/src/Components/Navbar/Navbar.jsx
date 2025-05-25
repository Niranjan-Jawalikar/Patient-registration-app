import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Patient List
      </NavLink>

      <NavLink to="/add">Add Patient</NavLink>
    </nav>
  );
}
