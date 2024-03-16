// eslint-disable-next-line no-unused-vars
import React from "react";
import SlideBar from "../../Components/SlideBar/SlideBar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import ListMedicineTypes from "../../Components/ListMedicineTypes/ListMedicineTypes";
import ListAccounts from "../../Components/ListAccounts/ListAccounts";
import ListCustomer from "../../Components/LitstCustomer/ListCustomer";
import ListOrders from "../../Components/ListOrders/ListOrders";
import ListInvoice from "../../Components/ListInvoice/ListInvoice";
import ListSuppliers from "../../Components/ListSuppliers/ListSuppliers";



const Admin = () => {
  return (
    <div className="admin flex">
      <SlideBar />
      <Routes>
        <Route path="/addProduct"  element={<AddProduct />}/>
        <Route path="/listProduct"  element={<ListProduct />}/>
        <Route path="/medicineTypes"  element={<ListMedicineTypes />}/>
        <Route path="/listAccounts"  element={<ListAccounts />}/>
        <Route path="/listCustomers"  element={<ListCustomer />}/>
        <Route path="/listOrders"  element={<ListOrders />}/>
        <Route path="/listInvoice"  element={<ListInvoice />}/>
        <Route path="/listSuppliers"  element={<ListSuppliers />}/>
      </Routes>
    </div>
  );
};

export default Admin;
