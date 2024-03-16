import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import cash from "../Assets/cash.png";
import momo from "../Assets/momo.png";
import credit from "../Assets/credit.png";
import ATM from "../Assets/atm.png";
import { Link } from "react-router-dom";

export const CheckoutHasProduct = () => {
  const {
    getTotalCartItems,
    getTotalCartAmountWithsale,
    all_products,
    cartItems,
    getTotalCartAmountWithVat,
  } = useContext(ShopContext);
  return (
    <div className="bg-[#f0f2f5]">
      <div className="container pb-6">
        <div className="pt-6"></div>
        <div className="checkout_content flex flex-row items-start">
          <div className="checkout_info flex-[1_0]">
            {/* check info product cart */}
            <div className="product_box shadow-sm">
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
                            <Link to={`/products/${e.id}`}>
                              <img src={e.image} alt="" className="w-[72px]" />
                            </Link>
                            <Link to={`/products/${e.id}`}>
                              <p className="product_name text-left">{e.name}</p>
                            </Link>
                            
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
                {/* <div className="receive_info-tab flex flex-row items-center justify-center gap-[46px] text-[#aaa]">
                  <div className="receive_info-tab--item flex items-center flex-row gap-[6px] font-medium leading-[120%] text-[16px] cursor-pointer">
                    <input type="radio" name="typeReceive" checked />
                    <i className="fa-solid fa-truck"></i>
                    Giao hàng tận nơi
                  </div>

                  <div className="receive_info-tab--item flex items-center flex-row gap-[6px] font-medium leading-[120%] text-[16px] cursor-pointer">
                    <input type="radio" name="typeReceive" />
                    <i className="fa-solid fa-shop"></i>
                    Nhận tại nhà thuốc
                  </div>
                </div> */}
                <div className="bg-white rounded-lg border border-primaryColor mt-[10px] cursor-pointer">
                  <div className="py-4 px-5">
                    <div className="flex flex-row gap-3 items-center">
                      <i className="fa-solid fa-location-dot text-primaryColor"></i>
                      <div className="text-[16px] flex-1 font-normal ">
                        Nhập địa chỉ nhận hàng
                      </div>
                      <i className="fa-solid fa-plus"></i>
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="check_summary ml-6 max-w-[440px] flex-[0_0_30%]">
            <div className="summary_box p-6 m-0 bg-white rounded-lg">
              <div className="checkout_title">Tổng tiền</div>
              <div className="justify-between flex items-center mt-4">
                <div>Tạm tính</div>
                <div>
                  <b className="text-[24px]">
                    {getTotalCartAmountWithsale().toLocaleString("vi-VN")} đ
                  </b>
                </div>
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
                    {getTotalCartAmountWithVat().toLocaleString("vi-VN")}đ
                  </b>
                </div>
              </div>
              <div className="summary_line mt-4 border-t border-[#e5e5e5] mx-[-24px]"></div>
              <div className="mt-4">
                <div>Ghi chú Đơn hàng</div>
                <textarea
                  name="note"
                  id="note"
                  cols="40"
                  rows="4"
                  className="border mt-4 rounded-lg border-primaryColor outline-none pl-2 pt-1"
                ></textarea>
              </div>
              <div className="mt-4">
                <button className="w-full bg-[#feaa48] rounded-lg p-4 text-white font-bold text-[18px] border-none outline-none">
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
