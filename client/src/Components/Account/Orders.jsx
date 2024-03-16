import React from "react";
import { Select } from "antd";
import { Updating } from "../Updating/Updating";

export const Orders = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className="desktop_big flex-1 box-border bg-white rounded-xl min-h-[300px] h-fit p-6 sticky top-[110px]">
      <div className="desktop_head text-[24px] font-bold leading-8">
        <h1>Lịch sử đơn hàng</h1>
      </div>
      <div className="list_order">
        <div className="mt-6">
          <div className="list_order-content">
            <div className="list_order-tab flex border-b overflow-x-auto pb-[10px] border-[#f2f4f5]">
              <div className="list_order-tab--item">
                <button className="list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap  list_order-tab-name-active">
                  Đang xử lý
                </button>
              </div>

              <div className="list_order-tab--item">
                <button className="list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap text-[#b2bac6]">
                  Đã đóng gói
                </button>
              </div>

              <div className="list_order-tab--item">
                <button className="list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap text-[#b2bac6]">
                  Đang giao
                </button>
              </div>

              <div className="list_order-tab--item">
                <button className="list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap text-[#b2bac6]">
                  Đã giao
                </button>
              </div>

              <div className="list_order-tab--item">
                <button className="list_order-tab--name ml-6  py-[5px] px-[10px] text-[15px] font-bold bg-transparent whitespace-nowrap text-[#b2bac6]">
                  Huỷ
                </button>
              </div>
            </div>

            <div className="list_order-filter mt-5 flex justify-between">
              <div className="flex items-center gap-x-[10px] gap-y-[20px] flex-wrap mb-[10px]"></div>
              <div className="flex items-center">
                <div className="flex items-center">
                  <i className="fa-solid fa-sort w-[24px] h-[24px] !leading-6"></i>
                  <Select
                    defaultValue="Đơn hàng mới nhất"
                    style={{
                      width: 165,
                      border: "none",
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "Đơn hàng mới nhất",
                        label: "Đơn hàng mới nhất",
                      },
                      {
                        value: "Đơn hàng cũ nhất",
                        label: "Đơn hàng cũ nhất",
                      },
                    ]}
                  />
                </div>
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
