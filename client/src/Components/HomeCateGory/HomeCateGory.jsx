import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DP from "../Assets/Duoc_Pham.png";
import CSSK from "../Assets/Cham_Soc_SK.png";
import CSCN from "../Assets/Cham_Soc_Ca_Nhan.png";
import SPTL from "../Assets/SP_Tien_Loi.png";
import TPCN from "../Assets/Thuc_Pham_Chuc_Nang.png";
import MVB from "../Assets/Me_Be.png";
import CSSD from "../Assets/Cham_Soc_Sac_Dep.png";
import TBYT from "../Assets/TB_YT.png";
import { useNavigate } from "react-router-dom";

export const HomeCateGory = () => {
  const navigate = useNavigate();

  const handleNavagiteToUserProfile = (href) => {
    navigate(href);
  };
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1240,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
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
        },
      },
      // {
      //   breakpoint: 480,
      //   settings: {
      //     slidesToShow: 1,
      //     slidesToScroll: 1,
      //   },
      // },
    ],
  };

  return (
    <div className="category py-8 bg-white">
      <div className="container">
        <div className="category-list relative">
          <div className="category-header flex justify-between">
            <p className="text-[18px] font-bold py-[24px]">Danh mục sản phẩm</p>
          </div>
          <div className="slider-container">
            <Slider {...settings}>
              <div>
                <div>
                  <div onClick={() => handleNavagiteToUserProfile('/duoc-pham')}>
                    <img
                      src={DP}
                      alt="Dược Phẩm"
                      className="mb-[20px] max-w-[120px] mx-auto"
                    />
                    <p className="text-[15px] text-center">Dược Phẩm</p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div onClick={() => handleNavagiteToUserProfile('/cham-soc-suc-khoe')}>
                    <img
                      src={CSSK}
                      alt="Chăm sóc sữc khoẻ"
                      className="mb-[20px] max-w-[120px] mx-auto"
                    />
                    <p className="text-[15px] text-center">Chăm sóc sữc khoẻ</p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div onClick={() => handleNavagiteToUserProfile("/cham-soc-ca-nhan")}>
                    <img
                      src={CSCN}
                      alt="Chăm sóc cá nhân"
                      className="mb-[20px] max-w-[120px] mx-auto"
                    />
                    <p className="text-[15px] text-center">Chăm sóc cá nhân</p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div onClick={() => handleNavagiteToUserProfile("/san-pham-tien-loi")}>
                    <img
                      src={SPTL}
                      alt="Sản phẩm tiện lợi"
                      className="mb-[20px] max-w-[120px] mx-auto"
                    />
                    <p className="text-[15px] text-center">Sản phẩm tiện lợi</p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <a
                    href={"/thuc-pham-chuc-nang"}
                  
                  >
                    <img
                      src={TPCN}
                      alt="Thực phẩm chức năng"
                      className="mb-[20px] max-w-[120px] mx-auto"
                    />
                    <p className="text-[15px] text-center">
                      Thực phẩm chức năng
                    </p>
                  </a>
                </div>
              </div>
              <div>
                <div>
                  <div onClick={() => handleNavagiteToUserProfile("/Me-va-Be")}>
                    <img
                      src={MVB}
                      alt="Mẹ và Bé"
                      className="mb-[20px] max-w-[120px] mx-auto"
                    />
                    <p className="text-[15px] text-center">Mẹ và Bé</p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div onClick={() => handleNavagiteToUserProfile("/cham-soc-nhan-sac")}>
                    <img
                      src={CSSD}
                      alt="Chăm sóc sắc đẹp"
                      className="mb-[20px] max-w-[120px] mx-auto"
                    />
                    <p className="text-[15px] text-center">Chăm sóc nhan sắc</p>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div onClick={() => handleNavagiteToUserProfile("/Thiet-bi-y-te")}>
                    <img
                      src={TBYT}
                      alt="Thiết bị Y tế"
                      className="mb-[20px] max-w-[120px] mx-auto"
                    />
                    <p className="text-[15px] text-center">Thiết bị Y tế</p>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
