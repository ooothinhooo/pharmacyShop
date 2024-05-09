import React from "react";
import avatar from "../Assets/user.png";
import silverCard from "../Assets/silver-card.png";
import silverRank from "../Assets/silver-rank.png";
import goldRank from "../Assets/gold-rank.png";
import { useNavigate } from "react-router-dom";
// import { ShopContext } from "../../Context/ShopContext";

export const AccountSmall = (props) => {
  // const { userData } = useContext(ShopContext);
  const { userData, addressData } = props;
  const navigate = useNavigate();
  console.log(userData);

  const handleNavigate = (href) => {
    navigate(href, { state: { userData, addressData } });
  };

  return (
    <div className="desktop_small flex-[0_0_288px]">
      <div className="account_menu min-w-[288px]">
        <div className="account_menu-head bg-[#c0c0c0] text-white rounded-t-xl mx-auto flex flex-col justify-between p-5 items-center">
          <div className="account_avatarAndName">
            <img
              src={userData?.avatar ? userData.avatar : avatar}
              alt="avatar"
              className="mx-auto rounded-full w-[100px] h-[100px] object-cover object-center"
            />
            <div className="text-[24px] font-bold leading-normal pt-[3px] pb-2 mb-[2px]">
              {userData.namecus ? userData.namecus : "Khách hàng"}
            </div>
          </div>
          <div
            className="cardMember rounded-xl h-[180px] w-full bg-cover"
            style={{ backgroundImage: `url(${silverCard})` }}
          >
            <div className="carMember_container flex flex-col flex-grow h-full">
              <div className="cardMember_content p-4 flex flex-1 flex-col">
                <div className="carMember_content-head flex-grow flex">
                  <img
                    src={silverRank}
                    className="w-[48px] h-[48px]"
                    alt="rank"
                  />
                  <div className="infoRank ml-3">
                    {/* <div className="cardLabel bg-[#c0c0c0] text-[12px] rounded border border-white text-center py-[2px] uppercase px-[10px] w-fit">
                      Hạng
                    </div> */}
                    <div className="cardRank text-[20px] text-black uppercase mt-[2px] font-bold">
                      Bạc
                    </div>
                  </div>
                </div>
                <div className="cardMember_progress">
                  <div className="progress_percent text-[14px]"></div>
                  <div className="flex items-center">
                    <div className="progress_container flex-1 h-2 rounded-[20px] bg-white relative [box-shadow:0px_1px_2px_0px_rgba(0,0,0,0.5)]">
                      <div className="absolute left-0 h-full rounded-[20px] max-w-full bg-[#c0c0c0] w-[20%]"></div>
                    </div>
                    <div className="progress_icon flex ml-[5px]">
                      <img
                        src={goldRank}
                        alt="next rank"
                        className="w-[16px] h-[16px]"
                      />
                    </div>
                  </div>
                  <div className="progress_description text-black mt-2 text-[12px]">
                    <div className="flex">
                      <div>
                        Chi tiêu thêm
                        <b> 800.000 đ </b>
                        để được thăng hạng
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="cardMember_footer bg-[#ededed] rounded-b-xl py-[7px] px-4">
                <span className="flex text-[12px] text-black whitespace-break-spaces">
                  <img src={rewardPoint} alt="point" />
                  <b> 0 </b>
                  xu
                </span>
              </div> */}
            </div>
          </div>
        </div>

        <div className="account_menu-box bg-white pb-5 rounded-b-xl">
          <ul className="list-none m-0 p-0 overflow-hidden">
            <div
              onClick={() => handleNavigate("/account/orders")}
              className="block no-underline"
            >
              <li className="flex justify-between items-center h-16 px-6 hover:bg-[#f4fef2]">
                <figure className="w-6 h-6 mr-2">
                  <svg
                    stroke="#333333"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M2 13H5.76C6.52 13 7.21 13.43 7.55 14.11L8.44 15.9C9 17 10 17 10.24 17H13.77C14.53 17 15.22 16.57 15.56 15.89L16.45 14.1C16.79 13.42 17.48 12.99 18.24 12.99H21.98"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6 7L18 7"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 10L15 10"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </figure>
                <h3 className="text-[14px] leading-6 font-normal mr-auto">
                  Lịch sử nhận hàng
                </h3>
                <button>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </div>

            <div
              onClick={() => handleNavigate("/account/coupon")}
              className="block no-underline"
            >
              <li className="flex justify-between items-center h-16 px-6 hover:bg-[#f4fef2]">
                <figure className="w-6 h-6 mr-2">
                  <svg
                    stroke="#333333"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M2 13H5.76C6.52 13 7.21 13.43 7.55 14.11L8.44 15.9C9 17 10 17 10.24 17H13.77C14.53 17 15.22 16.57 15.56 15.89L16.45 14.1C16.79 13.42 17.48 12.99 18.24 12.99H21.98"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6 7L18 7"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 10L15 10"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </figure>
                <h3 className="text-[14px] leading-6 font-normal mr-auto">
                  Mã giảm giá
                </h3>
                <button>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </div>

            <div
              onClick={() => handleNavigate("/account")}
              className="block no-underline"
            >
              <li className="flex justify-between items-center h-16 px-6 hover:bg-[#f4fef2]">
                <figure className="w-6 h-6 mr-2">
                  <svg
                    stroke="#333333"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M2 13H5.76C6.52 13 7.21 13.43 7.55 14.11L8.44 15.9C9 17 10 17 10.24 17H13.77C14.53 17 15.22 16.57 15.56 15.89L16.45 14.1C16.79 13.42 17.48 12.99 18.24 12.99H21.98"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6 7L18 7"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 10L15 10"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </figure>
                <h3 className="text-[14px] leading-6 font-normal mr-auto">
                  Chỉnh sửa thông tin cá nhân
                </h3>
                <button>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </div>

            <div
              onClick={() => handleNavigate("/account/address")}
              className="block no-underline"
            >
              <li className="flex justify-between items-center h-16 px-6 hover:bg-[#f4fef2]">
                <figure className="w-6 h-6 mr-2">
                  <svg
                    stroke="#333333"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M2 13H5.76C6.52 13 7.21 13.43 7.55 14.11L8.44 15.9C9 17 10 17 10.24 17H13.77C14.53 17 15.22 16.57 15.56 15.89L16.45 14.1C16.79 13.42 17.48 12.99 18.24 12.99H21.98"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6 7L18 7"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 10L15 10"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </figure>
                <h3 className="text-[14px] leading-6 font-normal mr-auto">
                  Sổ địa chỉ nhận hàng
                </h3>
                <button>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </div>

            <div onClick={() => handleNavigate("/account/prescriptions")} className="block no-underline">
              <li className="flex justify-between items-center h-16 px-6 hover:bg-[#f4fef2]">
                <figure className="w-6 h-6 mr-2">
                  <svg
                    stroke="#333333"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M2 13H5.76C6.52 13 7.21 13.43 7.55 14.11L8.44 15.9C9 17 10 17 10.24 17H13.77C14.53 17 15.22 16.57 15.56 15.89L16.45 14.1C16.79 13.42 17.48 12.99 18.24 12.99H21.98"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6 7L18 7"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 10L15 10"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </figure>
                <h3 className="text-[14px] leading-6 font-normal mr-auto">
                  Toa thuốc của tôi
                </h3>
                <button>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </div>

            {/* <Link
              to="/account/test_reports"
              className="block no-underline border-b-[16px] border-[#ededed]"
            >
              <li className="flex justify-between items-center h-16 px-6 hover:bg-[#f4fef2]">
                <figure className="w-6 h-6 mr-2">
                  <svg
                    stroke="#333333"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M2 13H5.76C6.52 13 7.21 13.43 7.55 14.11L8.44 15.9C9 17 10 17 10.24 17H13.77C14.53 17 15.22 16.57 15.56 15.89L16.45 14.1C16.79 13.42 17.48 12.99 18.24 12.99H21.98"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6 7L18 7"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 10L15 10"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </figure>
                <h3 className="text-[14px] leading-6 font-normal mr-auto">
                  Kết quả xét nghiệm
                </h3>
                <button>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </Link> */}

            <div onClick={() => handleNavigate("/account/ranking_rules")} className="block no-underline">
              <li className="flex justify-between items-center h-16 px-6 hover:bg-[#f4fef2]">
                <figure className="w-6 h-6 mr-2">
                  <svg
                    stroke="#333333"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M2 13H5.76C6.52 13 7.21 13.43 7.55 14.11L8.44 15.9C9 17 10 17 10.24 17H13.77C14.53 17 15.22 16.57 15.56 15.89L16.45 14.1C16.79 13.42 17.48 12.99 18.24 12.99H21.98"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6 7L18 7"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 10L15 10"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </figure>
                <h3 className="text-[14px] leading-6 font-normal mr-auto">
                  Quy chế xếp hạng thẻ thành viên
                </h3>
                <button>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </div>

            <div onClick={() => handleNavigate("/account/history_point")} className="block no-underline">
              <li className="flex justify-between items-center h-16 px-6 hover:bg-[#f4fef2]">
                <figure className="w-6 h-6 mr-2">
                  <svg
                    stroke="#333333"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M2 13H5.76C6.52 13 7.21 13.43 7.55 14.11L8.44 15.9C9 17 10 17 10.24 17H13.77C14.53 17 15.22 16.57 15.56 15.89L16.45 14.1C16.79 13.42 17.48 12.99 18.24 12.99H21.98"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M6 7L18 7"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                    <path
                      d="M9 10L15 10"
                      stroke="inherit"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </figure>
                <h3 className="text-[14px] leading-6 font-normal mr-auto">
                  Lịch sử tích điểm thẻ thành viên
                </h3>
                <button>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </li>
            </div>
          </ul>
          <div className="account_support text-center block pt-5 border-t-[16px] border-[#ededed] tracking-normal">
            <div className="pb-5 mb-5 box-border border-b border-[#f2f4f5]">
              <div className="flex items-center justify-center px-10">
                <i className="fa-solid fa-headset w-[24px] mr-1"></i>
                <b className="text-[17px] text-primaryColor">0866554764</b>
                <p className="text-[11px] ml-1">Tư vấn đặt hàng</p>
              </div>
            </div>
            <button className="text[14px] font-normal leading-6 text-[#8e9aab]">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
