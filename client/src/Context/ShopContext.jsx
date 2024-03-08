import React, { createContext, useEffect, useState } from "react";
// import all_products from "../Components/Assets/dataFake";
// import dataTest from "../Components/Assets/dataTest";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < 300 + 1; index++) {
    cart[index] = 0;
  }

  return cart;
};

const ShopContextProvider = (props) => {
  const [all_products, setAll_Products] = useState([])
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [stateLogin, setStateLogin] = useState("Đăng ký");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/allProducts")
      .then((response) => response.json())
      .then((data) => setAll_Products(data.products))

    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/getCart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data));

      fetch("http://localhost:4000/userProfile", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setUserData(data));
    }
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addToCart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removeFromCart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "Content-Type": "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  };

  const getTotalCartAmountWithsale = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        totalAmount +=
          itemInfo.price * cartItems[item] -
          (itemInfo.price * cartItems[item] * itemInfo.sale) / 100;
      }
    }
    return totalAmount;
  };

  const getTotalCartAmountWithVat = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_products.find(
          (product) => product.id === Number(item)
        );
        // Tính giá sau khi đã trừ giảm giá (sale)
        const priceAfterDiscount = itemInfo.price * (1 - itemInfo.sale / 100);
        // Tính giá sau khi đã cộng thuế (vat)
        const priceWithVat = priceAfterDiscount * (1 + 0.1);
        totalAmount += priceWithVat * cartItems[item];
      }
    }
    return totalAmount.toFixed(0);
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_products,
    userData,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmountWithsale,
    getTotalCartAmountWithVat,
    getTotalCartItems,
    stateLogin,
    setStateLogin,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
