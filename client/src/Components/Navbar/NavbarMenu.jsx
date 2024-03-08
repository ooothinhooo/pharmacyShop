import React from "react";
import { Link } from "react-router-dom";

export const NavbarMenu = () => {
  return (
    <div className="main-menu flex justify-between">
      <div className="cate-menu">
        <span className="root-cate">
          <div className="cursor-pointer">
            <Link to={"/duoc-pham"}>
              <strong className="cate-title">Dược Phẩm</strong>
            </Link>
          </div>
        </span>
      </div>

      <div className="cate-menu">
        <span className="root-cate">
          <div className="cursor-pointer">
            <Link to={"/cham-soc-suc-khoe"}>
              <strong className="cate-title">Chăm sóc sức khoẻ</strong>
            </Link>
          </div>
        </span>
      </div>

      <div className="cate-menu">
        <span className="root-cate">
          <div className="cursor-pointer">
            <Link to={"/cham-soc-ca-nhan"}>
              <strong className="cate-title">Chăm sóc cá nhân</strong>
            </Link>
          </div>
        </span>
      </div>

      <div className="cate-menu">
        <span className="root-cate">
          <div className="cursor-pointer">
            <Link to={"/san-pham-tien-loi"}>
              <strong className="cate-title">Sản phẩm tiện lợi</strong>
            </Link>
          </div>
        </span>
      </div>

      <div className="cate-menu">
        <span className="root-cate">
          <div className="cursor-pointer">
            <Link to={"/thuc-pham-chuc-nang"}>
              <strong className="cate-title">thực phẩm chức năng</strong>
            </Link>
          </div>
        </span>
      </div>

      <div className="cate-menu">
        <span className="root-cate">
          <div className="cursor-pointer">
            <Link to={"/me-va-be"}>
              <strong className="cate-title">Mẹ và Bé</strong>
            </Link>
          </div>
        </span>
      </div>

      <div className="cate-menu">
        <span className="root-cate">
          <div className="cursor-pointer">
            <Link to={"/cham-soc-nhan-sac"}>
              <strong className="cate-title ">Chăm sóc nhan sắc</strong>
            </Link>
          </div>
        </span>
      </div>

      <div className="cate-menu">
        <span className="root-cate">
          <div className="cursor-pointer">
            <Link to={"/Thiet-bi-y-te"}>
              <strong className="cate-title ">Thiết bị y tế</strong>
            </Link>
          </div>
        </span>
      </div>
    </div>
  );
};
