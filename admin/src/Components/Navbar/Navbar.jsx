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
          <img className="w-[50px]" src={navbarProfile} alt="profile" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
