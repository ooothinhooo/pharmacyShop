import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Order_detail = (props) => {
  const [orderDetails, setOrderDetails] = useState([]);
  const { idOrder } = props;

  console.log(idOrder);

  const navigate = useNavigate();

  const backNavigate = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.post(
          "http://localhost:4000/allOrderDetails",
          { idOrder }
        );

        const allOrders = response.data.orderDetails;
        setOrderDetails(allOrders);
      } catch (err) {
        console.log(err);
      }
    };

    getOrder();
  }, [idOrder]);

  console.log(orderDetails);

  const filterNameCus = orderDetails.map((order) => order.namecus);
  const filterPhone = orderDetails.map((order) => order.phone);
  const filterAddress = orderDetails.map((order) => order.address);
  const filterIdOrder = orderDetails.map((order) => order.order_id);
  const filterOrderDate = orderDetails.map((order) => order.order_date);
  const filterPaymentMethod = orderDetails.map((order) =>
    order.payment_method === "cash" ? "COD" : order.payment_method
  );

  const filterStatus = orderDetails.map((order) =>
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

  const totalPrice = orderDetails.reduce(
    (total, order) => total + Number(order.total),
    0
  );
  const shippingFee = totalPrice > 150000 ? 0 : 16500;
  const finalTotal = totalPrice + shippingFee;
  const totalItems = orderDetails.reduce(
    (total, order) => total + order.quantity_order,
    0
  );

  const nameCustomer = new Set(filterNameCus);
  const phone = new Set(filterPhone);
  const address = new Set(filterAddress);
  const id = new Set(filterIdOrder);
  const formattedOrderDates = filterOrderDate.map((date) => {
    return format(new Date(date), "HH:mm dd-MM-yyyy");
  });

  const orderDate = new Set(formattedOrderDates);
  const paymentMethod = new Set(filterPaymentMethod);
  const status = new Set(filterStatus);

  const cancelOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/cancelOrder",
        { idOrder }
      );

      if (response.data.success) {
        alert("Hủy đơn hàng thành công");
        navigate(-1);
      } else {
        alert("Hủy đơn hàng thất bại");
      }

      console.log(response);
    } catch (err) {
      console.log(err);
    }

    // console.log(idOrder);
  }

  const confirmOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/confirmOrder",
        { idOrder }
      );

      if (response.data.success) {
        alert("xác nhận đơn hàng thành công");
        navigate(-1)
      } else {
        alert("xác nhận đơn hàng thất bại")
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <div className="flex-1">
      <div className="items-center space-x-4 mb-4 flex">
        <button>
          <i onClick={backNavigate} className="fa-solid fa-chevron-left"></i>
        </button>
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-neutral-900">
            Chi tiết đơn hàng
          </h1>
        </div>
        <div></div>
      </div>

      <div className="mt-0 space-y-4">
        <div className="space-y-4">
          <div className="w-full flex flex-col-reverse">
            <div className="grid grid-cols-2 space-x-4">
              <div className="rounded-md bg-white p-4">
                <div>
                  <div className="font-semibold">Thông tin người nhận</div>
                  <div className="mb-1 flex items-center space-x-2">
                    <span className="line-clamp-1 font-semibold">
                      {nameCustomer}
                    </span>
                    <div className="h-[20px] w-[1px] bg-neutral-300 inline-flex"></div>
                    <span className="block">{phone}</span>
                  </div>
                  <div className="bg-divider my-2 h-[1px]"></div>
                  <div className="font-semibold">Địa chỉ nhận</div>
                  <div className="mb-1 flex items-center space-x-2">
                    <span className="font-semibold text-sm">{address}</span>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-white block">
                <div className="grid content-start gap-1 rounded-sm bg-white p-4">
                  <div className="font-semibold grid grid-flow-col justify-between gap-4">
                    <span>Mã đơn hàng</span>
                    <p>{id}</p>
                  </div>

                  <div className="grid grid-flow-col items-start justify-between gap-4">
                    <p className="whitespace-nowrap text-sm text-neutral-900">
                      Thời gian đặt hàng
                    </p>
                    <p className="text-sm text-neutral-900">{orderDate}</p>
                  </div>

                  <div className="grid grid-flow-col items-start justify-between gap-4 mt-3">
                    <p className="whitespace-nowrap text-sm text-neutral-900">
                      Trạng thái đơn hàng
                    </p>
                    <p className="text-sm text-neutral-900">{status}</p>
                  </div>

                  {status.has("Đang duyệt đơn hàng") && (
                    <div className="flex justify-end mt-4">
                      <button onClick={cancelOrder} className="bg-green-500 text-white p-2 rounded-md text-sm transition-all duration-200 hover:bg-green-600">
                        Hủy đặt hàng
                      </button>
                    </div>
                  )}

                  {status.has("đang trên đường giao đến bạn") && (
                    <div className="flex justify-end mt-4">
                      <button onClick={confirmOrder} className="bg-green-500 text-white p-2 rounded-md text-sm transition-all duration-200 hover:bg-green-600">
                        Xác nhận đơn hàng
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="leading-5 mb-0 space-y-0 rounded-md bg-white">
          <div className="bg-white p-4 rounded-md">
            <h4 className="font-semibold mb-4 text-base text-[20px]">
              Sản phẩm đã mua
            </h4>
            {orderDetails.map((order) => {
              return (
                <div className="grid gap-4">
                  <div className="group">
                    <div className="grid grid-flow-col">
                      <div className="grid grid-cols-[calc(68rem/16)_1fr] items-start gap-2">
                        <div className="relative h-[calc(68rem/16)] w-[calc(68rem/16)] rounded-sm border border-neutral-100">
                          <img src={order.image} alt="img" />
                        </div>
                        <div className="flex justify-between flex-row space-x-4">
                          <div className="grid flex-1 gap-1 w-[485px]">
                            <p className="text-sm font-semibold text-neutral-900 line-clamp-2">
                              {order.name}
                            </p>
                            <p className="text-sm text-neutral-700">Viên</p>
                          </div>
                          <div className="flex items-center flex-row justify-center space-x-4">
                            <div className="flex w-[calc(117rem/16)] items-center justify-center">
                              <p className="leading-4 text-neutral-900 text-sm">
                                x{order.quantity_order}
                              </p>
                            </div>
                            <div className="flex w-[calc(160rem/16)] flex-row items-center justify-end space-x-1">
                              <p className="font-semibold text-neutral-900 text-sm">
                                {
                                  /* {(order.price * (1 - order.sale / 100) * order.quantity_order).toLocaleString("vi-VN") + " đ"} */
                                  Number(order.total).toLocaleString("vi-VN") +
                                    " đ"
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-divider mt-4 h-[1px] w-full group-last:block"></div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className="grid gap-4">
              <div className="group">
                <div className="grid grid-flow-col">
                  <div className="grid grid-cols-[calc(68rem/16)_1fr] items-start gap-2">
                    <div className="relative h-[calc(68rem/16)] w-[calc(68rem/16)] rounded-sm border border-neutral-100">
                      <img src="ád" alt="img" />
                    </div>
                    <div className="flex justify-between flex-row space-x-4">
                      <div className="grid flex-1 gap-1">
                        <p className="text-sm font-semibold text-neutral-900 line-clamp-2">
                          Viên ngậm thảo dược Pharmacity Herbal Lozenges hỗ trợ
                          giảm ho, giảm đờm, giảm đau rát họng (Hộp 50 viên)
                        </p>
                        <p className="text-sm text-neutral-700">Viên</p>
                      </div>
                      <div className="flex items-center flex-row justify-center space-x-4">
                        <div className="flex w-[calc(117rem/16)] items-center justify-center">
                          <p className="leading-4 text-neutral-900 text-sm">
                            x10
                          </p>
                        </div>
                        <div className="flex w-[calc(160rem/16)] flex-row items-center justify-end space-x-1">
                          <p className="font-semibold text-neutral-900 text-sm">
                            3000đ
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-divider mt-4 h-[1px] w-full group-last:block"></div>
                </div>
              </div>
            </div> */}
          </div>
          <div className="flex justify-end">
            <div className="w-1/2">
              <div className="bg-white p-4 rounded-md py-0">
                <div className="font-semibold mb-3 text-base text-[20px]">
                  Chi tiết thanh toán
                </div>
                <div className="space-y-3">
                  <div className="flex space-x-4">
                    <div className="flex-1">Tiền hàng</div>
                    <div className="font-semibold">
                      {totalPrice.toLocaleString("vi-VN")} đ
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">Phí vận chuyển</div>
                    <div className="font-semibold">{shippingFee} đ</div>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">Mã giảm giá</div>
                    <div className="font-semibold">{shippingFee} đ</div>
                  </div>
                </div>
                <div className="bg-divider my-3 h-[1px]"></div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <span className="mr-2 font-semibold">Tổng tiền</span>
                      <span className="text-sm">({totalItems} sản phẩm)</span>
                    </div>
                    <div className="text-red-500 no-underline text-2xl font-bold leading-8">
                      {finalTotal.toLocaleString("vi-VN")} đ
                    </div>
                  </div>
                </div>
                <div className="bg-divider my-3 h-[1px]"></div>
              </div>

              <div className="my-2 flex items-center space-x-4 bg-white px-4 py-4 pt-0">
                <div className="flex-1">
                  <span className="font-semibold">Phương thức thanh toán</span>
                </div>
                <div className="font-semibold">{paymentMethod}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order_detail;
