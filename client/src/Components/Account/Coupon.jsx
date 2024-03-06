import React from "react";
import { Updating } from "../Updating/Updating";

export const Coupon = () => {
  return (
    <div className="desktop_big flex-1 box-border bg-white rounded-xl min-h-[300px] h-fit p-6">
      <div className="desktop_head text-[24px] font-bold leading-8">
        <h1>Mã giảm giá</h1>
      </div>
      <div className="list_order">
        <div className="mt-6">
          <div className="list_order-content">
            <div className="list_order-tab flex border-b overflow-x-auto pb-[10px] border-[#f2f4f5]">
              <div className="list_order-tab--item">
                <button className="list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap  list_order-tab-name-active">
                  Có thể dùng
                </button>
              </div>

              <div className="list_order-tab--item">
                <button className="list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap text-[#b2bac6]">
                  Đã sử dụng
                </button>
              </div>

              <div className="list_order-tab--item">
                <button className="list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap text-[#b2bac6]">
                  Đã hết hạn
                </button>
              </div>
            </div>

            <div className="list_order-info">
              <Updating />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
