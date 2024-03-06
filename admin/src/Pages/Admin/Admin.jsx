import React from "react";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";

const Admin = () => {
  return (
    <div className="admin flex">
      <SlideBar />
      <Routes>
        <Route path="/addProduct"  element={<AddProduct />}/>
        <Route path="/listProduct"  element={<ListProduct />}/>
      </Routes>
    </div>
  );
};

export default Admin;
