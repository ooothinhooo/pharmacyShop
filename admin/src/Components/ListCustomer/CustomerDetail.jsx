/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
const CustomerDetail = ({ onClose, selectedCustomerDetail, formatDate }) => {
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="max-w-[650px] w-[500px] relative">
        <div className="bg-white rounded grid gap-2">
          {/* <div className="absolute w-full flex-col space-y-1.5 flex mt-2 md:mt-0 justify-center px-4 py-2.5 md:px-6 md:pt-6 md:pb-4"></div> */}
          <div className="flex justify-start items-center px-[10px] relative">
            <h1 className="text-[24px] font-medium">Chi tiết tài khoản</h1>
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
                <table className="w-full border-separate [border-spacing:0_10px]">
                  <tbody>
                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">Mã:</td>
                      <td>{selectedCustomerDetail.id}</td>
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Tên khách hàng:
                      </td>
                      <td>{selectedCustomerDetail.namecus}</td>
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Số điện thoại:
                      </td>
                      <td>{selectedCustomerDetail.phone}</td>
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Giới tính:
                      </td>
                      <td>{selectedCustomerDetail.gender}</td>
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Email:
                      </td>
                      <td>{selectedCustomerDetail.email}</td>
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Địa chỉ:
                      </td>
                      <td>{selectedCustomerDetail.address}</td>
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Ngày Sinh:
                      </td>
                      <td>{formatDate(selectedCustomerDetail.date)}</td>
                    </tr>
                  </tbody>
                </table>
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

export default CustomerDetail;
