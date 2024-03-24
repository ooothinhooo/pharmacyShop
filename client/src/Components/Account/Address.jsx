import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AddAddress from "./AddAddress";
import axios from "axios";

export const Address = () => {
  const [show, setShow] = useState(false);
  const [allAddresses, setAllAddresses] = useState([]);

  const fetchAddress = async () => {
    const response = await axios.get("http://localhost:4000/allAddresses", {
      headers: {
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    setAllAddresses(response.data.addresses);
  };
  
  useEffect(() => {
    fetchAddress();
  }, []);

  const handleDeleteAddress = async (id) => {
    await axios.post("http://localhost:4000/deleteAddress", { id: id }, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await fetchAddress();
  };

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

      {allAddresses
        ? allAddresses.map((address) => (
            <div
              key={address.idau}
              className="border-b border-neutral-300 bg-white pt-6 pb-3 last:border-0"
            >
              <div className="flex flex-1 items-start space-x-2">
                <div className="flex-1">
                  <div className="grid gap-2">
                    <div className="grid grid-flow-col content-center items-center justify-start gap-2">
                      <span className="break-words line-clamp-1 font-semibold">
                        {address.name_user}
                      </span>
                      <span className="h-5 w-[1px] bg-neutral-300 max-md:hidden"></span>
                      <span>{address.phone}</span>
                    </div>
                    <div>
                      <span className="break-word mb-1 block flex-1">
                        {address.address}
                      </span>
                      <span className="mb-1 flex space-x-2 md:mr-2">
                        {address.default_address === 1 && (
                          <span className="rounded-sm px-1 py-[2px] text-xs font-medium text-primaryColor bg-green-200">
                            Mặc định
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="relative flex justify-center border-0 bg-transparent font-normal text-primaryColor outline-none md:text-base md:font-medium md:hover:text-primary-600 mt-0.5"
                  type="buton"
                >
                  Cập nhật
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.idau)}
                  className="ml-2 mt-[2px]"
                >
                  <i className="fa-regular fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))
        : null}

      {/* <div className="border-b border-neutral-300 bg-white pt-6 pb-3 last:border-0">
        <div className="flex flex-1 items-start space-x-2">
          <div className="flex-1">
            <div className="grid gap-2">
              <div className="grid grid-flow-col content-center items-center justify-start gap-2">
                <span className="break-words line-clamp-1 font-semibold">Dương Thiên Tấn</span>
                <span className="h-5 w-[1px] bg-neutral-300 max-md:hidden"></span>
                <span>0866554764</span>
              </div>
              <div>
                <span className="break-word mb-1 block flex-1">123, Phường Cái Khế, Quận Ninh Kiều, Thành phố Cần Thơ</span>
                <span className="mb-1 flex space-x-2 md:mr-2">
                  <span className="rounded-sm px-1 py-[2px] text-xs font-medium text-primaryColor bg-green-200">Mặc định</span>
                </span>
              </div>
            </div>
          </div>
          <button
            className="relative flex justify-center border-0 bg-transparent font-normal text-primaryColor outline-none md:text-base md:font-medium md:hover:text-primary-600 mt-0.5"
            type="buton"
          >
            Cập nhật
          </button>
          <button className="ml-2 mt-[2px]">
            <i className="fa-regular fa-trash-can"></i>
          </button>
        </div>
      </div> */}

      {show &&
        createPortal(
          <AddAddress
            onClose={() => setShow(false)}
            fetchAddress={fetchAddress}
          />,
          document.body
        )}
    </div>
  );
};
