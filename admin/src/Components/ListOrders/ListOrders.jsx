// eslint-disable-next-line no-unused-vars
import React from "react";
import { Pagination } from "antd";
import { useEffect } from "react";
import { useState } from "react";

const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allOrders");
    const data = await response.json();
    setOrders(data.orders);
  };  

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1 className="my-5">ĐƠN HÀNG</h1>
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_3fr] w-full gap-4">
        <p>Mã</p>
        <p>Tên Khách hàng</p>
        <p>Ngày đặt</p>
        <p>Trang thái</p>
        <p></p>
      </div>
      <div className="list_product-allProduct w-full">
        <hr />
        {orders.length > 0 &&
          orders
            .slice((current - 1) * pageSize, current * pageSize)
            .map((order, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[0.5fr_1fr_1fr_1fr_3fr] w-full gap-4 items-center p-3"
                >
                  <p>{order.id}</p>
                  <p>{order.id}</p>
                  <p>{new Date(order.order_date).toLocaleDateString()}</p>
                  <p>{order.status}</p>
                  <button className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white">
                    Xem chi tiết
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
            total={orders.length}
            responsive={true}
          />
        }
      </div>
    </div>
  );
};

export default ListOrders;
