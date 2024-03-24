import React from "react";
import { useLocation } from "react-router-dom";
import { ProductDisplay } from "../Components/ProductDisplay/ProductDisplay";
import { Breadcrum } from "../Components/Breadcrum/Breadcrum";

export const PharmaProduct = () => {
  const { state } = useLocation();
  return (
    <div>
      <Breadcrum product={state} />
      <ProductDisplay product={state} />
    </div>
  );
};
