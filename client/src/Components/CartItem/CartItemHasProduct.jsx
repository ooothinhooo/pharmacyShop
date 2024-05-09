import React, { useContext, useState } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import { ReactDimmer } from "react-dimmer";
import CartChooseCoupon from "./CartChooseCoupon";
// import { createPortal } from "react-dom";

export const CartItemHasProduct = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState("");
  const navigate = useNavigate();

  const handleNavigateCheckout = () => {
    navigate("/checkout", { state: applyCoupon });
  };

  const handleApply = (coupon) => {
    setApplyCoupon(coupon);
  };

  // const disableScroll = () => {
  //   document.body.style.overflow = "hidden";
  // };

  // const enableScroll = () => {
  //   document.body.style.overflow = "auto";
  // };
  const handleOpen = () => {
    setIsOpen((prevState) => !prevState);
    // disableScroll();
  };

  const handleClose = () => {
    setIsOpen(false);
    // enableScroll();
  };

  const {
    all_products,
    cartItems,
    removeFromCart,
    addToCart,
    getTotalCartAmountWithsale,
  } = useContext(ShopContext);

  // console.log(applyCoupon);

  const calculateDiscount = () => {
    if (!applyCoupon) return "-";

    if (applyCoupon.voucher_type === "fixed_amount") {
      return `-${Number(applyCoupon.value).toLocaleString("vi-VN")} đ`;
    } else {
      const discountAmount =
        getTotalCartAmountWithsale() * (applyCoupon.value / 100);
      return `-${Number(discountAmount.toFixed(0)).toLocaleString("vi-VN")} đ`;
    }
  };

  const calculateTotalAmount = () => {
    if (!applyCoupon) {
      return getTotalCartAmountWithsale().toLocaleString("vi-VN");
    } else if (applyCoupon.voucher_type === "fixed_amount") {
      return `${Number(
        (getTotalCartAmountWithsale() - applyCoupon.value).toFixed(0)
      ).toLocaleString("vi-VN")}`;
    } else {
      return `${Number(
        (
          getTotalCartAmountWithsale() -
          getTotalCartAmountWithsale() * (applyCoupon.value / 100)
        ).toFixed()
      ).toLocaleString("vi-VN")} đ`;
    }
  };

  return (
    <>
      <div className="bg-[#f0f2f5]">
        <div className="container py-4 flex justify-between">
          <div className="cart_items bg-white w-[67%] rounded-xl">
            <div className="p-6">
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
                {all_products.map((e, i) => {
                  if (cartItems[e.idm] > 0) {
                    return (
                      <div
                        className="w-full py-5 grid grid-cols-[1fr_4fr_1fr_2fr_1fr_0.5fr] gap-[10px] items-center"
                        key={i}
                      >
                        <Link to={`/products/${e.idm}`}>
                          <img src={e.image} alt="" className="w-[72px]" />
                        </Link>

                        <Link to={`/products/${e.idm}`}>
                          <p className="text-left product_name">{e.name}</p>
                        </Link>

                        <p>
                          {(e.price * (1 - e.sale / 100)).toLocaleString(
                            "vi-VN"
                          )}
                          đ
                        </p>

                        <p className="flex justify-center items-center">
                          <button
                            onClick={() => {
                              removeFromCart(e.idm);
                            }}
                            className="cartItem_quantity w-[52px] h-[50px] bg-white"
                          >
                            -
                          </button>
                          <button className="cartItem_quantity w-[50px] h-[50px] border border-[#ebebeb] bg-white">
                            {cartItems[e.idm]}
                          </button>

                          <button
                            onClick={() => {
                              addToCart(e.idm);
                            }}
                            className="cartItem_quantity w-[52px] h-[50px] bg-white"
                          >
                            +
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

                        <p
                          className="text-center"
                          onClick={() => {
                            removeFromCart(e.idm);
                          }}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-4 cart_total w-[31%]">
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

              {applyCoupon && (
                <div className="justify-start md:grid">
                  <div className="truncate rounded-sm border border-green-400 bg-green-100 px-1 py-0.5 text-sm font-semibold text-green-400">
                    {applyCoupon.voucher_code}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl box-border">
              <div className="total_content">
                <div className="flex justify-between mb-[24px] text-[14px] text-[#2b2b2b]">
                  <span>Tạm tính </span>
                  <p className="m-0">
                    <b>
                      {getTotalCartAmountWithsale().toLocaleString("vi-VN")} đ
                    </b>
                  </p>
                </div>

                <div className="flex justify-between mb-[24px] text-[14px] text-[#2b2b2b]">
                  <span>Giảm giá ưu đãi </span>
                  <p className="m-0 ">
                    <b>{calculateDiscount()}</b>
                  </p>
                </div>
              </div>

              <div className="border-b my-4"></div>

              <div className="grid items-center justify-items-end gap-0.5 md:grid-flow-col md:justify-between md:gap-2">
                <p className="text-sm text-neutral-900 md:text-base md:font-semibold">
                  Tổng tiền{" "}
                </p>
                <p className="text-xl leading-8 text-red-500 no-underline md:text-2xl">
                  <b>{calculateTotalAmount()}</b>
                </p>
              </div>

              <div className="total_footer flex flex-col items-center relative flex-wrap mt-3">
                <button className="text-[14px] font-medium max-w-[156px] border border-primaryColor bg-[#f4fef2] text-primaryColor min-h-[54px] w-[100%] rounded-xl p-1">
                  <Link to="/">Mua Thêm</Link>
                </button>
                <span className="text-[#aaa] mt-3">Hoặc</span>
                <button className="text-white bg-[#feaa48] rounded-xl min-h-[54px] p-1 flex-1 w-[100%] mt-3">
                  <div className="flex items-center justify-center">
                    <b className="text-[17px]">
                      <div onClick={handleNavigateCheckout}>Đặt hàng</div>
                    </b>
                    <i className="fa-solid fa-chevron-right ml-1 w-[16px]"></i>
                  </div>
                  <span className="text-[14px]">
                    Giao tận nơi hoặc nhận tại nhà thuốc
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CartChooseCoupon
        isOpen={isOpen}
        handleClose={handleClose}
        getTotalCartAmountWithsale={getTotalCartAmountWithsale()}
        onApply={handleApply}
        // applyCoupon={applyCoupon}
      />

      <ReactDimmer
        isOpen={isOpen}
        exitDimmer={setIsOpen}
        zIndex={100}
        // blur={1.5}
      />
    </>
  );
};
