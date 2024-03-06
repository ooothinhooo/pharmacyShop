import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";

export const AccountBig = () => {
  const [date, setDate] = useState(new Date());
  return (
    <div className="desktop_big flex-1 box-border bg-white rounded-xl min-h-[300px] h-fit p-6">
      <div className="desktop_head text-[24px] font-bold leading-8">
        <h1>Chỉnh sửa thông tin cá nhân</h1>
      </div>
      <div className="desktop_box mt-4">
        <div className="account_profile flex justify-between">
          <div className="account_info w-[395px] text-center">
            <div className="account_avatar mb-4">
              <div className="account_detail-photo">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  className="hidden"
                  id="avatar"
                />
                <figure className="w-[120px] h-[120px] bg-[#f2f6f3] rounded-[50%] !my-0 !mx-auto overflow-hidden flex justify-center items-center">
                  <i className="fa-solid fa-plus text-[34px] text-[#8e9aab]"></i>
                </figure>
                <label htmlFor="avatar">
                  <button className="text-[15px] font-normal leading-[22px] text-primaryColor underline bg-none mt-5">
                    Bấm để cập nhật ảnh mới
                  </button>
                </label>
              </div>
            </div>
          </div>

          <div className="account_detail w-[415px] ">
            <form action="#">
              <div>
                <div className="inputTextField">
                  <label
                    htmlFor="full_name"
                    className="text-[12px] leading-[18px]"
                  >
                    Họ và tên
                    <span className="ml-[3px] text-[#f33060]">*</span>
                  </label>
                  <div className="inputTextField_group">
                    <input
                      id="full_name"
                      type="text"
                      name="full_name"
                      maxLength="150"
                      placeholder="Vui lòng nhập họ tên"
                      autoComplete="on"
                      defaultValue="khach hang"
                      className="outline-none box-border bg-transparent py-[9px] border-b border-[#e5e5e5] text-[15px] w-full"
                    />
                  </div>
                </div>
              </div>

              <div className="account_detail-gender mt-4">
                <label htmlFor="" className="text-[12px]">
                  Giới tính
                </label>
                <div className="flex mt-[10px]">
                  <div className="radioButton box-border mb-0 text-[14px] mr-[60px]">
                    <input
                      type="radio"
                      name="gender"
                      id="nam"
                      className="mr-2"
                    />
                    <label htmlFor="nam">Nam</label>
                  </div>
                  <div className="radioButton box-border mb-0 text-[14px] mr-[60px]">
                    <input
                      type="radio"
                      name="gender"
                      id="nu"
                      className="mr-2"
                    />
                    <label htmlFor="nu">Nữ</label>
                  </div>
                  <div className="radioButton box-border mb-0 text-[14px]">
                    <input
                      type="radio"
                      name="gender"
                      id="khac"
                      className="mr-2"
                    />
                    <label htmlFor="khac">Khác</label>
                  </div>
                </div>
              </div>

              <div className="account_detail-birthday mt-4">
                <label htmlFor="" className="text-[12px]">
                  Ngày tháng năm sinh{" "}
                  <span className="ml-[3px] text-[#f33060]">*</span>
                </label>
                <div className="birthday_field border-b border-[#e5e5e5] mb-[10px]">
                  {
                    <DatePicker
                      onChange={setDate}
                      value={date}
                      className="w-full"
                    //   clearIcon
                    />
                  }
                </div>
              </div>

              <div className="account_detail-phone mt-4">
                <label htmlFor="" className="text-[12px]">
                  Số điện thoại
                  <span className="ml-[3px] text-[#f33060]">*</span>
                </label>
                <div>
                  <input
                    type="number"
                    name="phone_number"
                    value="0866554764"
                    disabled
                    className="outline-none box-border bg-transparent py-[9px] border-b border-[#e5e5e5] text-[15px] w-full"
                  />
                </div>
              </div>

              <div className="account_detail-email mt-4">
                <div>
                  <label htmlFor="" className="text-[12px]">
                    Email
                    <span className="ml-[3px] text-[#f33060]">*</span>
                  </label>
                  <div>
                    <input type="text" name="email" className="outline-none box-border bg-transparent py-[9px] border-b border-[#e5e5e5] text-[15px] w-full" />
                  </div>
                </div>
              </div>
              <button type="submit" className="border-none flex items-center rounded-xl w-full leading-[54px] text-[17px] text-center font-bold justify-center !bg-primaryColor text-white mt-5 mb-10">Lưu</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
