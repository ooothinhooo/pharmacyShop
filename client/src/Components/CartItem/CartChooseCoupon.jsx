import React, { useEffect, useState } from "react";
import logo from "../Assets/logo.png";

const CartChooseCoupon = (props) => {
  const {
    isOpen,
    handleClose,
    onApply,
    getTotalCartAmountWithsale,
    applyCouponCheckout,
  } = props;
  const [searchCoupon, setSearchCoupon] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(applyCouponCheckout);

  const handleApply = () => {
    onApply(selectedCoupon);
    handleClose();
  };

  console.log(selectedCoupon);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await fetch("http://localhost:4000/allVouchers");
        const data = await response.json();
        const filteredCoupons = data.vouchers.filter(
          (coupon) => coupon.min_order_value <= getTotalCartAmountWithsale
        );
        setCoupons(filteredCoupons);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCoupons();
  }, [getTotalCartAmountWithsale]);

  // console.log(selectedCoupon);
  // console.log(coupons[0]);

  const handleSearchCoupon = (e) => {
    setSearchCoupon(e.target.value);
  };

  const formatCurrency = (value) => {
    if (value === '0') {
      return "0K";
    } else if (value >= 1000000) {
      const million = Math.floor(value / 1000000);
      const thousand = Math.floor((value % 1000000) / 1000);
      if (thousand === 0) {
        return `${million}Tr`;
      } else {
        return `${million}Tr${thousand}K`;
      }
    } else if (value >= 1000) {
      return `${Math.floor(value / 1000)}K`;
    } else {
      return value.toString();
    }
  };

  // console.log(selectedCoupon);
  return (
    <div
      className={`fixed right-0 top-0 z-[200] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="max-w-[500px] w-auto relative">
        <div className="bg-white rounded gap-4 h-[100vh] flex flex-col">
          <div className="w-full flex-col space-y-1.5 px-4 pb-2 flex justify-center md:h-11 md:mb-2 md:mt-4 md:px-4 md:py-2 pt-3">
            <h2 className="tracking-tight text-xl font-semibold">
              <p className="text-base md:text-xl">Chọn mã khuyến mãi</p>
            </h2>
          </div>
          <div className="grid content-start">
            <div className="grid px-0">
              <div className="grid">
                <div className="px-4 pb-4">
                  <form action="">
                    <div className="space-y-2">
                      <div className="grid grid-cols-[1fr,128px] gap-3">
                        <div className="relative flex">
                          <input
                            maxLength="50"
                            className="w-full border border-neutral-500 text-neutral-900 rounded-lg placeholder:text-neutral-600 focus:ring-neutral-500  focus:border-neutral-700 outline-none p-3.5 h-12 truncate text-base font-normal"
                            placeholder="Nhập mã giảm giá"
                            inputMode="text"
                            type="text"
                            value={searchCoupon}
                            onChange={handleSearchCoupon}
                          />
                        </div>
                        <button
                          disabled={!searchCoupon}
                          className={`relative flex justify-center outline-none font-semibold border-0 text-base px-5 py-2.5 h-12 items-center rounded-lg ${
                            searchCoupon
                              ? "cursor-pointer bg-primaryColor text-white hover:bg-green-700 focus:ring-green-700"
                              : "cursor-not-allowed bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          <span>Tìm kiếm</span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="bg-neutral-100 h-4 w-full"></div>
                <div className="space-y-2">
                  <div className="grid h-[calc(100dvh-300px)] md:h-[calc(100dvh-290px)] overflow-y-auto">
                    <div
                      style={{
                        overflow: "visible",
                        height: "0px",
                        width: "0px",
                      }}
                    >
                      <div
                        style={{
                          boxSizing: "border-box",
                          height: "auto",
                          position: "relative",
                          width: "365px",
                          willChange: "transform",
                          overflow: "hidden",
                        }}
                      >
                        <div className="grid px-4 pb-3 first:pt-4">
                          <div className="grid gap-1">
                            {coupons &&
                              coupons.map((coupon) => (
                                <label
                                  key={coupon.voucher_id}
                                  htmlFor={coupon.voucher_id}
                                  className="group grid cursor-pointer grid-cols-[calc(74rem/16)_1fr] shadow"
                                >
                                  <div className="relative flex h-[calc(112rem/16)] w-[calc(74rem/16)] items-center justify-center">
                                    <div className="relative z-[1] h-[calc(21.6rem/16)] w-[calc(54rem/16)]">
                                      <img src={logo} alt="" />
                                    </div>
                                    <div className="absolute inset-0">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        color="#108932"
                                        fill="none"
                                        viewBox="0 0 74 112"
                                        className=" group-data-[disabled=true]:text-neutral-600"
                                      >
                                        <mask
                                          id="mask0_12865_143879"
                                          width="358"
                                          height="112"
                                          x="0"
                                          y="0"
                                          maskUnits="userSpaceOnUse"
                                          style={{ maskType: "alpha" }}
                                        >
                                          <path
                                            fill="#fff"
                                            fillRule="evenodd"
                                            d="M0 2a2 2 0 012-2h354a2 2 0 012 2v108a2 2 0 01-2 2H2a2 2 0 01-2-2v-6a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6V2z"
                                            clipRule="evenodd"
                                          ></path>
                                        </mask>
                                        <g mask="url(#mask0_12865_143879)">
                                          <path
                                            fill="currentColor"
                                            d="M0 2a2 2 0 012-2h72v112H2a2 2 0 01-2-2V2z"
                                          ></path>
                                        </g>
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="content grid h-[calc(112rem/16)] gap-1 rounded-r-[2px] border border-neutral-100 p-3">
                                    <p className="line-clamp-2 text-sm font-semibold text-neutral-900">
                                      "{coupon.voucher_code}" Giảm{" "}
                                      {coupon.voucher_type === "fixed_amount"
                                        ? formatCurrency(coupon.value)
                                        : `${coupon.value}%`}{" "}
                                      cho đơn hàng Online{" "}
                                      {formatCurrency(coupon.min_order_value)}
                                    </p>
                                    <div className="grid content-end gap-1">
                                      <div className="grid grid-cols-[1fr_calc(70rem/16)] gap-[calc(18rem/16)] ">
                                        <p className="truncate text-xs leading-5 text-neutral-900 md:text-sm">
                                          Trị giá:
                                          {coupon.voucher_type ===
                                          "fixed_amount"
                                            ? Number(
                                                coupon.value
                                              ).toLocaleString("vi-VN") + " đ"
                                            : ` ${coupon.value}%`}
                                        </p>
                                        <div className="flex justify-center">
                                          <input
                                            className="peer absolute opacity-0"
                                            id={coupon.voucher_id}
                                            type="checkbox"
                                            value={coupon.voucher_code}
                                            onChange={() =>
                                              setSelectedCoupon(
                                                coupon === selectedCoupon
                                                  ? null
                                                  : coupon
                                              )
                                            }
                                            checked={
                                              JSON.stringify(coupon) ===
                                              JSON.stringify(selectedCoupon)
                                            }
                                          />
                                          <span className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-neutral-300 text-white/100 before:contents[""] before:mb-[2px] before:h-[6px] before:w-[10px] before:-rotate-45 before:border-2 before:border-r-0 before:border-t-0 before:border-white group-hover:border-green-600 peer-checked:border-green-600 peer-checked:bg-green-600'></span>
                                        </div>
                                      </div>
                                      <div className="grid grid-cols-[1fr_calc(70rem/16)] gap-[calc(18rem/16)] ">
                                        <p className="text-xs leading-5 text-neutral-700">
                                          HSD: {formatDate(coupon.end_date)}
                                        </p>
                                        <div className="z-[2] flex justify-center">
                                          <button
                                            data-size="sm"
                                            type="button"
                                            className="relative flex justify-center outline-none bg-transparent font-normal border-0 hover:bg-0 hover:text-green-600 focus:text-green-600 text-sm items-center rounded-lg h-5 p-0 [&amp;>span]:whitespace-nowrap [&amp;>span]:text-xs"
                                          >
                                            <span>Chi tiết</span>
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </label>
                              ))}

                            {/* <label
                              htmlFor=":rd0:"
                              className="group grid cursor-pointer grid-cols-[calc(74rem/16)_1fr] shadow"
                            >
                              <div className="relative flex h-[calc(112rem/16)] w-[calc(74rem/16)] items-center justify-center">
                                <div className="relative z-[1] h-[calc(21.6rem/16)] w-[calc(54rem/16)]">
                                  <img src={logo} alt="" />
                                </div>
                                <div className="absolute inset-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    color="#108932"
                                    fill="none"
                                    viewBox="0 0 74 112"
                                    className=" group-data-[disabled=true]:text-neutral-600"
                                  >
                                    <mask
                                      id="mask0_12865_143879"
                                      width="358"
                                      height="112"
                                      x="0"
                                      y="0"
                                      maskUnits="userSpaceOnUse"
                                      style={{ maskType: "alpha" }}
                                    >
                                      <path
                                        fill="#fff"
                                        fillRule="evenodd"
                                        d="M0 2a2 2 0 012-2h354a2 2 0 012 2v108a2 2 0 01-2 2H2a2 2 0 01-2-2v-6a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6v-4a3 3 0 100-6V2z"
                                        clipRule="evenodd"
                                      ></path>
                                    </mask>
                                    <g mask="url(#mask0_12865_143879)">
                                      <path
                                        fill="currentColor"
                                        d="M0 2a2 2 0 012-2h72v112H2a2 2 0 01-2-2V2z"
                                      ></path>
                                    </g>
                                  </svg>
                                </div>
                              </div>
                              <div className="content grid h-[calc(112rem/16)] gap-1 rounded-r-[2px] border border-neutral-100 p-3">
                                <p className="line-clamp-2 text-sm font-semibold text-neutral-900">
                                  "LAMQUENNHE" Giảm 30K cho đơn 120K chào bạn
                                  mới
                                </p>
                                <div className="grid content-end gap-1">
                                  <div className="grid grid-cols-[1fr_calc(70rem/16)] gap-[calc(18rem/16)] ">
                                    <p className="truncate text-xs leading-5 text-neutral-900 md:text-sm">
                                      Trị giá: 30.000&nbsp;₫
                                    </p>
                                    <div className="flex justify-center">
                                      <input
                                        className="peer absolute opacity-0"
                                        id=":rd0:"
                                        type="checkbox"
                                        value="LAMQUENNHE"
                                      />
                                      <span className='flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-neutral-300 text-white/100 before:contents[""] before:mb-[2px] before:h-[6px] before:w-[10px] before:-rotate-45 before:border-2 before:border-r-0 before:border-t-0 before:border-white group-hover:border-green-600 peer-checked:border-green-600 peer-checked:bg-green-600'></span>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-[1fr_calc(70rem/16)] gap-[calc(18rem/16)] ">
                                    <p className="text-xs leading-5 text-neutral-700">
                                      HSD: 30/06/2024
                                    </p>
                                    <div className="z-[2] flex justify-center">
                                      <button
                                        data-size="sm"
                                        type="button"
                                        className="relative flex justify-center outline-none bg-transparent font-normal border-0 hover:bg-0 hover:text-green-600 focus:text-green-600 text-sm items-center rounded-lg h-5 p-0 [&amp;>span]:whitespace-nowrap [&amp;>span]:text-xs"
                                      >
                                        <span>Chi tiết</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </label> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={handleClose}
            className="absolute inset-x-0 bottom-0 items-end justify-center gap-4 bg-white p-4 shadow-top"
          >
            <div
              onClick={handleApply}
              className="relative flex justify-center outline-none font-semibold text-white bg-primaryColor border-0 hover:bg-green-700 text-base px-6 py-3 h-[3.375rem] items-center rounded-lg w-full"
            >
              <span>Áp dụng</span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="fixed rounded-sm opacity-100 outline-0 transition-opacity hover:opacity-80 md:right-4 md:top-6 [&>svg]:w-6 [&>svg]:h-6 right-4 top-5"
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
        </div>
      </div>
    </div>
  );
};

export default CartChooseCoupon;
