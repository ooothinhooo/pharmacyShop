/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import axios from "axios";

// eslint-disable-next-line react/prop-types
const AddVoucher = ({ onClose, fetchInfo, editVoucher }) => {
  const [voucher, setVoucher] = useState({
    code: editVoucher ? editVoucher.voucher_code : "",
    value: editVoucher ? editVoucher.value : "",
    min_order_value: editVoucher ? editVoucher.min_order_value : "0",
    apply: editVoucher ? editVoucher.apply : "0 đồng",
    type: editVoucher ? editVoucher.voucher_type : "fixed_amount",
    date_start: editVoucher
      ? editVoucher.start_date
      : new Date().toLocaleDateString(),
    date_end: editVoucher
      ? editVoucher.end_date
      : new Date().toLocaleDateString(),
    quantity: editVoucher ? editVoucher.quantity : "",
  });
  console.log(voucher);

  const handleChange = (e) => {
    if (e.target.name === "apply" && e.target.value !== "trên 0 đồng") {
      setVoucher({
        ...voucher,
        [e.target.name]: e.target.value,
        min_order_value: "0",
      });
    } else {
      setVoucher({
        ...voucher,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleDateStartChange = (date) => {
    setVoucher({
      ...voucher,
      date_start: date.toLocaleDateString(),
    });
  };

  // Hàm xử lý thay đổi ngày kết thúc
  const handleDateEndChange = (date) => {
    setVoucher({
      ...voucher,
      date_end: date.toLocaleDateString(),
    });
  };
  const handleAddVoucher = async () => {
    console.log(voucher);

    await fetch("http://localhost:4000/AddVoucher", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(voucher),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          alert("Thêm voucher thành công");
          fetchInfo();
          onClose();
        } else {
          alert("Thêm voucher thất bại");
        }
      });
  };

  const handleUpdateVoucher = async (id) => {
    console.log(voucher);

    try {
      const response = await axios.post(
        "http://localhost:4000/updateVoucher",
        { id: id, voucher: voucher },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success(`Voucher ${id} đã được sửa!`);
        await fetchInfo();
        onClose();
      } else {
        toast.error(`Sửa voucher ${id} thất bại`);
        onClose();
      }
    } catch (error) {
      console.error("Sửa voucher thất bại:", error.message);
      toast.error(`Sửa voucher ${id} thất bại`);
    }
  };

  return (
    <div className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-[rgba(0,_0,_0,_0.3)] flex justify-center items-center">
      <div className="bg-white min-w-[300px] max-w-[600px] max-h-[calc(100vh-100px)] h-auto rounded-md px-4 w-full">
        <div className="flex justify-start items-center py-[10px] relative">
          <h1 className="text-[24px] font-medium">
            {editVoucher ? "Chỉnh sửa mã" : "Thêm mã voucher"}
          </h1>
          <i
            onClick={onClose}
            className="fa-solid fa-xmark text-[#000] text-[24px] absolute right-[0px] top-[10px] cursor-pointer"
          ></i>
        </div>

        <div className="flex items-center mt-4">
          <label htmlFor="code" className="block font-medium">
            <span>Mã voucher:</span>
          </label>
          <input
            id="code"
            type="text"
            name="code"
            placeholder="Nhập mã voucher"
            value={voucher.code}
            onChange={handleChange}
            className="border-b ml-5 outline-none"
          />
        </div>

        <div className="flex items-center mt-4">
          <label htmlFor="value" className="block font-medium">
            <span>Giá trị:</span>
          </label>

          <input
            id="value"
            type="text"
            name="value"
            placeholder="Giá trị giảm"
            value={voucher.value}
            onChange={handleChange}
            className="border-b ml-5 outline-none"
          />
        </div>

        <div className="flex flex-col justify-center mt-4">
          <label htmlFor="apply" className="block font-medium">
            <span>Áp dụng:</span>
          </label>
          <div className="mt-2 flex flex-col">
            <div>
              <label>
                <input
                  type="radio"
                  name="apply"
                  id=""
                  value="0 đồng"
                  checked={voucher.apply === "0 đồng"}
                  onChange={handleChange}
                />{" "}
                <span className="mr-3">đơn 0 đ</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="apply"
                  id=""
                  value="trên 0 đồng"
                  checked={voucher.apply === "trên 0 đồng"}
                  onChange={handleChange}
                />{" "}
                <span>trên 0 đ </span>
              </label>
            </div>
            <input
              type="text"
              placeholder="Giá trị cụ thể"
              name="min_order_value"
              className="border-b outline-none mt-3"
              value={voucher.min_order_value}
              onChange={handleChange}
              disabled={voucher.apply !== "trên 0 đồng"}
            />
          </div>
        </div>

        <div className="flex flex-col justify-center mt-4">
          <label htmlFor="type" className="block font-medium">
            <span>Loại:</span>
          </label>
          <select
            name="type"
            id="type"
            value={voucher.type}
            onChange={handleChange}
          >
            <option value="fixed_amount">Giá trị cụ thể</option>
            <option value="percentage">Phần trăm</option>
          </select>
        </div>

        <div className="flex items-center mt-4">
          <label htmlFor="date_start" className="block font-medium">
            <span className="mr-3">Ngày bắt đầu:</span>
          </label>
          <DatePicker
            selected={voucher.date_start}
            onChange={handleDateStartChange}
          />
        </div>

        <div className="flex items-center mt-4">
          <label htmlFor="date_end" className="block font-medium">
            <span className="mr-3">Ngày kết thúc:</span>
          </label>
          <DatePicker
            selected={voucher.date_end}
            onChange={handleDateEndChange}
          />
        </div>

        <div className="flex items-center mt-4">
          <label htmlFor="quantity" className="block font-medium">
            <span>Số lượng:</span>
          </label>
          <input
            id="quantity"
            type="text"
            name="quantity"
            placeholder="Nhập số lượng"
            value={voucher.quantity}
            onChange={handleChange}
            className="border-b ml-5 outline-none"
          />
        </div>

        {/* <div className="flex items-center mt-4">
          <label htmlFor="status" className="block font-medium">
            <span>Trạng thái:</span>
          </label>
          <select name="status" id="status">
            <option selected value="0">
              Hoạt động
            </option>
            <option value="1">hết hạn</option>
          </select>
        </div> */}

        <div className="flex justify-end my-8">
          <button
            onClick={onClose}
            className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
          >
            Quay lại
          </button>

          {editVoucher ? (
            <button
              className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
              onClick={() => handleUpdateVoucher(editVoucher.voucher_id)}
            >
              Sửa
            </button>
          ) : (
            <button
              className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
              onClick={() => handleAddVoucher()}
            >
              Thêm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddVoucher;
