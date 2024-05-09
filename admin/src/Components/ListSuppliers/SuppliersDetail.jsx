/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SuppliersDetail = ({ onClose, updateSupplier, fetchInfo }) => {
  const [supplier, setSupplier] = useState({
    name: updateSupplier ? updateSupplier.sup_name : "",
    phone: updateSupplier ? updateSupplier.sup_phone : "",
    address: updateSupplier ? updateSupplier.sup_address : "",
  });

  const handleChange = (e) => {
    setSupplier({ ...supplier, [e.target.name]: e.target.value });
  };

  const handleAddSupplier = async () => {
    console.log(supplier);

    await fetch("http://localhost:4000/addSupplier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(supplier),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Thêm nhà cung cấp thành công thành công");
          fetchInfo();
          onClose();
        } else {
          alert("Thêm nhà cung cấp thất bại");
        }
      });
  };

  const handleUpdateSupplier = async () => {
    console.log(supplier);
    try {
      const response = await axios.post(
        "http://localhost:4000/updateSupplier",
        { id: updateSupplier.id, supplier: supplier },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Cập nhật nhà cung cấp thành công");
        fetchInfo();
        onClose();
      } else {
        toast.error("Cập nhật nhà cung cấp thất bại");
        onClose();
      }
    } catch (error) {
      console.error("Cập nhật nhà cung cấp thất bại:", error.message);
      toast.success("Cập nhật nhà cung cấp thất bại");
    }
  };
  return (
    <div className=" fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center z-50">
      <div className="max-w-[650px] w-[600px] relative">
        <div className="bg-white rounded grid gap-2">
          {/* <div className="absolute w-full flex-col space-y-1.5 flex mt-2 md:mt-0 justify-center px-4 py-2.5 md:px-6 md:pt-6 md:pb-4"></div> */}
          <div className="flex justify-start items-center px-[10px] relative">
            <h1 className="text-[24px] font-medium">
              {updateSupplier ? "Cập nhật nhà cung cấp" : "Thêm nhà cung cấp"}
            </h1>
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
                      <td className="w-[30%] align-top font-semibold">
                        Tên nhà cung cấp:
                      </td>

                      <td>
                        <input
                          id="quantity"
                          type="text"
                          name="name"
                          placeholder="Nhập tên"
                          value={supplier.name}
                          onChange={handleChange}
                          className="border-b ml-5 outline-none"
                        />
                      </td>
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Địa chỉ:
                      </td>

                      <td>
                        <input
                          id="quantity"
                          type="text"
                          name="address"
                          placeholder="Nhập địa chỉ"
                          value={supplier.address}
                          onChange={handleChange}
                          className="border-b ml-5 outline-none"
                        />
                      </td>
                    </tr>

                    <tr className="text-left">
                      <td className="w-[30%] align-top font-semibold">
                        Số điện thoại:
                      </td>

                      <td>
                        <input
                          id="quantity"
                          type="text"
                          name="phone"
                          placeholder="Nhập số điện thoại"
                          value={supplier.phone}
                          onChange={handleChange}
                          className="border-b ml-5 outline-none"
                        />
                      </td>
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
            {updateSupplier ? (
              <button
                onClick={() => handleUpdateSupplier()}
                className="border py-2 px-4 rounded-md bg-green-600 text-white font-medium hover:bg-green-800"
              >
                Cập nhật
              </button>
            ) : (
              <button
                onClick={() => handleAddSupplier()}
                className="border py-2 px-4 rounded-md bg-green-600 text-white font-medium hover:bg-green-800"
              >
                Thêm
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppliersDetail;
