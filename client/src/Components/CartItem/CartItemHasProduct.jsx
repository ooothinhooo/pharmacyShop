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
            <table className="w-[100%] text-left">
              <thead>
                <tr>
                  <th className="text-left">Sản Phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th></th>
                </tr>
              </thead>
              {all_products.map((e, i) => {
                if (cartItems[e.id] > 0) {
                  return (
                    <tbody key={i}>
                      <tr>
                        <td>
                          <Link to={`/products/${e.id}`}>
                            <img src={e.image} alt="" className="w-[72px]" />
                          </Link>
                        </td>
                        <td>
                          <p className="text-left">{e.name}</p>
                        </td>
                        <td>
                          <Link to={`/products/${e.id}`}>
                            <p>{e.price * (1 - e.sale / 100)}đ</p>
                          </Link>
                        </td>
                        <td>
                          <button className="cartItem_quantity w-[64px] h-[50px] border border-[#ebebeb] bg-white">
                            {cartItems[e.id]}
                          </button>
                        </td>
                        <td>
                          <p>{(e.price * (1 - e.sale/100)) * cartItems[e.id]}đ</p>
                        </td>
                        <td>
                          <p
                            onClick={() => {
                              removeFromCart(e.id);
                            }}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  );
                }
                return null;
              })}
            </table>
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
                  <b>{getTotalCartAmountWithsale()} đ</b>
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
