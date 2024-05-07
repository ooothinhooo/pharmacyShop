import React from "react";
const ModalCoupon = ({ onclose, voucherDetail, formatDate }) => {
  console.log(voucherDetail);
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="max-w-[500px] w-auto relative">
        <div className="bg-white rounded grid gap-4 pt-14">
          {/* <div className="absolute w-full flex-col space-y-1.5 flex mt-2 md:mt-0 justify-center px-4 py-2.5 md:px-6 md:pt-6 md:pb-4"></div> */}
          <div className="grid">
            <div
              className="overflow-hidden h-full max-h-[calc(100dvh-138px)] px-4 [&>div]:relative md:max-h-[calc(80vh-128px)] md:px-4"
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
                  <div className="grid content-start justify-center justify-items-center gap-4 py-4">
                    <p className="line-clamp-2 text-center text-base font-semibold text-neutral-900 md:text-xl">
                      "{voucherDetail.voucher_code}" Giảm {voucherDetail.value}K
                      cho đơn hàng từ {voucherDetail.min_order_value}K
                    </p>

                    <div className="[&amp;_a]:text-hyperLink w-full self-start whitespace-break-spaces text-sm">
                      "{voucherDetail.voucher_code}" Giảm {voucherDetail.value}K
                      cho đơn hàng từ {voucherDetail.min_order_value}K
                    </div>
                    <div className="[&amp;_a]:text-hyperLink w-full self-start whitespace-break-spaces text-sm">
                      QUÀ TẶNG COUPON {voucherDetail.min_order_value}K - Coupon{" "}
                      {voucherDetail.voucher_code}: Áp dụng giảm ngay
                      {voucherDetail.value} cho đơn hàng có giá trị từ{" "}
                      {voucherDetail.min_order_value} VNĐ khi mua hàng qua
                      web/app Pharma Shop - Thời gian sử dụng coupon:
                      {formatDate(voucherDetail.start_date)} đến{" "}
                      {formatDate(voucherDetail.end_date)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-end justify-center gap-4 p-4 shadow-top">
            <button
              onClick={onclose}
              className="relative flex justify-center outline-none font-semibold text-white bg-primaryColor border-0 hover:bg-green-700 text-base px-6 py-3 h-[3.375rem] items-center rounded-lg w-full"
            >
              <span>Đồng ý</span>
            </button>
          </div>
          <button
            onClick={onclose}
            className="absolute rounded-sm opacity-100 outline-0 hover:opacity-80 [&>svg]:w-6 [&>svg]:h-6 right-4 top-4"
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

export default ModalCoupon;
