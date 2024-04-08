import React, { useContext, useEffect, useState } from "react";
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

export const CheckoutHasProduct = () => {
  const {
    getTotalCartItems,
    getTotalCartAmountWithsale,
    all_products,
    cartItems,
  } = useContext(ShopContext);

  const [show, setShow] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("cash");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const calculatedTotal = getTotalCartAmountWithsale();
    setTotalAmount(calculatedTotal);
  }, [getTotalCartAmountWithsale]);

  const [order, setOrder] = useState({
    order_date: new Date(Date.now()),
    total:
      getTotalCartAmountWithsale() > 150000
        ? getTotalCartAmountWithsale()
        : getTotalCartAmountWithsale() + 16500,
    payment_method: selectedPaymentMethod,
    order_note: "",
    cartItems: cartItems,
    address: "",
  });

  const changeHandle = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleNavigateToProduct = (idProduct) => {
    const product = all_products.find((product) => product.id === idProduct);
    navigate(`/products/${idProduct}`, { state: product });
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleHidden = () => {
    setShow(false);
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

  console.log(allAddresses);

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
                      if (cartItems[e.id] > 0) {
                        return (
                          <div
                            className="w-full py-5 grid grid-cols-[1fr_3.8fr_1fr_1fr_1fr] gap-[10px] items-center"
                            key={i}
                          >
                            <div onClick={() => handleNavigateToProduct(e.id)}>
                              <img src={e.image} alt="" className="w-[72px]" />
                            </div>
                            <div onClick={() => handleNavigateToProduct(e.id)}>
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
                                {cartItems[e.id]}
                              </button>
                            </p>

                            <p>
                              {(
                                e.price *
                                (1 - e.sale / 100) *
                                cartItems[e.id]
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
          <div className="check_summary ml-6 max-w-[440px] flex-[0_0_30%]">
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
                    {totalAmount < 150000
                      ? (totalAmount + 16500).toLocaleString("vi-VN") + " đ"
                      : totalAmount.toLocaleString("vi-VN") + " đ"}
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
    </div>
  );
};
