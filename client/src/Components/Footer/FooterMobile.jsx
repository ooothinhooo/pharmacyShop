import React from "react";

export const FooterMobile = () => {
  return (
    <footer className="footer_mobile 1lg:hidden">
      <div className="flex items-center bg-primaryColor h-[74px]">
        <div className="container">
          <div className="flex items-center justify-between w-[100%] text-[#ccc]">
            <p>Hotline Đặt hàng (Miễn phí)</p>
            <p className="text-white">
              <i className="fa-solid fa-phone mr-2"></i>
              0866554764
            </p>
          </div>
        </div>
      </div>
      <div className="h-[100%] overflow-hidden">
        <div className="container">
          <div className="footer_mobile-about grid grid-cols-2 py-5 gap-5">
            <a
              title="Giới thiệu"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Giới thiệu</p>
            </a>
            <a
              title="Chính sách đổi trả"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Chính sách đổi trả</p>
            </a>
            <a
              title="Chính sách giao hàng"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Chính sách giao hàng</p>
            </a>
            <a
              title="Chính sách bảo mật"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Chính sách bảo mật</p>
            </a>
            <a
              title="Chính sách thanh toán"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Chính sách thanh toán</p>
            </a>
            <a
              title="Câu hỏi thường gặp"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Câu hỏi thường gặp</p>
            </a>

            <a
              title="Dược Phẩm"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Dược Phẩm</p>
            </a>
            <a
              title="Chăm sóc sức khoẻ"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Chăm sóc sức khoẻ</p>
            </a>
            <a
              title="Chăm sóc cá nhân"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Chăm sóc cá nhân</p>
            </a>
            <a
              title="Sản phẩm tiện lợi"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Chính sách bảo mật</p>
            </a>
            <a
              title="Thực phẩm chức năng"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Thực phẩm chức năng</p>
            </a>
            <a
              title="Mẹ và bé"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Mẹ và bé</p>
            </a>
            <a
              title="Chăm sóc sắc đẹp"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Chăm sóc sắc đẹp</p>
            </a>
            <a
              title="Thiết bị y tế"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="text-[#5e6f88] mb-5">Thiết bị y tế</p>
            </a>
          </div>
          <div className="footer_mocile-hyperlink flex justify-evenly">
            <a
              title="Giới thiệu"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="flex items-center text-black mb-5">
                <i className="fa-brands fa-facebook mr-[10px] text-blue-900 text-[20px]"></i>
                FaceBook
              </p>
            </a>

            <a
              title="Giới thiệu"
              target="_self"
              href="/404"
              className="footer_top-link"
            >
              <p className="flex items-center text-black">
                <i className="fa-brands fa-youtube mr-[10px] text-red-600 text-[20px]"></i>
                Youtube
              </p>
            </a>

            <a
              title="Giới thiệu"
              target="_self"
              href="/#"
              className="footer_top-link"
            >
              <p className="flex items-center text-black">
                <i className="fa-brands fa-tiktok mr-[10px] text-[20px]"></i>
                Tiktok
              </p>
            </a>
          </div>
          <div className="footer_mobile-moreInfo text-center mt-10 mb-20">
            <p className="text-[#5e6f88]">Công ty TNHHMTV TTNB</p>
            <p className="text-[#5e6f88] ">
              Trụ sở: xxxB CM, TTCM, Huyện CM, tỉnh AG
            </p>
            <p className="text-[#5e6f88] ">
              Điện thoại: 0866554764, Email: thientan2812@gmail.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
