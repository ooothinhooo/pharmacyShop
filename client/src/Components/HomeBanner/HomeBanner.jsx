import React from "react";
import { Link } from "react-router-dom";
import img1 from "../Assets/boncachimage1.png";
import img2 from "../Assets/d2-5.png";
import img3 from "../Assets/d2-5.png";

export const HomeBanner = () => {
  return (
    <div className="mt-8">
      <div className="bg-[#f2f6fe]">
        <div className="container">
          <div className="banner-body flex gap-10 justify-center py-[26px]">
            <div className="banner-graphic flex gap-5 self-start">
              <img src={img1} alt="step 1" className="w-[214px]" />
              <img src={img2} alt="step 1" className="w-[214px]" />
              <img src={img3} alt="step 1" className="w-[214px]" />
            </div>
            <div className="banner_cta flex flex-col items-center justify-center">
              <div className="banner_cta-title text-[26px] text-center font-bold mb-[24px] text-[#187733] [text-shadow:0px_5px_20px_rgba(81,67,21,0.5)]">
                Mua thuốc thuận tiện hơn tại Pharma Shop
              </div>
              <Link to={"/login"}>
                <div className="flex">
                  <button className="banner_cta-btn bg-[#187733] text-white px-6 py-2 rounded-md hover:opacity-80 [transition:all_0.25s_linear]">
                    Đặt thuốc ngay
                  </button>
                </div>
              </Link>
              <div className="banner_cta-group 1lg:block text-[14px] mt-4">
                <Link
                  to={"https://www.facebook.com/thientan2528/"}
                  className="decoration-lime-500 text-lime-500 underline mr-1"
                >
                  Chat Ngay
                </Link>
                Hoặc gọi hotline
                <Link
                  to={"tel: 0866554764"}
                  className="ml-1 underline text-lime-500 decoration-lime-500"
                >
                  0866554764
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="banner_footer h-auto flex items-center text-[14px] bg-[linear-gradient(180deg,#bfffc2,rgba(208,226,255,.1))]">
          <div className="container flex justify-center">
            <div className="banner_footer-content flex w-full max-w-[1050px] items-center justify-between">
              <div className="banner_footer-item flex items-center">
                <i className="fa-solid fa-phone-volume w-5 text-[#19a305]"></i>
                <span className="ml-2">Dược sĩ tư vấn miễn phí</span>
              </div>
              <div className="xl:block divider"></div>

              <div className="banner_footer-item flex items-center">
              <i className="fa-solid fa-capsules text-[#19a305]"></i>
                <span className="ml-2">Thuốc tốt giá rẻ</span>
              </div>
              <div className="xl:block divider"></div>

              <div className="banner_footer-item flex items-center">
              <i className="fa-solid fa-file-invoice-dollar text-[#19a305]"></i>
                <span className="ml-2">100% thuốc chính hãng</span>
              </div>
              <div className="xl:block divider"></div>

              <div className="banner_footer-item flex items-center">
              <i className="fa-solid fa-heart text-[#19a305]"></i>
                <span className="ml-2">Đủ thuốc đúng chuẩn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
