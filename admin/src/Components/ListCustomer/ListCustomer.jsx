// eslint-disable-next-line no-unused-vars
import React, { useCallback } from "react";
import { useEffect, useState } from "react";
import { Modal, Pagination } from "antd";
import { createPortal } from "react-dom";
import CustomerDetail from "./CustomerDetail";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../util/Toast/Toast";

const ListCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCustomerDetail, setSelectedCustomerDetail] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allCustomers");
    const data = await response.json();
    setCustomers(data.customers);
  };

  console.log(customers);

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleShow = () => {
    setShow(true);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const handleDeleteCustomer = useCallback(async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/deleteAccount",
        { id: id },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        await fetchInfo();
        toast.success(`Account ${id} đã được xóa!`);
      } else {
        toast.error(`Xóa account ${id} thất bại`);
      }
    } catch (error) {
      console.error("Xóa account thất bại:", error.message);
      toast.error(`Xóa account ${id} thất bại`);
    } finally {
      setCustomerToDelete(null);
    }
  }, []);

  useEffect(() => {
    if (customerToDelete !== null) {
      Modal.confirm({
        title: "Xác nhận xóa",
        content: "Bạn có chắc muốn xóa người dùng này không?",
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk() {
          handleDeleteCustomer(customerToDelete);
        },
      });
    }
  }, [customerToDelete, handleDeleteCustomer]);

  const confirmDelete = (accountId) => {
    setCustomerToDelete(accountId);
  };

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1 className="uppercase text-[28px] font-semibold m-5">TÀI KHOẢN</h1>
      <div className="grid grid-cols-[0.2fr_1fr_0.8fr_1.8fr_0.5fr_1.2fr_0.8fr_0.4fr] w-full gap-4">
        <p>Mã</p>
        <p>Tên khách hàng</p>
        <p>SĐT</p>
        <p>Địa chỉ</p>
        <p>Giới tính</p>
        <p>Email</p>
        <p></p>
        <p></p>
      </div>
      <div className="list_product-allProduct w-full">
        <hr />
        {customers.length > 0 &&
          customers
            .sort((a, b) => a.id - b.id)
            .slice((current - 1) * pageSize, current * pageSize)
            .map((customer, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[0.2fr_1fr_0.8fr_1.9fr_0.5fr_1.2fr_0.8fr_0.4fr] w-full gap-4 items-center py-3"
                >
                  <p>{customer.id}</p>
                  <p>{customer.namecus}</p>
                  <p>{customer.phone}</p>
                  <p>{customer.address}</p>
                  <p>{customer.gender}</p>
                  <p>{customer.email}</p>
                  <button
                    onClick={() => {
                      handleShow();
                      setSelectedCustomerDetail(customer);
                    }}
                    className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    className="hover:text-primaryColor"
                    onClick={() => confirmDelete(customer.id)}
                  >
                    <i className="fa-solid fa-trash cursor-pointer m-auto"></i>
                  </button>
                </div>
              );
            })}

        {
          <Pagination
            className="text-center"
            current={current}
            onChange={setCurrent}
            pageSize={pageSize}
            total={customers.length}
            responsive={true}
          />
        }

        {show &&
          createPortal(
            <CustomerDetail
              onClose={() => setShow(false)}
              selectedCustomerDetail={selectedCustomerDetail}
              formatDate={formatDate}
            />,
            document.body
          )}

        <Toast />
      </div>
    </div>
  );
};

export default ListCustomer;
