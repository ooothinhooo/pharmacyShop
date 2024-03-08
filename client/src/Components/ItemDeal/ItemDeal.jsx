import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

export const ItemDeal = (props) => {
  const { addToCart } = useContext(ShopContext);

  const onLinkMouseDown = (e) => {
    e.preventDefault();
  };
  return (
    <div className="box-border h-auto">
      <div className="item p-2">
        <Link
          onMouseDown={onLinkMouseDown}
          to={`/products/${props.id}`}
          className="product_item sale_link"
        >
          <div className="sale_head relative">
            <img onClick={window.scroll(0, 0)} src={props.image} alt="Sale 1" />
            <span className="absolute top-2 left-2 bg-red-400 py-[3px] px-[10px] text-[13px] font-bold text-white rounded-xl">{props.numSale}%</span>
          </div>
          <div className="sale_body p-3">
            <div className="sale_title">{props.name}</div>
            <div className="sale_old-price">{props.price}đ</div>
            <div className="sale_discount-price">{props.sale}đ</div>

            <button
              onClick={(e) => {
                addToCart(props.id);
                e.preventDefault();
              }}
              className="sale_add-cart"
            >
              Thêm giỏ hàng
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};
