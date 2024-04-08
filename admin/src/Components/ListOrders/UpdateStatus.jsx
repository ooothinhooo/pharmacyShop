// eslint-disable-next-line no-unused-vars
import React from "react";
import { useState } from "react";

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

    await fetch("http://localhost:4000/updateStatusOrder", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateStatus),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.success
          ? alert("Cập nhật trạng thái thành công")
          : alert("Cập nhật trạng thái thất bại");
        fetchInfo();
        onClose();
      });
  };

  return (
    <div className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-[rgba(0,_0,_0,_0.3)] flex justify-center items-center">
      <div className="bg-white min-w-[300px] max-w-[400px] max-h-[calc(100vh-100px)] h-auto rounded-md px-4 w-full">
        <div className="flex justify-start items-center py-[10px] relative">
          <h1 className="text-[24px] font-medium">Cập nhật Trạng thái</h1>
          <i
            onClick={onClose}
            className="fa-solid fa-xmark text-[#000] text-[24px] absolute right-[0px] top-[10px] cursor-pointer"
          ></i>
        </div>

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
            <option value="0" selected>Lựa chọn trạng thái cập nhật</option>
            <option value="1">Chấp nhận đơn hàng</option>
            <option value="2">Đang giao</option>
            <option value="3">Đã giao</option>
            <option value="4">từ chối đơn hàng</option>
          </select>
        </div>

        <div className="flex justify-end my-8">
          <button
            onClick={onClose}
            className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
          >
            Quay lại
          </button>

          <button
            onClick={() => handleUpdateStatus()}
            className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateStatus;
