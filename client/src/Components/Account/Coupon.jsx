import React, { useEffect, useState } from "react";
import { Updating } from "../Updating/Updating";
import logo from "../Assets/logo.png";
import { createPortal } from "react-dom";
import ModalCoupon from "./ModalCoupon";
export const Coupon = () => {
  const [vouchers, setVouchers] = useState([]);
  const [show, setShow] = useState(false);
  const [voucherDetail, setVoucherDetail] = useState({});

  const disableScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableScroll = () => {
    document.body.style.overflow = "auto";
  };
  const handleShow = (voucherDetail) => {
    setShow(true);
    disableScroll();
    setVoucherDetail(voucherDetail);
  };

  const fetchVouchers = async () => {
    try {
      const response = await fetch("http://localhost:4000/allVouchers");
      const data = await response.json();
      setVouchers(data.vouchers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVouchers();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const isExpired = (endDate) => {
    const today = new Date();
    const expiryDate = new Date(endDate);

    const todayCompare = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const expiryDateCompare = new Date(
      expiryDate.getFullYear(),
      expiryDate.getMonth(),
      expiryDate.getDate()
    );

    return todayCompare > expiryDateCompare;
  };

  console.log(vouchers);
  return (
    <div className="flex-1 box-border rounded-xl min-h-[300px] h-fit px-6">
      <div className="items-center space-x-4 mb-4 md:flex">
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-neutral-900">
            Mã giảm giá
          </h1>
        </div>
      </div>

      <div className="mt-2 grid gap-4 bg-white p-4 md:mt-0 md:grid-cols-3 md:rounded-md md:p-6 xl:grid-cols-3">
        {vouchers ? (
          vouchers.map((voucher) => {
            // console.log(voucher.end_date);
            const expired = isExpired(formatDate(voucher.end_date));
            if (!expired) {
              return (
                <div className="grid" key={voucher.voucher_id}>
                  <div className="grid grid-cols-[calc(74rem/16)_1fr]">
                    <div className="relative flex h-[calc(112rem/16)] w-[calc(74rem/16)] items-center justify-center">
                      <div className="relative z-[1] h-[calc(21.6rem/16)] w-[calc(54rem/16)]">
                        <img src={logo} alt="logo" />
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

                    <div className="flex gap-2 rounded-r-[2px] border-y border-neutral-100 p-3 shadow-[0px_1px_4px_0px_#DEDEDE]">
                      <div className="grid flex-1 gap-1">
                        <p className="line-clamp-2 text-sm font-semibold text-neutral-900">
                          "{voucher.voucher_code}" Giảm
                          {voucher.voucher_type !== "percentage"
                            ? voucher.value + "K"
                            : voucher.value + "%"}
                          cho đơn hàng từ {voucher.min_order_value}K
                        </p>
                        <p className="truncate text-xs leading-5 text-neutral-900 md:text-sm">
                          Trị giá:{" "}
                          {voucher.voucher_type !== "percentage"
                            ? voucher.value.toLocaleString("vi-VN") + " đ"
                            : voucher.value + "%"}
                        </p>
                        <div className="flex items-end justify-between gap-2">
                          <p className="text-xs leading-5 text-neutral-700">
                            HSD: {formatDate(voucher.end_date)}
                          </p>
                          <button
                            onClick={() => handleShow(voucher)}
                            className="relative flex justify-center outline-none bg-transparent text-primaryColor font-normal text-hyperLink border-0 text-sm items-center rounded-lg h-5 p-0 [&>span]:whitespace-nowrap [&>span]:text-xs"
                          >
                            <span>Chi tiết</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return null;
            }
          })
        ) : (
          <Updating />
        )}

        {show &&
          createPortal(
            <ModalCoupon
              onclose={() => {
                setShow(false);
                enableScroll();
              }}
              voucherDetail={voucherDetail}
              formatDate={formatDate}
            />,
            document.body
          )}
      </div>
    </div>
  );
};
