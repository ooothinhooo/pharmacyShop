import React, { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Collapse, Pagination } from "antd";
import { Item } from "../Components/Item/Item";
import { Link } from "react-router-dom";
import slugify from "slugify";

export const PharmaCategory = (props) => {
  const [current, setCurrent] = useState(1);
  const pageSize = 12;
  // get all products
  const { all_products } = useContext(ShopContext);

  // filter products by category
  const filteredProducts = all_products.map((product) => {
    return product.nametype;
  });

  const uniqueCategories = [...new Set(filteredProducts)];

  console.log(uniqueCategories);

  const items = [
    {
      key: "1",
      label: "Danh Mục",
      children: uniqueCategories.map((category, index) => {
        const slug = slugify(category, { lower: true });
        return (
          <div key={index} className="py-[6px]">
            <Link to={`/${slug}`}>{category}</Link>
          </div>
        );
      }),
    },
  ];

  const categoryCurrent = [];
  all_products.map((product) => {
    if (product.nametype === props.category) {
      categoryCurrent.push(product);
    }
    return null;
  });

  console.log(
    categoryCurrent
      .slice((current - 1) * pageSize, current * pageSize)
      .map((product, i) => {
        return product;
      })
  );

  const [showPrice, setShowPrice] = useState(false);

  const handleShowPrice = () => {
    setShowPrice(true);
  };

  const handleBlurShowPrice = () => {
    setShowPrice(false);
  };

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="category_page bg-white">
      <div className="category_header relative z-10">
        <div className="category_header-title bg-[#f2fef3]">
          <div className="container">
            <div className="category_header-title-box py-[32px]">
              <h1 className="text-[32px] font-bold leading-9 text-[#11501c]">
                {props.title}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="category_body">
        <div className="container">
          <div className="category_body-box flex justify-between">
            <div className="hidden lg:block category_body-aside w-[260px] border-r border-r-[#e5e5e5] pr-[15px] ">
              {/* <div className="category_aside-title">
                <h3>Danh mục</h3>
              </div> */}
              <div className="category_aside-box overflow-hidden h-auto mt-5">
                <Collapse
                  defaultActiveKey={["1"]}
                  onChange={onChange}
                  expandIconPosition="end"
                  items={items}
                />
              </div>
            </div>
            <div className="category_body-product !w-full">
              <div className="category_product-head relative mt-5 z-20 pl-3">
                <div className="flex mb-5 relative justify-between items-center ">
                  <div className="!flex">
                    <div className="relative mr-3 inline-block">
                      <button
                        className="flex items-center text-white box-border rounded-md bg-green-600 focus:bg-green-700 hover:bg-green-700 py-[5px] px-[12px]"
                        onClick={handleShowPrice}
                        onBlur={handleBlurShowPrice}
                      >
                        <h3 className="mr-3">Giá</h3>
                        <i className="fa-solid fa-chevron-down"></i>
                      </button>

                      <div
                        className={`absolute left-[10px] top-[45px] w-[570px] flex items-center bg-white transition rounded-xl [box-shadow:0_0_16px_rgba(0,0,0,.2)] ${
                          showPrice
                            ? "visible opacity-100 translate-y-0"
                            : "hidden opacity-0 translate-y-[10px]"
                        }`}
                      >
                        <div className="category_body-product-box flex-grow py-6 px-5 relative flex justify-between items-center">
                          <div className="category_body-product-box-item text-[14px] font-normal leading-6 bg-[#f2fef3] rounded-xl py-1 px-2 cursor-pointer hover:scale-105 hover:transition">
                            <p>0 - 100.000</p>
                          </div>

                          <div className="category_body-product-box-item text-[14px] font-normal leading-6 bg-[#f2fef3] rounded-xl py-1 px-2 cursor-pointer hover:scale-105 hover:transition">
                            <p>100.000 - 500.000</p>
                          </div>

                          <div className="category_body-product-box-item text-[14px] font-normal leading-6 bg-[#f2fef3] rounded-xl py-1 px-2 cursor-pointer hover:scale-105 hover:transition">
                            <p>500.000 - 1 triệu</p>
                          </div>

                          <div className="category_body-product-box-item text-[14px] font-normal leading-6 bg-[#f2fef3] rounded-xl py-1 px-2 cursor-pointer hover:scale-105 hover:transition">
                            <p>Trên 1 triệu</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="lg:hidden absolute right-0 top-0 category_aside-box overflow-hidden h-auto">
                    <Collapse
                      defaultActiveKey={["1"]}
                      onChange={onChange}
                      expandIconPosition="end"
                      items={items}
                    />
                  </div>
                </div>
              </div>

              <div className="category_product-body mt-5 mb-10 relative z-10  grid gap-4 xl:grid-cols-4  md:grid-cols-3 md:gap-2 sm:grid-cols-2">
                {categoryCurrent
                  .slice((current - 1) * pageSize, current * pageSize)
                  .map((product, i) => {
                    return (
                      <Item
                        key={i}
                        id={product.idm}
                        image={product.image}
                        name={product.name}
                        price={product.price}
                        sale={
                          product.price - (product.price * product.sale) / 100
                        }
                        numSale={product.sale}
                      />
                    );
                  })}
              </div>
              {
                <Pagination
                  className="text-center"
                  current={current}
                  onChange={setCurrent}
                  pageSize={pageSize}
                  total={categoryCurrent.length}
                  responsive={true}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
