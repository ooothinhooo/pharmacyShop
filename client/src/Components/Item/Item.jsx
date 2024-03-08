  import React, { useContext } from "react";
  import { ShopContext } from "../../Context/ShopContext";
  import { Link } from "react-router-dom";

  export const Item = (props) => {
    const { addToCart } = useContext(ShopContext);


    return (
      <div className="box-border h-auto"> 
        <div className="item p-2">
          <Link
            to={`/products/${props.id}`}
            className="product_item relative box-border w-full h-full bg-white block [box-shadow:0_0_12px_rgba(11,14,20,.12)] p-0 pointer-events-auto"
          >
            <div className="sale_head relative">
              <img
                onClick={window.scroll(0, 0)}
                src={props.image}
                alt="Sale 1"
              />
            </div>
            <div className="sale_body p-3">
              <div className="sale_title">{props.name}</div>
              <div className="sale_old-price">{props.price}</div>
              <div className="sale_discount-price">{props.sale}</div>

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
          </Link>
        </div>
      </div>
    );
  };
