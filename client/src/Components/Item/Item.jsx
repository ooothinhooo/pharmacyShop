import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

export const Item = (props) => {
  const { addToCart } = useContext(ShopContext);

  const onLinkMouseDown = (e) => {
    e.preventDefault();
  };
  return (
    <div className="box-border h-auto">
      <div className="item p-2">
        <Link
          to={`/products/${props.MaSP}`}
          onMouseDown={onLinkMouseDown}
          className="product_item relative box-border w-full h-full bg-white block [box-shadow:0_0_12px_rgba(11,14,20,.12)] p-0 pointer-events-auto"
        >
          <div className="sale_head relative">
            <img onClick={window.scroll(0, 0)} src={props.HinhAnh} alt="Sale 1" />
          </div>
          <div className="sale_body p-3">
            <div className="sale_title">{props.TenThuoc}</div>
            <div className="sale_old-price">{props.Gia}</div>
            <div className="sale_discount-price">{props.GiaDeal}</div>

            <button
              onClick={(e) => {
                e.preventDefault();
                addToCart(props.MaSP);
              }}
              className="add-cart"
            >
              Thêm giỏ hàng
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};
