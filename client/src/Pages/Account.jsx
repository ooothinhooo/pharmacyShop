import React, { useContext } from "react";
import { AccountSmall } from "../Components/Account/AccountSmall";
import { AccountBig } from "../Components/Account/AccountBig";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { capitalize } from "lodash";
import { Orders } from "../Components/Account/Orders";
import { Coupon } from "../Components/Account/Coupon";
import { Address } from "../Components/Account/Address";
import { Prescriptions } from "../Components/Account/Prescriptions";
// import { Test_reports } from "../Components/Account/Test_reports";
import { Ranking_rules } from "../Components/Account/Ranking_rules";
import { History_point } from "../Components/Account/History_point";
import { ShopContext } from "../Context/ShopContext";

export const Account = () => {
  // const { userData } = useContext(ShopContext);
  // console.log(userData);
  const { state } = useLocation();
  console.log(state);
  const { accountOption } = useParams();
  const components = {
    Orders,
    Coupon,
    Address,
    Prescriptions,
    Ranking_rules,
    History_point,
  };

  console.log(components[capitalize(accountOption)]);

  const DynamicComponent = components[capitalize(accountOption)] || AccountBig;

  console.log(DynamicComponent);

  return (
    <div className="desktop_account-page mt-12">
      <div className="container">
        <div className="desktop_box flex justify-between gap-5 mb-[50px]">
          <AccountSmall user={state}/>
          <DynamicComponent user={state}/>
        </div>
      </div>
    </div>
  );
};
