// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Pagination } from "antd";
import AddVoucher from "./AddVoucher";
import { createPortal } from "react-dom";

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [show, setShow] = useState(false);

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allVouchers");
    const data = await response.json();
    setVouchers(data.vouchers);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <div className="flex w-full justify-between items-center my-5">
        <div></div>
        <h1>Mã giảm giá</h1>
        <button
          onClick={handleShow}
          className="flex items-center bg-primaryColor text-white rounded p-2"
        >
          Thêm mã <i className="fa-solid fa-plus pl-2"></i>
        </button>
      </div>
      <div className="grid grid-cols-[0.3fr_1.2fr_0.8fr_1fr_1fr_1fr_1fr_0.8fr_1fr_1.5fr_0.5fr] w-full gap-4">
        <p>ID</p>
        <p>Mã</p>
        <p>Giá trị</p>
        <p>Áp dụng</p>
        <p>Loại</p>
        <p>Ngày tạo</p>
        <p>Thời hạn</p>
        <p>Số lượng</p>
        <p>Trạng thái</p>
        <p></p>
        <p></p>
      </div>
      <div className="list_product-allProduct w-full">
        <hr />
        {vouchers.length > 0 &&
          vouchers
            .slice((current - 1) * pageSize, current * pageSize)
            .map((voucher, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[0.3fr_1.2fr_0.8fr_1fr_1fr_1fr_1fr_0.8fr_1fr_1.5fr_0.5fr] w-full gap-4 items-center py-3"
                >
                  <p>{voucher.voucher_id}</p>
                  <p>{voucher.voucher_code}</p>
                  <p>{voucher.value}</p>
                  <p> Từ {voucher.min_order_value}</p>
                  <p>
                    {voucher.voucher_type === "fixed_amount"
                      ? "Giá cụ thể"
                      : "Phần trăm"}
                  </p>
                  <p>{new Date(voucher.start_date).toLocaleDateString()}</p>
                  {/* <p>{new Date(voucher.end_date) - new Date(voucher.start_date)}</p> */}
                  <p>
                    
                    {'Còn ' + (new Date(voucher.end_date).getTime() -
                      new Date(voucher.start_date).getTime()) /
                      (1000 * 3600 * 24)} ngày
                  </p>
                  <p>{voucher.quantity}</p>
                  <p>{voucher.status === '1' ? "Còn hạn" : "Hết hạn"}</p>
                  <button className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white">
                    Chỉnh sửa
                  </button>
                  <button className="hover:text-primaryColor">
                    <i className="fa-solid fa-trash cursor-pointer m-auto"></i>
                  </button>
                </div>
              );
            })}

        {
          <Pagination
            className="text-center"
            current={current}
            onChange={setCurrent}
            pageSize={pageSize}
            total={vouchers.length}
            responsive={true}
          />
        }

        {show &&
          createPortal(
            <AddVoucher onClose={() => setShow(false)} fetchInfo={fetchInfo} />,
            document.body
          )}
      </div>
    </div>
  );
};

export default Vouchers;
