import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext.jsx";
import { CartItemEmpty } from "./CartItemEmpty.jsx";
import { CartItemHasProduct } from "./CartItemHasProduct.jsx";
export const CartItem = () => {
  const { cartItems } = useContext(ShopContext);
  const value = Object.values(cartItems);
  const hasValue = value.some((value) => value > 0);
  console.log(cartItems);
  if (hasValue) {
    return <CartItemHasProduct />;
  } else {
    return <CartItemEmpty />;
  }
};
