/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import Item from "antd/es/list/Item";

// eslint-disable-next-line react/prop-types
const OrderDetail = ({ onClose, selectedOrder }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  const handleShowDetails = async (id) => {
    try {
      const response = await axios.get(
        "http://localhost:4000/allOrderDetailsAdmin",
        {
          params: { id: id },
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setOrderDetails(response.data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleShowDetails(selectedOrder);
  }, [selectedOrder]);

  const filterNameCus =
    orderDetails && orderDetails.map((order) => order.namecus);
  const filterPhone = orderDetails && orderDetails.map((order) => order.phone);
  const filterAddress =
    orderDetails && orderDetails.map((order) => order.address);
  const filterOrderDate =
    orderDetails && orderDetails.map((order) => order.order_date);
  const filterStatus =
    orderDetails &&
    orderDetails.map((order) =>
      order.status === 0
        ? "Đang duyệt đơn hàng"
        : order.status === 1
        ? "đã được duyệt"
        : order.status === 2
        ? "đang trên đường giao đến bạn"
        : order.status === 3
        ? "đã giao thành công"
        : "đã hủy"
    );

  const filterTotal =
    orderDetails && orderDetails.map((order) => Number(order.total_order));

  const nameCustomer = new Set(filterNameCus);
  const phone = new Set(filterPhone);
  const address = new Set(filterAddress);
  const formattedOrderDates =
    filterOrderDate &&
    filterOrderDate.map((date) => {
      return format(new Date(date), "dd-MM-yyyy");
    });

  const orderDate = new Set(formattedOrderDates);
  const status = new Set(filterStatus);
  const uniqueTotal = [...new Set(filterTotal)];
  const totalAmount = uniqueTotal.length > 0 ? uniqueTotal[0] : 0;

  return (
    <div className=" fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="max-w-[650px] w-[650px] relative">
        <div className="bg-white rounded grid gap-2">
          {/* <div className="absolute w-full flex-col space-y-1.5 flex mt-2 md:mt-0 justify-center px-4 py-2.5 md:px-6 md:pt-6 md:pb-4"></div> */}
          <div className="flex justify-start items-center p-[10px] relative">
            <h1 className="text-[24px] font-medium">Chi tiết đơn hàng</h1>
          </div>
          <div className="border-b"></div>
          <div className="grid">
            <div
              className="overflow-hidden h-full max-h-[calc(100dvh-138px)] px-4 [&>div]:relative md:max-h-[calc(100vh-100px)] md:px-4"
              style={{
                position: "relative",
                "--radix-scroll-area-corner-width": "0px",
                "--radix-scroll-area-corner-height": "0px",
              }}
            >
              <style>{`
            [data-radix-scroll-area-viewport] {
              scrollbar-width: none;
              -ms-overflow-style: none;
              -webkit-overflow-scrolling: touch;
            }
            [data-radix-scroll-area-viewport]::-webkit-scrollbar {
              display: none;
            }
          `}</style>
              <div
                data-radix-scroll-area-viewport
                className="h-full w-full rounded-[inherit]"
                style={{ overflow: "hidden scroll" }}
              >
                <div>
                  <p className="my-1 italic text-neutral-500">
                    Thông tin khách hàng
                  </p>
                  <div className="border">
                    <table className="w-full shadow-lg border-separate [border-spacing:0_10px] p-2">
                      <tbody>
                        <tr className="text-left">
                          <td className="w-[30%] align-top font-semibold">
                            Tên khách hàng:
                          </td>

                          <td>{nameCustomer}</td>
                        </tr>

                        <tr className="text-left">
                          <td className="w-[30%] align-top font-semibold">
                            Số điện thoại:
                          </td>

                          <td>{phone}</td>
                        </tr>
                        <tr className="text-left">
                          <td className="w-[30%] align-top font-semibold">
                            Địa chỉ giao hàng:
                          </td>

                          <td>{address}</td>
                        </tr>

                        <tr className="text-left">
                          <td className="w-[30%] align-top font-semibold">
                            Trạng thái đơn hàng:
                          </td>

                          <td>{status}</td>
                        </tr>

                        <tr className="text-left">
                          <td className="w-[30%] align-top font-semibold">
                            ngày đặt hàng:
                          </td>

                          <td>{orderDate}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <p className="italic text-neutral-500 mt-4 my-1">
                    Thông tin đơn hàng
                  </p>
                  {/* <div className="p-6">
                    <div className="grid grid-cols-[1fr_4fr_1fr_2fr_1fr_0.5fr] mb-5 gap-[10px] w-[100%] text-center">
                      <p className="text-left">Sản Phẩm</p>
                      <p>Tên sản phẩm</p>
                      <p>Đơn giá</p>
                      <p>Số lượng</p>
                      <p>Thành tiền</p>
                      <p></p>
                    </div>
                    <div>
                      <hr />
                      <div className="w-full py-5 grid grid-cols-[1fr_4fr_1fr_2fr_1fr_0.5fr] gap-[10px] items-center">
                        <p>
                          <img
                            src="http://localhost:4000/images/product_1709873587724.jpg"
                            alt=""
                            className="w-[72px]"
                          />
                        </p>
                        <p>
                          <p className="text-left product_name">
                            Dầu dưỡng giúp mờ sẹo &amp; giảm rạn da Bio-Oil
                            (125ml)
                          </p>
                        </p>
                        <p>299.000đ</p>
                        <p className="flex justify-center items-center">
                          <button className="cartItem_quantity w-[50px] h-[50px] bg-white">
                            2
                          </button>
                        </p>
                        <p>598.000đ</p>
                        <p className="text-center">
                          <i
                            className="fa-solid fa-trash"
                            aria-hidden="true"
                          ></i>
                        </p>
                      </div>
                    </div>
                  </div> */}
                  <table className="w-full shadow-lg border  border-separate [border-spacing:10px_10px] p-2">
                    <tbody>
                      <tr className="text-left">
                        <th>Mã Thuốc</th>
                        <th>Tên Thuốc</th>
                        <th>Đơn vị tính</th>
                        <th>Số lượng</th>
                        <th>Đơn giá</th>
                        <th>Thành tiền</th>
                      </tr>

                      {orderDetails &&
                        orderDetails.map((order) => {
                          return (
                            <tr className="text-left" key={order.id}>
                              <td>{order.idm}</td>
                              <td>{order.name}</td>
                              <td>{order.unit}</td>
                              <td>{order.quantity_order}</td>
                              <td>
                                {Number(order.price).toLocaleString("vi-VN") +
                                  "đ"}
                              </td>
                              <td>
                                {Number(
                                  order.quantity_order * order.price
                                ).toLocaleString("vi-VN") + "đ"}
                              </td>
                            </tr>
                          );
                        })}

                      <tr className="text-left">
                        <th colSpan={6} className="text-[18px]">
                          Tổng tiền đơn hàng sau khi giảm trừ các chi phí:
                          <span className="text-[24px] text-red-600">{totalAmount.toLocaleString('vi-VN') + "đ"}</span>
                        </th>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute rounded-sm opacity-100 outline-0 hover:opacity-80 [&>svg]:w-6 [&>svg]:h-6 right-3 top-2"
          >
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.293 5.293a1 1 0 0 1 1.414 0L12 10.586l5.293-5.293a1 1 0 1 1 1.414 1.414L13.414 12l5.293 5.293a1 1 0 0 1-1.414 1.414L12 13.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L10.586 12 5.293 6.707a1 1 0 0 1 0-1.414z"
                fill="#0D0D0D"
              />
            </svg>
          </button>

          <div className="flex justify-end m-4">
            <button
              onClick={onClose}
              className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
