/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const UpdateStatus = ({ onClose, orderId, fetchInfo }) => {
  console.log(orderId);
  const [updateStatus, setUpdateStatus] = useState({
    status: "0",
    order_id: orderId,
  });

  const handleChange = (e) => {
    setUpdateStatus({
      ...updateStatus,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateStatus = async () => {
    console.log(updateStatus);

    try {
      const response = await axios.post(
        "http://localhost:4000/updateStatusOrder",
        updateStatus,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        await fetchInfo();
        toast.success(
          `Trạng thái đơn hàng ${updateStatus.order_id} đã được cập nhật!`
        );
        onClose();
      } else {
        toast.error(
          `Cập nhật trạng thái đơn hàng ${updateStatus.order_id} thất bại`
        );
        onClose();
      }
    } catch (error) {
      console.error(error);
    }

    // await fetch("http://localhost:4000/updateStatusOrder", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updateStatus),
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     data.success
    //       ? alert("Cập nhật trạng thái thành công")
    //       : alert("Cập nhật trạng thái thất bại");
    //     fetchInfo();
    //     onClose();
    //   });
  };

  return (
    // <div className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-[rgba(0,_0,_0,_0.3)] flex justify-center items-center">
    //   <div className="bg-white min-w-[300px] max-w-[400px] max-h-[calc(100vh-100px)] h-auto rounded-md px-4 w-full">
    //     <div className="flex justify-start items-center py-[10px] relative">
    //       <h1 className="text-[24px] font-medium">Cập nhật Trạng thái</h1>
    //       <i
    //         onClick={onClose}
    //         className="fa-solid fa-xmark text-[#000] text-[24px] absolute right-[0px] top-[10px] cursor-pointer"
    //       ></i>
    //     </div>

    //     <div className="flex justify-between items-center mt-4">
    //       <label htmlFor="status" className="block font-medium">
    //         Trạng thái
    //       </label>
    //       <select
    //         name="status"
    //         id="status"
    //         value={updateStatus.status}
    //         onChange={handleChange}
    //       >
    //         <option value="0" selected>
    //           Lựa chọn trạng thái cập nhật
    //         </option>
    //         <option value="1">Chấp nhận đơn hàng</option>
    //         <option value="2">Đang giao</option>
    //         <option value="3">Đã giao</option>
    //         <option value="4">từ chối đơn hàng</option>
    //       </select>
    //     </div>

    //     <div className="flex justify-end my-8">
    //       <button
    //         onClick={onClose}
    //         className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
    //       >
    //         Quay lại
    //       </button>

    //       <button
    //         onClick={() => handleUpdateStatus()}
    //         className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
    //       >
    //         Cập nhật
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className=" fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="max-w-[650px] w-[500px] relative">
        <div className="bg-white rounded grid gap-2">
          {/* <div className="absolute w-full flex-col space-y-1.5 flex mt-2 md:mt-0 justify-center px-4 py-2.5 md:px-6 md:pt-6 md:pb-4"></div> */}
          <div className="flex justify-start items-center px-[10px] relative">
            <h1 className="text-[24px] font-medium">Cập nhật Trạng thái</h1>
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
                <div className="flex justify-between items-center mt-4">
                  <label htmlFor="status" className="block font-medium">
                    Trạng thái
                  </label>
                  <select
                    name="status"
                    id="status"
                    value={updateStatus.status}
                    onChange={handleChange}
                  >
                    <option value="0" selected>
                      Lựa chọn trạng thái cập nhật
                    </option>
                    <option value="1">Chấp nhận đơn hàng</option>
                    <option value="2">Đang giao</option>
                    <option value="3">Đã giao</option>
                    <option value="4">từ chối đơn hàng</option>
                  </select>
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
            <button
              onClick={() => handleUpdateStatus()}
              className="border py-2 px-4 rounded-md bg-green-600 text-white font-medium hover:bg-green-800"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
