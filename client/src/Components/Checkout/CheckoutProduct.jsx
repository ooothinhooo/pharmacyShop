import React, { useContext } from "react";

import { ShopContext } from "../../Context/ShopContext";
import { CheckoutHasProduct } from "./CheckoutHasProduct";
import { CartItemEmpty } from "../CartItem/CartItemEmpty";

export const CheckoutProduct = () => {
  const { cartItems } = useContext(ShopContext);
  const value = Object.values(cartItems);
  const hasValue = value.some(value => value > 0);
  if (hasValue > 0) {
    return <CheckoutHasProduct />;
  } else {
    return <CartItemEmpty />;
  }
};
