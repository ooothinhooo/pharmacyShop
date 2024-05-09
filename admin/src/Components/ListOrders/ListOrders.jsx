// eslint-disable-next-line no-unused-vars
import React from "react";
import { Pagination } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import UpdateStatus from "./UpdateStatus";
import OrderDetail from "./OrderDetail";
import Toast from "../util/Toast/Toast";

const ListOrders = () => {
  const [orders, setOrders] = useState([]);

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allOrdersAdmin");
    const data = await response.json();
    setOrders(data.orders);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleUpdateStatus = (orderId) => {
    setSelectedOrderId(orderId);
    setShow(true);
  };

  const handleShowDetails = (id) => {
    setShowDetails(true);
    setSelectedOrder(id);
  };

  // console.log(orders);
  console.log(selectedOrder);

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1 className="uppercase text-[28px] font-semibold m-5">ĐƠN HÀNG</h1>
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] w-full gap-4">
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
            .sort((a, b) => a.order_id - b.order_id)
            .slice((current - 1) * pageSize, current * pageSize)
            .map((order, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] w-full gap-4 items-center p-3"
                >
                  <p>{order.order_id}</p>
                  <p>{order.namecus}</p>
                  <p>{new Date(order.order_date).toLocaleDateString()}</p>
                  <div onClick={() => handleUpdateStatus(order.order_id)}>
                    {order.status === 0 ? (
                      <button className="bg-yellow-500 text-white p-2 rounded-lg">
                        Chờ xác nhận
                      </button>
                    ) : order.status === 1 ? (
                      <button className="bg-green-500 text-white p-2 rounded-lg">
                        chuẩn bị đơn hàng
                      </button>
                    ) : order.status === 2 ? (
                      <button className="bg-blue-700 text-white p-2 rounded-lg">
                        Đang giao
                      </button>
                    ) : order.status === 3 ? (
                      <button className="bg-green-700 text-white p-2 rounded-lg">
                        Đã giao
                      </button>
                    ) : order.status === 4 ? (
                      <button className="bg-red-500 text-white p-2 rounded-lg">
                        Từ chối
                      </button>
                    ) : (
                      <button className="bg-red-500 text-white p-2 rounded-lg">
                        Đã hủy
                      </button>
                    )}
                  </div>
                  <button
                    onClick={() => handleShowDetails(order.order_id)}
                    className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white"
                  >
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

      {show &&
        createPortal(
          <UpdateStatus
            onClose={() => setShow(false)}
            orderId={selectedOrderId}
            fetchInfo={fetchInfo}
          />,
          document.body
        )}

      {showDetails &&
        createPortal(
          <OrderDetail
            onClose={() => setShowDetails(false)}
            selectedOrder={selectedOrder}
          />,
          document.body
        )}

      <Toast />
    </div>
  );
};

export default ListOrders;
