import React, { useEffect, useState } from "react";
import AddressDetail from "../Account/AddressDetail";

const AddressModal = ({ onClose, allAddresses, onApply }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    const defaultAddress = allAddresses.find(
      (address) => address.default_address === 1
    );
    setSelectedAddress(defaultAddress);
  }, [allAddresses]);
  
  const handleApply = () => {
    if (selectedAddress) {
      onApply(selectedAddress);
      onClose();
    }
  };

  console.log(selectedAddress);
  return (
    <div className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-[rgba(0,_0,_0,_0.3)] flex justify-center items-center">
      <div className="bg-white min-w-[300px] max-w-[400px] max-h-[calc(100vh-100px)] h-auto rounded-md px-4 w-full">
        <div className="flex justify-start items-center py-[10px] relative">
          <h1 className="text-[20px] font-medium">Địa chỉ giao hàng</h1>
        </div>

        <div className="items-center grid gap-4 col-span-1 py-4">
          {allAddresses.map((address) => {
            return (
              <label
                htmlFor={address.idau}
                className="flex cursor-pointer items-start border-b border-neutral-300 pb-4 last:border-0 "
              >
                <input
                  type="radio"
                  name="chooseAddress"
                  id={address.idau}
                  className="mt-1"
                  checked={selectedAddress === address}
                  onChange={() => setSelectedAddress(address)}
                />
                <span className="ml-2 flex-1">
                  <div className="flex flex-1 items-start space-x-2">
                    <div className="flex-1">
                      <AddressDetail address={address} />
                    </div>
                    <button className="text-primaryColor font-semibold">
                      Cập nhật
                    </button>
                  </div>
                </span>
              </label>
            );
          })}
        </div>

        <div className="flex justify-end my-8">
          <button
            onClick={onClose}
            className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
          >
            Quay lại
          </button>

          <button className="border py-2 px-3 rounded-md bg-green-600 font-medium text-white hover:bg-green-700" onClick={handleApply}>
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
