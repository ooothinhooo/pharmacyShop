import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

export const Item = (props) => {
  const { addToCart, all_products } = useContext(ShopContext);
  const product = all_products.find((product) => product.id === props.id);

  const navigate = useNavigate();
  const handleNavigateProductDetail = (idProduct) => {
    navigate(`/products/${idProduct}`, { state: product });
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
  }

  return (
    <div className="box-border h-auto">
      <div className="item p-2">
        <div className="product_item relative w-full h-full box-border bg-white block [box-shadow:0_0_12px_rgba(11,14,20,.12)] p-0 pointer-events-auto">
          <div onClick={() => handleNavigateProductDetail(props.id)} onMouseDown={handleMouseDown}>
            <div className="sale_head relative">
              <img onClick={window.scroll(0, 0)} src={props.image} alt="Sale 1" />
            </div>
            <div className="sale_body p-3">
              <div className="sale_title">{props.name}</div>
              {props.sale < props.price ? (
                <>
                  <div className="sale_old-price">
                    {Number(props.price).toLocaleString("vi-VN")}đ
                  </div>
                  <div className="sale_discount-price">{Number(props.sale).toLocaleString("vi-VN")}đ</div>
                </>
              ) : <div className="sale_discount-price">{Number(props.price).toLocaleString("vi-VN")}đ</div>}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(props.id);
            }}
            className="add-cart"
          >
            Thêm giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};
