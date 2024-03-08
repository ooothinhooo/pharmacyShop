import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NewProduct from "./NewProduct";
import BestSellingProduct from "./BestSellingProduct";
import GoodProductForMAB from "./GoodProductForMAB";
import RecommendForYou from "./RecommendForYou";

export const HomeOrderProgram = () => {
  return (
    <div className="bg-white container-wrapper">
      <div className="container">
        <RecommendForYou />

        <BestSellingProduct />

        <NewProduct />

        <GoodProductForMAB />
      </div>
    </div>
  );
};
