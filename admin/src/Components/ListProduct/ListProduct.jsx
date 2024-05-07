/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { createPortal } from "react-dom";
import ProductDetail from "./ProductDetail";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allProducts");
    const data = await response.json();
    setAllProducts(data.products);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id) => {
    await fetch("http://localhost:4000/deleteProduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    await fetchInfo();
  };

  const handleUpdateProduct = (product) => {
    setProductToUpdate(product);
    setShow(true);
  };

  const handleShow = () => {
    setShow(true);
  };

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1>Các sản phẩm thuốc</h1>
      <div className="list_product-format-main">
        <p>Mã thuốc</p>
        <p>Thuốc</p>
        <p>Tên thuốc</p>
        <p>Loại thuốc</p>
        <p>Số lượng</p>
        <p>Giá</p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div className="list_product-allProduct">
        <hr />
        {allProducts.length > 0 &&
          allProducts
            .slice((current - 1) * pageSize, current * pageSize)
            .map((product, index) => {
              return (
                <div
                  key={index}
                  className="list_product-format-main list_product-format"
                >
                  <p>{product.id}</p>
                  <img
                    className="h-[80px] max-[800px]:h-[60px]"
                    src={product.image}
                    alt="thuoc"
                  />
                  <p className="product_name">{product.name}</p>
                  <p>{product.nametype}</p>
                  <p>{product.quantity}</p>
                  <p>{product.price}</p>

                  <button
                    onClick={() => {
                      handleShow();
                      setProductToUpdate(null);
                    }}
                    className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => handleUpdateProduct(product)}
                    className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white"
                  >
                    Chỉnh sửa
                  </button>
                  <button className="hover:text-primaryColor">
                    <i
                      // onClick={() => {
                      //   removeProduct(product.id);
                      // }}
                      className="fa-solid fa-trash cursor-pointer m-auto"
                    ></i>
                  </button>
                </div>
              );
            })}

        {
          <Pagination
            className="text-center"
            current={current}
            onChange={setCurrent}
            pageSize={pageSize}
            total={allProducts.length}
            responsive={true}
          />
        }
      </div>

      {show &&
        createPortal(
          <ProductDetail
            onClose={() => setShow(false)}
            productToUpdate={productToUpdate}
          />,
          document.body
        )}
    </div>
  );
};

export default ListProduct;
