import React from "react";
import { Link } from "react-router-dom";

export const Page404 = () => {
  return (
    <div className="bg-white">
      <div className="py-14">
        <div className="four_zero_four_bg">
          <h1 className="text-center text-[80px]">404</h1>
        </div>

        <div className="text-center">
          <p className="text-[30px] font-bold">Không tìm thấy trang</p>
          <p>
            Thật không may, địa chỉ URL bạn yêu cầu không được tìm thấy. Thử tìm
            kiếm lại kết quả khác.
          </p>
          <button className="my-5 bg-primaryColor h-14 text-white w-[330px] rounded-lg font-bold text-[18px] border-none">
            <Link to="/">Quay lại trang chủ</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
