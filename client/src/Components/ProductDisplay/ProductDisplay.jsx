import React, { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";

export const ProductDisplay = (props) => {
  const { addToCart } = useContext(ShopContext);
  const { product } = props;
  return (
    <div>
      <div className="productDetail">
        <div className="productInfo bg-white pt-5">
          <div className="container flex">
            <div className="productInfo_left flex gap-[17px] pr-6 w-[45%]">
              <div className="productInfo_img-list flex flex-col gap-4">
                <img
                  src={product.image}
                  alt="productImg"
                  className="h-[95px] w-[95px] [box-shadow:1px_1px_1px_#ccc]"
                />
                <img
                  src={product.image}
                  alt="productImg"
                  className="h-[95px] w-[95px] [box-shadow:1px_1px_1px_#ccc]"
                />
                <img
                  src={product.image}
                  alt="productImg"
                  className="h-[95px] w-[95px] [box-shadow:1px_1px_1px_#ccc]"
                />
                <img
                  src={product.image}
                  alt="productImg"
                  className="h-[95px] w-[95px] [box-shadow:1px_1px_1px_#ccc] "
                />
              </div>
              <div className="productInfo_img-main">
                <img
                  src={product.image}
                  alt=""
                  className="w-[453px] [box-shadow:1px_1px_1px_#ccc]"
                />
              </div>
            </div>
            <div className="productInfo_right flex flex-col w-[55%]">
              <div className="productInfo_header">
                <div className="productInfo_name my-6">
                  <h1 className="font-bold text-[24px]">{product.name}</h1>
                </div>
              </div>
              <div className="productInfo_right-body pb-5">
                <div className="flex justify-between">
                  <div></div>
                  <p>Mã: {product.id}</p>
                </div>

                <div className="bg-[#eee] py--[5px] px-6 h-[fit-content] rounded-xl mt-3">
                  <div className="flex items-start flex-col">
                    {product.sale > 0 ? (
                      <>
                        <div className="text-green-600 text-[28px] font-bold mt-4 mr-5">
                          {(product.price * (1 - product.sale / 100)).toLocaleString("vi-VN")}đ
                        </div>
                        <div className="text-gray-400 line-through text-[18px] font-bold mr-5">
                          {Number(product.price).toLocaleString("vi-VN")}đ
                        </div>
                      </>
                    ) : (
                      <div className="text-green-600 text-[28px] font-bold mt-4 mr-5">
                        {Number(product.price).toLocaleString("vi-VN")}đ
                      </div>
                    )}
                  </div>
                  <div className="text-[12px] pb-4">
                    <div>Giá bao gồm cả thuế</div>
                    <div>
                      Phí vận chuyển và các chi phí khác (nếu có) sẽ được thể
                      hiện khi đặt hàng.
                    </div>
                  </div>
                </div>
                <div className="py-4">
                  <table className="w-full border-separate [border-spacing:0_10px]">
                    <tbody>
                      <tr className="text-left">
                        <th className="w-[30%] align-top">Danh mục:</th>
                        <td>{product.nametype}</td>
                      </tr>
                      <tr className="text-left">
                        <th className="w-[30%] align-top">
                          Quy cách đóng gói:
                        </th>
                        <td>{product.packaging}</td>
                      </tr>
                      <tr className="text-left">
                        <th className="w-[30%] align-top">công dụng:</th>
                        <td>{product.usage}</td>
                      </tr>
                      <tr className="text-left">
                        <th className="w-[30%] align-top">Liều lượng:</th>
                        <td>{product.dosage}</td>
                      </tr>

                      <tr className="text-left">
                        <th className="w-[30%] align-top">Tác dụng phụ:</th>
                        <td>{product.effect}</td>
                      </tr>
                      <tr className="text-left">
                        <th className="w-[30%] align-top">Mô tả ngắn:</th>
                        <td>{product.description}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="productInfo_body-right">
                  <button
                    onClick={() => {
                      addToCart(product.id);
                    }}
                    className="add-cart"
                  >
                    <i className="fa-solid fa-cart-shopping mr-3"></i>Thêm giỏ
                    hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="productInfo_typeOfShip bg-[#ddd] rounded my-3">
            <div className="container py-4">
              <h1 className="text-[20px] font-bold mb-3">
                Các hình thức giao hàng
              </h1>
              <div className="typeOfShip_list flex gap-[15px]">
                <div className="TypeOfShip_item bg-green-600 text-white p-2 rounded-lg">
                  Giao hàng tiết kiệm
                </div>
                <div className="TypeOfShip_item bg-green-600 text-white p-2 rounded-lg">
                  Ahamove
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="productDescription"></div>
      </div>
    </div>
  );
};
