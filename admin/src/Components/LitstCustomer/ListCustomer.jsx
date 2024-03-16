// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";
import { Pagination } from "antd";
import { useState } from "react";

const ListCustomer = () => {
  const [customers, setCustomers] = useState([]);

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allCustomers");
    const data = await response.json();
    setCustomers(data.customers);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1 className="my-5">TÀI KHOẢN</h1>
      <div className="grid grid-cols-[0.2fr_1.5fr_1fr_1fr_0.5fr_1fr_0.8fr_0.8fr_0.4fr] w-full gap-4">
        <p>Mã</p>
        <p>Tên khách hàng</p>
        <p>SĐT</p>
        <p>Địa chỉ</p>
        <p>Giới tính</p>
        <p>Email</p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div className="list_product-allProduct w-full">
        <hr />
        {customers.length > 0 &&
          customers
            .slice((current - 1) * pageSize, current * pageSize)
            .map((customer, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[0.2fr_1.5fr_1fr_1fr_0.5fr_1fr_0.8fr_0.8fr_0.4fr] w-full gap-4 items-center p-3"
                >
                  <p>{customer.id}</p>
                  <p>{customer.namecus}</p>
                  <p>{customer.phone}</p>
                  <p>{customer.address}</p>
                  <p>{customer.gender}</p>
                  <p>{customer.email}</p>
                  <button className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white">
                    Chỉnh sửa
                  </button>
                  <button className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white">
                    Xem chi tiết
                  </button>
                  <button className="hover:text-primaryColor">
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
      </div>
    </div>
  );
};

export default ListCustomer;
