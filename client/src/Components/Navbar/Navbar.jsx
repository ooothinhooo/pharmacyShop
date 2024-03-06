import React from "react";
import { NavbarSearch } from "./NavbarSearch";
import { NavbarMenu } from "./NavbarMenu";
export const Navbar = () => {
  return (
    <header className=" w-full bg-[rgb(24,119,51)] sticky top-0 z-30">
      <div className="container">
        <NavbarSearch />
        <NavbarMenu />
      </div>
    </header>
  );
};
