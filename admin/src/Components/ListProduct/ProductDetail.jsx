/* eslint-disable no-unused-vars */
import React from "react";

// eslint-disable-next-line react/prop-types
const ProductDetail = ({ productToUpdate, onClose }) => {
  return (
    <div className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-[rgba(0,_0,_0,_0.3)] flex justify-center items-center">
      <div className="bg-white min-w-[300px] max-w-[400px] max-h-[calc(100vh-100px)] h-auto rounded-md px-4 w-full">
        <div className="flex justify-start items-center py-[10px] relative">
          <h1 className="text-[24px] font-medium">
            {productToUpdate ? "Cập nhật sản phẩm" : "Chi tiết sản phẩm"}
          </h1>
          <i
            onClick={onClose}
            className="fa-solid fa-xmark text-[#000] text-[24px] absolute right-[0px] top-[10px] cursor-pointer"
          ></i>
        </div>

        <div className="flex justify-end my-8">
          <button
            onClick={onClose}
            className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
          >
            Quay lại
          </button>
          {productToUpdate && (
            <button
              // onClick={() => updateAddress()}
              className="border py-2 px-4 rounded-md bg-green-600 text-white font-medium hover:bg-green-800"
            >
              Cập nhật
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
