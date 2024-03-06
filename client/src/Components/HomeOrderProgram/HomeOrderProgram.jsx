import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import all_products from "../Assets/dataFake";
import { Item } from "../Item/Item";

export const HomeOrderProgram = () => {
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
    <div className="bg-white container-wrapper">
      <div className="container">
        <div className="">
          <div className="product_carousel">
            <div className="product_carousel-header py-1 mb-1 mt-5 p-4 m-3">
              <span className="product_carousel-title text-[24px] font-bold">
                Sản phẩm bán chạy
              </span>
            </div>

            <div className="slider-container">
              <Slider {...settings}>
                {all_products.map((product, i) => {
                  return (
                    <Item
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

        <div className="">
          <div className="product_carousel">
            <div className="product_carousel-header py-1 mb-1 mt-5 p-4 m-3">
              <span className="product_carousel-title text-[24px] font-bold">
                Chăm sóc sức khỏe mẹ bầu
              </span>
            </div>

            <div className="slider-container">
              <Slider {...settings}>
                {all_products.map((product, i) => {
                  return (
                    <Item
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

        <div className="">
          <div className="product_carousel">
            <div className="product_carousel-header py-1 mb-1 mt-5 p-4 m-3">
              <span className="product_carousel-title text-[24px] font-bold">
                Sản phẩm không thể thiếu ngày Tết
              </span>
            </div>

            <div className="slider-container">
              <Slider {...settings}>
                {all_products.map((product, i) => {
                  return (
                    <Item
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

        <div className="">
          <div className="product_carousel">
            <div className="product_carousel-header py-1 mb-1 mt-5 p-4 m-3">
              <span className="product_carousel-title text-[24px] font-bold">
                Tủ thuốc gia đình - Giao nhanh 2H
              </span>
            </div>

            <div className="slider-container">
              <Slider {...settings}>
                {all_products.map((product, i) => {
                  return (
                    <Item
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

        <div className="">
          <div className="product_carousel">
            <div className="product_carousel-header py-1 mb-1 mt-5 p-4 m-3">
              <span className="product_carousel-title text-[24px] font-bold">
                Thêm lựa chọn mới tại Pharma Shop
              </span>
            </div>

            <div className="slider-container">
              <Slider {...settings}>
                {all_products.map((product, i) => {
                  return (
                    <Item
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
    </div>
  );
};
