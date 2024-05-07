// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

const SlideBar = () => {
  return (
    <div className="sidebar flex flex-col pt-8 gap-5 w-full max-w-[250px] h-[100vh] bg-white">
      <Link to={"/addProduct"} className="decoration-0">
        <div className="flex justify-center items-center gap-5 mx-5 py-[5px] p-[10px] rounded bg-[#f6f6f6] cursor-pointer">
          <i className="fa-solid fa-cart-plus"></i>
          <p>Add Product</p>
        </div>
      </Link>

      <Link to={"/listProduct"} className="decoration-0">
        <div className="flex justify-center items-center gap-5 mx-5 py-[5px] p-[10px] rounded bg-[#f6f6f6] cursor-pointer">
          <i className="fa-solid fa-list"></i>
          <p>List Products</p>
        </div>
      </Link>

      <Link to={"/medicineTypes"} className="decoration-0">
        <div className="flex justify-center items-center gap-5 mx-5 py-[5px] p-[10px] rounded bg-[#f6f6f6] cursor-pointer">
          <i className="fa-solid fa-list"></i>
          <p>Medicine types</p>
        </div>
      </Link>

      <Link to={"/listAccounts"} className="decoration-0">
        <div className="flex justify-center items-center gap-5 mx-5 py-[5px] p-[10px] rounded bg-[#f6f6f6] cursor-pointer">
          <i className="fa-solid fa-list"></i>
          <p>Accounts</p>
        </div>
      </Link>

      <Link to={"/listCustomers"} className="decoration-0">
        <div className="flex justify-center items-center gap-5 mx-5 py-[5px] p-[10px] rounded bg-[#f6f6f6] cursor-pointer">
          <i className="fa-solid fa-list"></i>
          <p>Customers</p>
        </div>
      </Link>

      <Link to={"/listOrders"} className="decoration-0">
        <div className="flex justify-center items-center gap-5 mx-5 py-[5px] p-[10px] rounded bg-[#f6f6f6] cursor-pointer">
          <i className="fa-solid fa-list"></i>
          <p>Orders</p>
        </div>
      </Link>

      {/* <Link to={"/listInvoice"} className="decoration-0">
        <div className="flex justify-center items-center gap-5 mx-5 py-[5px] p-[10px] rounded bg-[#f6f6f6] cursor-pointer">
          <i className="fa-solid fa-list"></i>
          <p>Invoice</p>
        </div>
      </Link> */}

      <Link to={"/listSuppliers"} className="decoration-0">
        <div className="flex justify-center items-center gap-5 mx-5 py-[5px] p-[10px] rounded bg-[#f6f6f6] cursor-pointer">
          <i className="fa-solid fa-list"></i>
          <p>Suppliers</p>
        </div>
      </Link>

      <Link to={"/vouchers"} className="decoration-0">
        <div className="flex justify-center items-center gap-5 mx-5 py-[5px] p-[10px] rounded bg-[#f6f6f6] cursor-pointer">
          <i className="fa-solid fa-list"></i>
          <p>Vouchers</p>
        </div>
      </Link>
    </div>
  );
};

export default SlideBar;
