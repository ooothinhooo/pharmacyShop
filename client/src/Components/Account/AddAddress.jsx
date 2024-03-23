import React, { useEffect, useState } from "react";

const AddAddress = ({ onClose, user }) => {
  const [address, setAddress] = useState({
    name: user.namecus,
    phone: user.phone,
    province: "",
    district: "",
    ward: "",
    street: "",
  });

  const handleAddressChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const UpdateAddress = async () => {
    console.log(address);

    await fetch("http://localhost:4000/updateAddress", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(address),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.success
          ? alert("Thêm địa chỉ thành công")
          : alert("Thêm địa chỉ thất bại");
      });
  };
  return (
    <div className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-[rgba(0,_0,_0,_0.3)] flex justify-center items-center">
      <div className="bg-white min-w-[300px] max-w-[400px] max-h-[calc(100vh-100px)] h-auto rounded-md px-4 w-full">
        <div className="flex justify-start items-center py-[10px] relative">
          <h1 className="text-[24px] font-medium">Thêm địa chỉ mới</h1>
          <i
            onClick={onClose}
            className="fa-solid fa-xmark text-[#000] text-[24px] absolute right-[0px] top-[10px] cursor-pointer"
          ></i>
        </div>

        <div>
          <div>
            <label htmlFor="namecus">Họ và tên</label>
            <div className="mt-2">
              <input
                className="w-full border border-[#ccc] outline-none p-[14px] rounded-lg h-[48px]"
                type="text"
                name="name"
                id="namecus"
                value={address.name}
                onChange={handleAddressChange}
                placeholder="Nhập họ và tên"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone">Số điện thoại</label>
            <div className="mt-2">
              <input
                className="w-full border border-[#ccc] outline-none p-[14px] rounded-lg h-[48px]"
                type="text"
                name="phone"
                id="phone"
                value={address.phone}
                onChange={handleAddressChange}
                placeholder="Nhập số điện thoại"
              />
            </div>
          </div>

          <div>
            <span>Địa chỉ</span>
            <div className="mt-2">
              <input
                className="w-full border border-[#ccc] outline-none p-[14px] rounded-lg h-[48px]"
                type="text"
                name="province"
                id=""
                value={address.province}
                onChange={handleAddressChange}
                placeholder="Tỉnh/Thành phố"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                className="w-full border border-[#ccc] outline-none p-[14px] rounded-lg h-[48px]"
                type="text"
                name="district"
                id=""
                value={address.district}
                onChange={handleAddressChange}
                placeholder="Quận/Huyện"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                className="w-full border border-[#ccc] outline-none p-[14px] rounded-lg h-[48px]"
                type="text"
                name="ward"
                id=""
                value={address.ward}
                onChange={handleAddressChange}
                placeholder="Phường Xã"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                className="w-full border border-[#ccc] outline-none p-[14px] rounded-lg h-[48px]"
                type="text"
                name="street"
                id=""
                value={address.street}
                onChange={handleAddressChange}
                placeholder="Nhập số nhà, tên đường"
              />
            </div>
          </div>

          <div className="mt-4">
            <input type="checkbox" />
            <span className="pl-1">Đặt làm địa chỉ mặt định</span>
          </div>
        </div>

        <div className="flex justify-end my-8">
          <button
            onClick={onClose}
            className="border py-2 px-3 rounded-md mr-4 bg-neutral-200 font-medium hover:bg-neutral-300"
          >
            Quay lại
          </button>
          <button
            onClick={() => UpdateAddress()}
            className="border py-2 px-4 rounded-md bg-green-600 text-white font-medium hover:bg-green-800"
          >
            Lưu lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
