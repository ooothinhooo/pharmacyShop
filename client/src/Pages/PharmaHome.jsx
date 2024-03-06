import React from "react";
import { HomeCateGory } from "../Components/HomeCateGory/HomeCateGory";
import { HomeDeal } from "../Components/HomeDeal/HomeDeal";
import { HomeBanner } from "../Components/HomeBanner/HomeBanner";
import { HomeOrderProgram } from "../Components/HomeOrderProgram/HomeOrderProgram";
import { HomeService } from "../Components/HomeService/HomeService";

export const PharmaHome = () => {
  return (
    <div className="main_home bg-[#ededed]">
      <HomeCateGory />
      <HomeDeal />
      <HomeBanner />
      <HomeOrderProgram />
      <HomeService />
    </div>
  );
};
