import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

export const CartItemHasProduct = () => {
  const {
    all_products,
    cartItems,
    removeFromCart,
    getTotalCartAmountWithsale,
  } = useContext(ShopContext);
  return (
    <div className="bg-[#f0f2f5]">
      <div className="container py-4 flex justify-between">
        <div className="cart_items bg-white w-[67%] rounded-xl">
          <div className="p-6">
            <div className="grid grid-cols-[1fr_4fr_1fr_1fr_1fr_1fr] mb-5 gap-[10px] w-[100%] text-left">
              <p className="text-left">Sản Phẩm</p>
              <p>Tên sản phẩm</p>
              <p>Đơn giá</p>
              <p>Số lượng</p>
              <p>Thành tiền</p>
              <p></p>
            </div>

            <div>
              <hr />
              {all_products.map((e, i) => {
                if (cartItems[e.id] > 0) {
                  return (
                    <div
                      className="w-full py-5 grid grid-cols-[1fr_4fr_1fr_1fr_1fr_1fr] gap-[10px] items-center"
                      key={i}
                    >
                      <Link to={`/products/${e.id}`}>
                        <img src={e.image} alt="" className="w-[72px]" />
                      </Link>

                      <Link to={`/products/${e.id}`}>
                        <p className="text-left product_name">{e.name}</p>
                      </Link>

                      <p>
                        {(e.price * (1 - e.sale / 100)).toLocaleString("vi-VN")}
                        đ
                      </p>

                      <p>
                        <button className="cartItem_quantity w-[64px] h-[50px] border border-[#ebebeb] bg-white">
                          {cartItems[e.id]}
                        </button>
                      </p>

                      <p>
                        {(
                          e.price *
                          (1 - e.sale / 100) *
                          cartItems[e.id]
                        ).toLocaleString("vi-VN")}
                        đ
                      </p>

                      <p
                        className="text-center"
                        onClick={() => {
                          removeFromCart(e.id);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>

        <div className="cart_total w-[31%] sticky top-[127px] h-[330px]">
          <div className="bg-white p-6 rounded-xl box-border">
            <div className="total_header text-[24px] font-bold leading-[32px] mb-[22px] color-[primaryColor]">
              Tổng Tiền
            </div>
            <div className="total_content">
              <div className="flex justify-between mb-[24px]">
                <span>Tạm tính </span>
                <p className="m-0 text-red-500">
                  <b>
                    {getTotalCartAmountWithsale().toLocaleString("vi-VN")} đ
                  </b>
                </p>
              </div>
            </div>
            <div className="total_footer flex flex-col items-center relative flex-wrap">
              <button className="text-[14px] font-medium max-w-[156px] border border-primaryColor bg-[#f4fef2] text-primaryColor min-h-[54px] w-[100%] rounded-xl p-1">
                <Link to="/">Mua Thêm</Link>
              </button>
              <span className="text-[#aaa] mt-3">Hoặc</span>
              <button className="text-white bg-[#feaa48] rounded-xl min-h-[54px] p-1 flex-1 w-[100%] mt-3">
                <p>
                  <b className="text-[17px]">
                    <Link to="/checkout">Đặt hàng</Link>
                  </b>
                  <i className="fa-solid fa-chevron-right ml-1 w-[16px]"></i>
                </p>
                <span className="text-[14px]">
                  Giao tận nơi hoặc nhận tại nhà thuốc
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
