import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { useNavigate } from "react-router-dom";

export const ItemDeal = (props) => {
  const { all_products } = useContext(ShopContext);
  const navigate = useNavigate();

  const product = all_products.find((product) => product.idm === props.id);

  const handleNavigateProductDetail = (idProduct) => {
    navigate(`/products/${idProduct}`, { state: product });
  };
  return (
    <div className="relative p-2">
      <div
        onClick={() => handleNavigateProductDetail(props.id)}
        className="product-card"
      >
        <div className="h-full overflow-hidden rounded-lg border bg-white shadow-sm">
          <div className="product-card-image">
            <div className="relative">
              <img
                className="max-h-[100%] max-w-[100%] object-contain"
                src={props.image}
                alt="product"
                width="500"
                height="500"
              />
              <span className="absolute top-2 left-2 bg-red-400 py-[3px] px-[10px] text-[13px] font-bold text-white rounded-xl">
                {props.numSale}%
              </span>
              <div className="absolute bottom-0 left-0 flex h-[26px] w-full"></div>
            </div>
          </div>
          <div className="p-2 pb-1 font-medium">
            <div>
              <h3 className="line-clamp-2 h-10 text-sm font-semibold">
                {props.name}
              </h3>
            </div>
            <div className="my-1 items-center whitespace-nowrap">
              <del className="block h-5 text-sm font-semibold text-neutral-600">
                {props.sale < props.price && (
                  <div>{Number(props.price).toLocaleString("vi-VN")}đ</div>
                )}
              </del>
              <span className="mt-[2px] block h-6 text-base font-bold text-green-600">
                {Number(props.sale).toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
