import React, { useContext, useState } from "react";
import { Updating } from "../Updating/Updating";
import { createPortal } from "react-dom";
import AddAddress from "./AddAddress";


export const Address = (props) => {
  const { user } = props;
  const [show, setShow] = useState(false);
  return (
    <div className="desktop_big flex-1 box-border bg-white rounded-xl min-h-[300px] h-fit p-6">
      <div className="flex items-center justify-between">
        <div className="desktop_head leading-8 text-[24px] font-bold">
          <h1>Sổ địa chỉ nhận hàng</h1>
        </div>
        <div>
          <button
            onClick={() => setShow(true)}
            className="border border-primaryColor rounded-lg px-2 py-1 text-[14px] text-primaryColor transition duration-300 hover:opacity-70"
          >
            <i className="fa-solid fa-circle-plus pr-1"></i>
            Thêm địa chỉ mới
          </button>
        </div>
      </div>
      <Updating />

      {show &&
        createPortal(
          <AddAddress user={user} onClose={() => setShow(false)} />,
          document.body
        )}
    </div>
  );
};
