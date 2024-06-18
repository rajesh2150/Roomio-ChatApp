import React, { useState } from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  const [user, setUser] = useState("Sign Up");
  return (
    <div className="navbar">
      <div className="app-title-div">
        <h1 className="app-title">Roomio</h1>
      </div>
      <div>
       {/* <NavLink className="Navlinks">About us</NavLink>
       <NavLink className="Navlinks">Contact us</NavLink> */}

      </div>
    </div>
  );
};

export default Navbar;
