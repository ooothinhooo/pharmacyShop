import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Item } from "../Item/Item";
import { ShopContext } from "../../Context/ShopContext";

const GoodProductForMAB = () => {
  const { all_products } = useContext(ShopContext);

  // State to store filtered products
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Define filterProducts function here
    const filterProducts = () => {
      const filtered = all_products.filter((product) => product.type_id === 6);
      const top15Products = filtered.slice(0, 15); // get 15 products
      setFilteredProducts(top15Products);
    };

    filterProducts(); // Call filterProducts on initial render
  }, [all_products]);

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
            Sản phẩm tốt cho Mẹ và Bé
          </span>
        </div>

        <div className="slider-container">
          <Slider {...settings}>
            {filteredProducts.map((product, i) => {
              return (
                <Item
                  key={i}
                  id={product.idm}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  sale={product.price * (1 - product.sale / 100)}
                  numSale={product.sale}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default GoodProductForMAB;
