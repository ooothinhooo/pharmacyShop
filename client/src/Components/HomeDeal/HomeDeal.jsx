import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import all_products from "../Assets/dataFake";
import { ItemDeal } from "../ItemDeal/ItemDeal";
export const HomeDeal = () => {
  // function Next(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block" }}
  //       onClick={onClick}
  //     />
  //   );
  // }

  // function Prev(props) {
  //   const { className, style, onClick } = props;
  //   return (
  //     <div
  //       className={className}
  //       style={{ ...style, display: "block" }}
  //       onClick={onClick}
  //     />
  //   );
  // }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    // nextArrow: <Next />,
    // prevArrow: <Prev />,
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
    <div className="deal my-[32px] py-[32px] bg-white">
      <div className="container">
        <div className="flash_sale px-[24px] pt-[24px] pb-[36px] bg-[#fff8f9]">
          <h1 className="text-[32px] font-bold text-[#c31731] mb-8">
            Săn deal chớp nhoáng
          </h1>

          <div className="deal-list slider-container">
            <Slider {...settings}>
              {all_products.map((product, i) => {
                return (
                  <ItemDeal
                    key={i}
                    MaSP={product.MaSP}
                    HinhAnh={product.HinhAnh}
                    TenThuoc={product.TenThuoc}
                    Gia={product.Gia}
                    GiaDeal={product.Gia}
                  />
                );
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
