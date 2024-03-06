import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

export const ItemDeal = (props) => {
  const { addToCart } = useContext(ShopContext);

  const onLinkMouseDown = (e) => {
    e.preventDefault();
  };
  return (
    <div className="box-border h-auto">
      <div className="item p-2">
        <a
          onMouseDown={onLinkMouseDown}
          href={`/products/${props.MaSP}`}
          className="product_item sale_link"
        >
          <div className="sale_head relative">
            <img onClick={window.scroll(0, 0)} src={props.HinhAnh} alt="Sale 1" />
          </div>
          <div className="sale_body p-3">
            <div className="sale_title">{props.TenThuoc}</div>
            <div className="sale_old-price">{props.Gia}đ</div>
            <div className="sale_discount-price">{props.GiaDeal}đ</div>

            <button
              onClick={(e) => {
                addToCart(props.MaSP);
                e.preventDefault();
              }}
              className="sale_add-cart"
            >
              Thêm giỏ hàng
            </button>
          </div>
        </a>
      </div>
    </div>
  );
};
