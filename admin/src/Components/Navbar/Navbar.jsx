/* eslint-disable no-unused-vars */
import React from "react";
import navbarLogo from "../../assets/logo.png";
import navbarProfile from "../../assets/user.png";

const Navbar = () => {
  return (
    <div className="w-full bg-primaryColor">
      <div className="container">
        <div className="flex justify-between items-center bg-primaryColor pt-3 pb-[10px]">
          <img
            className="navbar_logo max-h-[40px]"
            src={navbarLogo}
            alt="logo"
          />
          <div className="flex items-center justify-center">
            <img className="w-[50px]" src={navbarProfile} alt="profile" />
            <p className="text-white ml-3">ADMIN</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
