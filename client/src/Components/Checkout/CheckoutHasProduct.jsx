import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import cash from "../Assets/cash.png";
import momo from "../Assets/momo.png";
import credit from "../Assets/credit.png";
import ATM from "../Assets/atm.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddressDetail from "../Account/AddressDetail";
import { createPortal } from "react-dom";
import AddressModal from "./AddressModal";
import CartChooseCoupon from "../CartItem/CartChooseCoupon";
import { ReactDimmer } from "react-dimmer";

export const CheckoutHasProduct = (props) => {
  const { applyCoupon } = props;
  // console.log(applyCoupon);
  const {
    getTotalCartItems,
    getTotalCartAmountWithsale,
    all_products,
    cartItems,
  } = useContext(ShopContext);

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [applyCouponCheckout, setApplyCouponCheckout] = useState(applyCoupon);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculatedTotal = getTotalCartAmountWithsale();
    setTotalAmount(calculatedTotal);
  }, [getTotalCartAmountWithsale]);

  const handleApply = (coupon) => {
    setApplyCouponCheckout(coupon);
  };

  console.log(applyCouponCheckout);

  const calculateDiscount = () => {
    if (!applyCouponCheckout) return "-";

    if (applyCouponCheckout.voucher_type === "fixed_amount") {
      return `-${Number(applyCouponCheckout.value).toLocaleString("vi-VN")} đ`;
    } else {
      const discountAmount =
        getTotalCartAmountWithsale() * (applyCouponCheckout.value / 100);
      return `-${Number(discountAmount.toFixed(0)).toLocaleString("vi-VN")} đ`;
    }
  };

  const calculateTotalAmount = () => {
    const totalAmount = getTotalCartAmountWithsale();
    let discountAmount = 0;
    if (applyCouponCheckout) {
      if (applyCouponCheckout.voucher_type === "fixed_amount") {
        discountAmount = applyCouponCheckout.value;
      } else {
        discountAmount = totalAmount * (applyCouponCheckout.value / 100);
      }
    }

    const shippingDiscountAmount = totalAmount > 150000 ? 0 : 16500;

    const total = totalAmount - discountAmount + shippingDiscountAmount;

    return `${Number(total.toFixed(0))}`;
  };

  const [order, setOrder] = useState({
    order_date: new Date(Date.now()),
    total: calculateTotalAmount(),
    order_note: "",
    cartItems: cartItems,
    address: "",
  });

  const changeHandle = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleNavigateToProduct = (idProduct) => {
    const product = all_products.find((product) => product.idm === idProduct);
    navigate(`/products/${idProduct}`, { state: product });
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleHidden = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allAddresses", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        setAllAddresses(response.data.addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddress();
  }, []);

  useEffect(() => {
    const defaultAddress = allAddresses.find(
      (address) => address.default_address === 1
    );
    setSelectedAddress(defaultAddress);
  }, [allAddresses]);

  // console.log(allAddresses);

  const handleApplyAddress = (address) => {
    // Xử lý logic khi áp dụng địa chỉ đã chọn từ modal
    setSelectedAddress(address);
    console.log("Địa chỉ đã chọn:", address);
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      address: selectedAddress ? selectedAddress.address : "",
    }));
  }, [selectedAddress]);

  const calculateTotalAmountRef = useRef(() => {});

  useEffect(() => {
    // Gọi hàm ref để tính toán tổng số tiền
    setOrder((prevOrder) => ({
      ...prevOrder,
      total: calculateTotalAmountRef.current(),
    }));
  }, [applyCouponCheckout]);

  useEffect(() => {
    calculateTotalAmountRef.current = calculateTotalAmount;
  }, [calculateTotalAmount]);

  const addOrder = async () => {
    console.log(order);

    await fetch("http://localhost:4000/addOrder", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(order),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          alert("Đặt hàng thành công");
          navigate("/");
        } else {
          alert("Đặt hàng thất bại");
        }
      });
  };
  return (
    <div className="bg-[#f0f2f5]">
      <div className="container pb-6">
        <div className="pt-6"></div>
        <div className="checkout_content flex flex-row items-start">
          <div className="checkout_info flex-[1_0]">
            {/* check info product cart */}
            <div className="product_box">
              <div className="infoProduct bg-white pt-6 px-6 pb-4 rounded-xl box-border">
                <div className="checkout_title">Thanh toán</div>
                <div className="checkout_subTitle flex mt-3 flex-row items-center">
                  <div className="checkout_subTitle-title font-bold text-[18px]">
                    Giỏ hàng
                    <span className="infoLineCount ml-1 mr-2">
                      ({getTotalCartItems()} sản phẩm -{" "}
                      {getTotalCartAmountWithsale().toLocaleString("vi-VN")} đ)
                    </span>
                  </div>
                  <Link to="/cart" className="ml-2 text-[13px] text-green-500">
                    Nhấn để thay đổi
                  </Link>
                </div>
                <div className="mt-3">
                  <div className="grid grid-cols-[1fr_3.8fr_1fr_1fr_1fr] mb-5 gap-[10px] w-[100%] text-left">
                    <p className="text-left">Sản Phẩm</p>
                    <p>Tên sản phẩm</p>
                    <p>Đơn giá</p>
                    <p>Số lượng</p>
                    <p>Thành tiền</p>
                  </div>
                  <div>
                    <hr />
                    {all_products.map((e, i) => {
                      if (cartItems[e.idm] > 0) {
                        return (
                          <div
                            className="w-full py-5 grid grid-cols-[1fr_3.8fr_1fr_1fr_1fr] gap-[10px] items-center"
                            key={i}
                          >
                            <div onClick={() => handleNavigateToProduct(e.idm)}>
                              <img src={e.image} alt="" className="w-[72px]" />
                            </div>
                            <div onClick={() => handleNavigateToProduct(e.idm)}>
                              <p className="product_name text-left">{e.name}</p>
                            </div>

                            <p>
                              {(e.price * (1 - e.sale / 100)).toLocaleString(
                                "vi-VN"
                              )}
                              đ
                            </p>

                            <p>
                              <button className="cartItem_quantity w-[64px] h-[50px] border border-[#ebebeb] bg-white">
                                {cartItems[e.idm]}
                              </button>
                            </p>

                            <p>
                              {(
                                e.price *
                                (1 - e.sale / 100) *
                                cartItems[e.idm]
                              ).toLocaleString("vi-VN")}
                              đ
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </div>
            {/* choose receive  product*/}
            <div className="box-border">
              <div className="py-4 bg-transparent">
                <div className="bg-white rounded-lg mt-[10px] cursor-pointer">
                  <div className="container p-6 max-md:p-4">
                    <div className="text-[16px] flex-1 font-medium mb-6">
                      Giao hàng tận nơi
                    </div>
                    <div>
                      <div className="text-sm">
                        <div className="flex">
                          <div className="flex-1 space-y-2">
                            <span className="text-base font-semibold">
                              Thông tin người nhận
                            </span>
                            {selectedAddress && (
                              <AddressDetail address={selectedAddress} />
                            )}
                          </div>
                          <div
                            onClick={handleShow}
                            className="text-primaryColor font-semibold"
                            type="button"
                          >
                            Thay đổi
                          </div>
                        </div>
                        <div className="bg-[#f7f7f7] h-[2px] my-4"></div>
                        <div className="flex">
                          <div className="flex-1 space-y-2">
                            <span className="text-sm font-semibold">
                              Hình thức vận chuyển
                            </span>
                            <div className="flex items-center font-semibold">
                              Viettel Post
                            </div>
                          </div>
                          <div className="ml-2 items-center">16.500đ</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* choose type pay */}
            <div className="bg-white mt-3 p-6 rounded-xl">
              <div className="flex flex-row items-center font-bold text-[18px] leading-[22px] mr-2">
                Chọn hình thức thanh toán
              </div>
              <div className="pt-3">
                <div className="max-w-[450px]">
                  <div className="paymentMethod">
                    <div className="paymentMethod_icon">
                      <img src={cash} alt="Cash" />
                    </div>
                    <div className="paymentMethod_info ">
                      <div className="paymentMethod_info-name">Tiền mặt</div>
                      <div className="mt-[6px] text-[#8e9aab]">
                        Thanh toán bằng tiền mặt khi nhậnh hàng
                      </div>
                    </div>
                    <div className="paymentMethod_select-icon">
                      <input
                        type="radio"
                        name="paymentMethodType"
                        id="cash"
                        value="cash"
                        checked={selectedPaymentMethod === "cash"}
                        onChange={handlePaymentMethodChange}
                      />
                    </div>
                  </div>

                  <div className="paymentMethod">
                    <div className="paymentMethod_icon">
                      <img src={momo} alt="MoMo" />
                    </div>
                    <div className="paymentMethod_info ">
                      <div className="paymentMethod_info-name">MoMo</div>
                      <div className="mt-[6px] text-[#8e9aab]">
                        Thanh toán bằng MoMo
                      </div>
                    </div>
                    <div className="paymentMethod_select-icon">
                      <input
                        type="radio"
                        name="paymentMethodType"
                        id="momo"
                        value="momo"
                        checked={selectedPaymentMethod === "momo"}
                        onChange={handlePaymentMethodChange}
                      />
                    </div>
                  </div>

                  <div className="paymentMethod">
                    <div className="paymentMethod_icon">
                      <img src={credit} alt="credit" />
                    </div>
                    <div className="paymentMethod_info ">
                      <div className="paymentMethod_info-name">
                        Thẻ tín dụng
                      </div>
                      <div className="mt-[6px] text-[#8e9aab]">
                        Bạn sẽ thanh toán trước số tiền của đơn hàng qua thẻ tín
                        dụng
                      </div>
                    </div>
                    <div className="paymentMethod_select-icon">
                      <input
                        type="radio"
                        name="paymentMethodType"
                        id="credit"
                        value="credit"
                        checked={selectedPaymentMethod === "credit"}
                        onChange={handlePaymentMethodChange}
                      />
                    </div>
                  </div>

                  <div className="paymentMethod">
                    <div className="paymentMethod_icon">
                      <img src={ATM} alt="ATM" />
                    </div>
                    <div className="paymentMethod_info ">
                      <div className="paymentMethod_info-name">Thẻ ATM</div>
                      <div className="mt-[6px] text-[#8e9aab]">
                        Bạn sẽ thanh toán trước số tiền của đơn hàng qua thẻ ATM
                        nội địa
                      </div>
                    </div>
                    <div className="paymentMethod_select-icon">
                      <input
                        type="radio"
                        name="paymentMethodType"
                        id="ATM"
                        value="ATM"
                        checked={selectedPaymentMethod === "ATM"}
                        onChange={handlePaymentMethodChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid ml-6 gap-4">
            <div className="flex flex-col space-y-3 rounded-sm bg-white px-4 md:p-3">
              <div className="grid w-full grid-flow-col items-center justify-between">
                <div className="grid grid-cols-[24px_1fr] items-center justify-start gap-1">
                  <div className="p-icon inline-flex align-[-0.125em] justify-center max-h-full max-w-full w-6 h-6 text-primary-500">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      color="#43bd2f"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2 5.54541C2 5.1312 2.33579 4.79541 2.75 4.79541H21.25C21.6642 4.79541 22 5.1312 22 5.54541V9.74996C22 10.1642 21.6642 10.5 21.25 10.5C20.2347 10.5 19.4773 11.2574 19.4773 12.2727C19.4773 13.288 20.2347 14.0454 21.25 14.0454C21.6642 14.0454 22 14.3812 22 14.7954V19C22 19.4142 21.6642 19.75 21.25 19.75H2.75C2.33579 19.75 2 19.4142 2 19V14.7954C2 14.3812 2.33579 14.0454 2.75 14.0454C3.76533 14.0454 4.52273 13.288 4.52273 12.2727C4.52273 11.2574 3.76533 10.5 2.75 10.5C2.33579 10.5 2 10.1642 2 9.74996V5.54541ZM3.5 6.29541V9.08182C4.9672 9.40982 6.02273 10.6881 6.02273 12.2727C6.02273 13.8573 4.9672 15.1355 3.5 15.4635V18.25H20.5V15.4635C19.0328 15.1355 17.9773 13.8573 17.9773 12.2727C17.9773 10.6881 19.0328 9.40982 20.5 9.08182V6.29541H3.5Z"
                        fill="currentColor"
                      ></path>
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M15.053 9.21967C15.3459 9.51256 15.3459 9.98744 15.053 10.2803L10.0076 15.3258C9.71467 15.6187 9.2398 15.6187 8.9469 15.3258C8.65401 15.0329 8.65401 14.558 8.9469 14.2651L13.9924 9.21967C14.2853 8.92678 14.7601 8.92678 15.053 9.21967Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M9.89772 10.5908C10.5943 10.5908 11.1591 10.0261 11.1591 9.32948C11.1591 8.63285 10.5943 8.06812 9.89772 8.06812C9.20108 8.06812 8.63635 8.63285 8.63635 9.32948C8.63635 10.0261 9.20108 10.5908 9.89772 10.5908Z"
                        fill="currentColor"
                      ></path>
                      <path
                        d="M14.1023 16.4771C14.7989 16.4771 15.3637 15.9123 15.3637 15.2157C15.3637 14.5191 14.7989 13.9543 14.1023 13.9543C13.4057 13.9543 12.8409 14.5191 12.8409 15.2157C12.8409 15.9123 13.4057 16.4771 14.1023 16.4771Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </div>
                  <span className="font-semibold">Khuyến mãi</span>
                </div>
                <button
                  onClick={handleOpen}
                  className="relative justify-center border-0 bg-transparent text-sm font-normal outline-none text-primaryColor md:text-base md:hover:text-green-700  md:flex"
                >
                  Chọn mã
                </button>
              </div>

              {applyCouponCheckout && (
                <div className="justify-start md:grid">
                  <div className="truncate rounded-sm border border-green-400 bg-green-100 px-1 py-0.5 text-sm font-semibold text-green-400">
                    {applyCouponCheckout.voucher_code}
                  </div>
                </div>
              )}
            </div>
            <div className="check_summary  max-w-[440px] flex-[0_0_30%]">
              <div className="summary_box p-6 m-0 bg-white rounded-lg">
                <div className="checkout_title">Chi tiết thanh toán</div>
                <div className="justify-between text-[13px] text-[#2b2b2b] flex items-center mt-4">
                  <div>Tạm tính</div>
                  <div>
                    {getTotalCartAmountWithsale().toLocaleString("vi-VN")} đ
                  </div>
                </div>

                <div className="flex justify-between text-[13px] text-[#2b2b2b] items-center mt-2">
                  <div>Phí vận chuyển</div>
                  <div>16.500 đ</div>
                </div>

                <div className="flex justify-between text-[13px] text-[#2b2b2b] items-center mt-2">
                  <div>Giảm giá vận chuyển</div>
                  <div>{totalAmount > 150000 ? "-16.500 đ" : "0 đ"}</div>
                </div>

                <div className="flex justify-between text-[13px] text-[#2b2b2b] items-center mt-2">
                  <div>Giảm giá ưu đãi</div>
                  <div>{calculateDiscount()}</div>
                </div>
                <div className="summary_line mt-4 border-t border-[#e5e5e5] mx-[-24px]"></div>
                <div className="justify-between flex items-center mt-4">
                  <div>
                    Thành tiền{" "}
                    <span className="text-[13px] text-[#aaa]">
                      (Đã bao gồm vat)
                    </span>
                  </div>
                  <div>
                    <b className="text-[24px] text-red-500">
                      {/* {getTotalCartAmountWithsale().toLocaleString("vi-VN")}đ */}
                      {`${Number(calculateTotalAmount()).toLocaleString(
                        "vi-VN"
                      )} đ`}
                    </b>
                  </div>
                </div>
                <div className="summary_line mt-4 border-t border-[#e5e5e5] mx-[-24px]"></div>
                <div className="mt-4">
                  <div>Ghi chú Đơn hàng</div>
                  <textarea
                    onChange={changeHandle}
                    value={order.order_note}
                    name="order_note"
                    id="note"
                    cols="40"
                    rows="4"
                    className="border mt-4 rounded-lg border-primaryColor outline-none pl-2 pt-1"
                  ></textarea>
                </div>
                <div className="mt-4">
                  <button
                    onClick={addOrder}
                    className="w-full bg-[#feaa48] rounded-lg p-4 text-white font-bold text-[18px] border-none outline-none"
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {show &&
        createPortal(
          <AddressModal
            onApply={handleApplyAddress}
            selectAddress={selectedAddress}
            allAddresses={allAddresses}
            onClose={handleHidden}
          />,
          document.body
        )}

      <CartChooseCoupon
        isOpen={open}
        handleClose={handleClose}
        getTotalCartAmountWithsale={getTotalCartAmountWithsale()}
        onApply={handleApply}
        applyCouponCheckout={applyCouponCheckout}
      />

      <ReactDimmer
        isOpen={open}
        exitDimmer={setOpen}
        zIndex={100}
        // blur={1.5}
      />
    </div>
  );
};
