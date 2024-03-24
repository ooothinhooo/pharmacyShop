import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Item } from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const NewProduct = () => {
  const { all_products } = useContext(ShopContext);

  // State to store sorted products
  const [sortedProducts, setSortedProducts] = useState([]);

  // Function to sort products by creation date (descending)
  const sortProductsByDate = (product) => {
    // Assuming the date property is named "createdAt"
    return product.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  // Load and sort products on component mount
  useEffect(() => {
    const sorted = sortProductsByDate(all_products.slice(0)); // Copy to avoid mutation
    setSortedProducts(sorted.slice(0, 20)); // Take the top 20 newest products
  }, [all_products]);

  console.log(sortedProducts);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "red" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "none", background: "green" }}
        onClick={onClick}
      />
    );
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        },
      },
    ],
  };
  return (
    <div className="">
      <div className="product_carousel">
        <div className="product_carousel-header py-1 mb-1 mt-5 p-4 m-3">
          <span className="product_carousel-title text-[24px] font-bold">
            Sản phẩm mới
          </span>
        </div>

        <div className="slider-container">
          <Slider {...settings}>
            {sortedProducts.map((product, i) => {
              return (
                <Item
                  key={i}
                  id={product.id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  sale={product.price * (1 - product.sale / 100)}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
