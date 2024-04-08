import React, { useContext, useEffect, useState } from "react";
import { Select } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";

export const Orders = () => {
  const [activeTab, setActiveTab] = useState("Đang xử lý");
  const [orderList, setOrderList] = useState([]);
  const { userData } = useContext(ShopContext);
  console.log(userData);
  const navigate = useNavigate();
  const handleNavigateToOrderDetail = (idOrder) => {
    navigate("/account/order_detail", { state: { userData, idOrder } });
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allOrders", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });

        const allOrders = response.data.orders;
        setOrderList(allOrders);
      } catch (err) {
        console.log(err);
      }
    };

    getOrder();
  }, []);

  console.log(orderList);

  return (
    <div className="desktop_big flex-1 box-border rounded-xl min-h-[300px] h-fit px-6 sticky top-[110px]">
      <div className="desktop_head text-[24px] font-bold leading-8">
        <h1>Lịch sử đơn hàng</h1>
      </div>
      <div className="list_order">
        <div className="mt-6">
          <div className="list_order-content">
            <div className="list_order-tab flex overflow-x-auto py-[10px] bg-white">
              <div className="list_order-tab--item">
                <button
                  className={`list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap ${
                    activeTab === "Đang xử lý"
                      ? "list_order-tab-name-active"
                      : "text-[#b2bac6]"
                  }`}
                  onClick={() => setActiveTab("Đang xử lý")}
                >
                  Đang xử lý
                </button>
              </div>

              <div className="list_order-tab--item">
                <button
                  className={`list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap ${
                    activeTab === "Đã đóng gói"
                      ? "list_order-tab-name-active"
                      : "text-[#b2bac6]"
                  }`}
                  onClick={() => setActiveTab("Đã đóng gói")}
                >
                  Đã đóng gói
                </button>
              </div>

              <div className="list_order-tab--item">
                <button
                  className={`list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap ${
                    activeTab === "Đang giao"
                      ? "list_order-tab-name-active"
                      : "text-[#b2bac6]"
                  }`}
                  onClick={() => setActiveTab("Đang giao")}
                >
                  Đang giao
                </button>
              </div>

              <div className="list_order-tab--item">
                <button
                  className={`list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap ${
                    activeTab === "Đã giao"
                      ? "list_order-tab-name-active"
                      : "text-[#b2bac6]"
                  }`}
                  onClick={() => setActiveTab("Đã giao")}
                >
                  Đã giao
                </button>
              </div>

              <div className="list_order-tab--item">
                <button
                  className={`list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap ${
                    activeTab === "Đã hủy"
                      ? "list_order-tab-name-active"
                      : "text-[#b2bac6]"
                  }`}
                  onClick={() => setActiveTab("Đã hủy")}
                >
                  Đã hủy
                </button>
              </div>
            </div>

            <div className="bg-white px-3 pb-3 pt-5 list_order-filter flex justify-between">
              <div className="flex items-center gap-x-[10px] gap-y-[20px] flex-wrap mb-[10px]"></div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <i className="fa-solid fa-sort w-[24px] h-[24px] !leading-6"></i>
                  <Select
                    defaultValue="Đơn hàng mới nhất"
                    style={{
                      width: 165,
                      border: "none",
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "Đơn hàng mới nhất",
                        label: "Đơn hàng mới nhất",
                      },
                      {
                        value: "Đơn hàng cũ nhất",
                        label: "Đơn hàng cũ nhất",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>

            <div className="list_order-info mt-4">
              {orderList &&
                orderList.map((order) => {
                  const orderDate = new Date(order.order_date); // Create a Date object
                  const formattedDate = `${orderDate
                    .getHours()
                    .toString()
                    .padStart(2, "0")}:${orderDate
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")} ${orderDate.getDate()}-${
                    orderDate.getMonth() + 1
                  }-${orderDate.getFullYear()}`;
                  return (
                    <div
                      key={order.id}
                      className="mb-2 px-4 py-3 border-b border-neutral-300 last:border-0 bg-white"
                    >
                      <div className="flex items-center border-b border-dashed pb-2">
                        <div className="flex-1"></div>
                        <div className="text-sm text-neutral-700">
                          {formattedDate}
                        </div>
                      </div>
                      <div className="mt-1 flex items-center space-y-1">
                        <div className="flex-1 pt-2">
                          <h4 className="text-[16px] font-semibold leading-[24px]">
                            <span className="mr-2 font-normal text-inherit">
                              Mã đơn:
                            </span>
                            {order.order_id}
                          </h4>
                          <h4 className="text-[16px] font-semibold leading-[24px] mt-1">
                            <span className="mr-2 font-normal text-inherit">
                              Giá trị đơn:
                            </span>
                            {Number(order.total_order).toLocaleString("vi-VN")} đ
                          </h4>
                        </div>
                        <div className="border-0 text-sm text-green-700 md:text-base font-medium md:hover:text-green-800">
                          <span
                            onClick={() => handleNavigateToOrderDetail(order.order_id)}
                            className="mr-1"
                          >
                            Xem chi tiết
                          </span>
                          <i className="fa-solid fa-chevron-right"></i>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
