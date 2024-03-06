import React, { useEffect, useState } from "react";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allProducts");
    // .then((res) => res.json())
    // .then((data) => {
    //   setAllProducts(data);
    // });
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

  return (
    <div className="list_product flex flex-col items-center w-full h-[720px] py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1>Các sản phẩm thuốc</h1>
      <div className="list_product-format-main">
        <p>Mã thuốc</p>
        <p>Thuốc</p>
        <p>Tên thuốc</p>
        <p>Loại thuốc</p>
        <p>Số lượng</p>
        <p>Giá</p>
        <p></p>
      </div>
      <div className="list_product-allProduct">
        <hr />
        {allProducts.length > 0 &&
          allProducts.map((product, index) => {
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
                <p>{product.name}</p>
                <p>{product.nametype}</p>
                <p>{product.quantity}</p>
                <p>{product.price}</p>
                <button>
                  <i onClick={() => {removeProduct(product.id)}} className="fa-solid fa-trash cursor-pointer m-auto"></i>
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ListProduct;
