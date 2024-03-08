import React from "react";

export const HomeService = () => {
  return (
    <div>
      <div className="lazy_load">
        <div className="our_service relative bg-white">
          <div className="container w-full mx-auto px-[15px]">
            <div className="our_service-box flex flex-wrap justify-between py-[80px]">
              <div className="our_service-col w-[25%] max-w-[280px]">
                <a href="/#" className="no-underline">
                  <div className="our_service-item flex flex-wrap justify-between items-center">
                    <div className="our_service-icon">
                      <i className="fa-solid fa-truck-fast text-[40px] text-[#187733]"></i>
                    </div>
                    <div className="our_service-info text-left leading-[22px] min-h-[74px]">
                      <h3 className="uppercase font-bold mb-2 text-[17px] text-[#187733]">
                        MIỄN PHÍ VẬN CHUYỂN
                      </h3>
                      <p className="font-normal text-[15px] m-0 text-[#8e9aab] leading-[22px]">
                        <span>
                          Áp dụng cho đơn hàng <br></br> từ 300,000 đ
                        </span>
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="our_service-col w-[25%] max-w-[280px]">
                <a href="/#" className="no-underline">
                  <div className="our_service-item flex flex-wrap justify-between items-center">
                    <div className="our_service-icon">
                      <i className="fa-solid fa-file-invoice-dollar text-[40px] text-[#187733]"></i>
                    </div>
                    <div className="our_service-info text-left leading-[22px] min-h-[74px]">
                      <h3 className="uppercase font-bold mb-2 text-[17px] text-[#187733]">
                        100% thuốc chính hãng
                      </h3>
                      <p className="font-normal text-[15px] m-0 text-[#8e9aab] leading-[22px]">
                        Đủ thuốc chuẩn, chất lượng
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="our_service-col w-[25%] max-w-[280px]">
                <a href="/#" className="no-underline">
                  <div className="our_service-item flex flex-wrap justify-between items-center">
                    <div className="our_service-icon">
                      <i className="fa-solid fa-phone-volume text-[40px] text-[#187733]"></i>
                    </div>
                    <div className="our_service-info text-left leading-[22px] min-h-[74px]">
                      <h3 className="uppercase font-bold mb-2 text-[17px] text-[#187733]">
                        Tư vấn miễn phí
                      </h3>
                      <p className="font-normal text-[15px] m-0 text-[#8e9aab] leading-[22px]">
                        Tư vấn 24/7, nhiệt tình, tận tâm
                      </p>
                    </div>
                  </div>
                </a>
              </div>

              <div className="our_service-col w-[25%] max-w-[280px]">
                <a href="/#" className="no-underline">
                  <div className="our_service-item flex flex-wrap justify-between items-center">
                    <div className="our_service-icon">
                      <i className="fa-solid fa-mobile-screen-button text-[#187733] text-[40px]"></i>
                    </div>
                    <div className="our_service-info text-left leading-[22px] min-h-[74px]">
                      <h3 className="uppercase font-bold mb-2 text-[17px] text-[#187733]">
                        Tích luỹ điểm
                      </h3>
                      <p className="font-normal text-[15px] m-0 text-[#8e9aab] leading-[22px]">
                        Tích lũy điểm thưởng và sử dụng điểm cho mọi giao dịch
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            <form
              action=""
              className="our_service-register flex justify-center items-center pb-[50px]"
            >
              <p>
                Nhập <b>Email</b> để nhận thông tin khuyến mãi từ Pharmacity
              </p>

              <div className="our_service-register--input w-[30%] ml-[10%]">
                <div className="input-text">
                  <div className="input-group relative">
                    <span className="input-icon absolute top-[50%] -translate-y-1/2">
                      <i className="fa-regular fa-envelope text-[#8e9aab] text-[18px]"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email thường dùng"
                      className="pl-7 w-full outline-none box-border bg-transparent px-[9px] border-b border-[#e5e5e5] text-[15px] leading-[18px] rounded-none focus:border-[#187733]"
                    />
                  </div>
                </div>
              </div>
              <button className="our_service-btn bg-[#187733] border-0 ml-[10%] w-[180px] h-[54px] justify-center text-[#fff] text-[17px] py-2 px-5 outline-none items-center rounded">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
