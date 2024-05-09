/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Pagination, Modal } from "antd";
import { createPortal } from "react-dom";
import ProductDetail from "./ProductDetail";
import { useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../util/Toast/Toast";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
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

  // const removeProduct = async (id) => {
  //   await fetch("http://localhost:4000/deleteProduct", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ id: id }),
  //   });

  //   await fetchInfo();
  // };

  const handleUpdateProduct = (product) => {
    setProductToUpdate(product);
    setShow(true);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleDeleteProduct = useCallback(async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/deleteProduct",
        { id: id },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        await fetchInfo();
        toast.success(`Sản phẩm ${id} đã được xóa!`);
      } else {
        toast.error(`Xóa sản phẩm ${id} thất bại`);
      }
    } catch (error) {
      console.error("Xóa sản phẩm thất bại:", error.message);
      toast.error(`Xóa sản phẩm ${id} thất bại`);
    } finally {
      setProductToDelete(null);
    }
  }, []);

  useEffect(() => {
    if (productToDelete !== null) {
      Modal.confirm({
        title: "Xác nhận xóa",
        content: "Bạn có chắc muốn xóa account này không?",
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk() {
          handleDeleteProduct(productToDelete);
        },
      });
    }
  }, [productToDelete, handleDeleteProduct]);

  const confirmDelete = (productId) => {
    setProductToDelete(productId);
  };

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1 className="uppercase text-[28px] font-semibold m-5">
        Các sản phẩm thuốc
      </h1>
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
            .sort((a, b) => a.idm - b.idm)
            .slice((current - 1) * pageSize, current * pageSize)
            .map((product, index) => {
              return (
                <div
                  key={index}
                  className="list_product-format-main list_product-format"
                >
                  <p>{product.idm}</p>
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
                      setProductDetail(product);
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
                      onClick={() => {
                        confirmDelete(product.idm);
                      }}
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
            productDetail={productDetail}
            fetchInfo={fetchInfo}
          />,
          document.body
        )}
      <Toast />
    </div>
  );
};

export default ListProduct;
