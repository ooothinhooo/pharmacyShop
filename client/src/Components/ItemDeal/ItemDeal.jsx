import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

export const ItemDeal = (props) => {
  const { addToCart, all_products } = useContext(ShopContext);
  const navigate = useNavigate();

  const product = all_products.find((product) => product.id === props.id);

  const handleNavigateProductDetail = (idProduct) => {
    navigate(`/products/${idProduct}`, { state: product });
  };
  return (
    <div className="box-border h-auto">
      <div className="item p-2">
        <div className="product_item sale_link">
          <div onClick={() => handleNavigateProductDetail(props.id)}>
            <div className="sale_head relative">
              <img
                onClick={window.scroll(0, 0)}
                src={props.image}  
                alt="Sale 1"
              />
              <span className="absolute top-2 left-2 bg-red-400 py-[3px] px-[10px] text-[13px] font-bold text-white rounded-xl">
                {props.numSale}%
              </span>
            </div>
            <div className="sale_body px-3 py-2">
              <div className="sale_title">{props.name}</div>
              <div className="sale_old-price">{Number(props.price).toLocaleString("vi-VN")}đ</div>
              <div className="sale_discount-price">{Number(props.sale).toLocaleString("vi-VN")}đ</div>
            </div>
          </div>
          <button
            onClick={(e) => {
              addToCart(props.id);
            }}
            className="sale_add-cart"
          >
            Thêm giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};
