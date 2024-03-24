import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import logo from "../Assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { LoginSignup } from "../../Pages/LoginSignup";
import { ShopContext } from "../../Context/ShopContext";
import { Dropdown } from "antd";
import axios from "axios";

export const NavbarSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [prevSearchQuery, setPrevSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const navigate = useNavigate();

  const {
    getTotalCartItems,
    getTotalCartAmountWithsale,
    setStateLogin,
    userData,
  } = useContext(ShopContext);

  const handleNavigateToUserData = (href) => {
    navigate(href, { state: { addressData, userData  } });
  };

  // console.log(userData);
  // console.log(addressData);

  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await axios.get("http://localhost:4000/allAddresses", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const { addresses } = response.data;
        setAddressData(addresses);
      } catch (err) {
        console.error(err);
      }
    };

    getAddress();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setPrevSearchQuery("");
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:4000/search?query=${query.trim()}`
      );
      const { products } = response.data;
      console.log(products);
      setSearchResults(products);
      setPrevSearchQuery(query);
    } catch (error) {
      console.error("Lỗi tìm kiếm:", error);
    }
  };

  const [show, setShow] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const showInfoContact = () => {
    setShow(true);
  };

  const hideInfoContact = () => {
    setShow(false);
  };

  // dropdown account
  const items = [
    {
      key: "1",
      label: (
        <div onClick={() => handleNavigateToUserData("/account/orders")}>
          Lịch sử đơn hàng
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => handleNavigateToUserData("/account")}>
          Chỉnh sửa thông tin cá nhân
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <button
          onClick={() => {
            localStorage.removeItem("auth-token");
            window.location.replace("/");
          }}
        >
          Đăng xuất
        </button>
      ),
    },
  ];

  return (
    <div>
      <div className="navbar flex-wrap flex justify-between items-center 1lg:gap-[15px] relative pt-[12px] pb-[10px]">
        <div className="text-white text-[10px]">
          <i className="fa-solid fa-location-dot mr-1"></i>
          Hệ thống nhà thuốc
        </div>
        <div>
          <Link to="/">
            <img src={logo} alt="logo" className="max-h-[40px] navbar_logo" />
          </Link>
        </div>

        <div className="nav_search relative flex-1 w-[45%]">
          <form>
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                handleSearch(e.target.value);
              }}
              onFocus={() => {
                setSearchQuery(prevSearchQuery);
                handleSearch(prevSearchQuery);
                setShowSearchResults(true);
              }}
              className="w-full h-[40px] p-[10px] rounded border-0 bg-[#fff]"
            />
            <i className="fa-solid fa-magnifying-glass absolute top-[10px] right-[10px] text-[#4cb551]"></i>
          </form>
          {searchResults.length > 0 && showSearchResults && (
            <div
              onClick={() => setShowSearchResults(true)}
              className="absolute top-[60px] flex flex-col h-fit w-full z-10 bg-white box-border rounded-xl [box-shadow:0_0_16px_rgba(0,0,0,.2)] max-h-[70vh] overflow-y-auto"
            >
              <div className="flex-[30_1] p-3 box-border">
                <h3>Kết quả tìm kiếm:</h3>
                {searchResults.map((product) => (
                  <div
                    onClick={() => {
                      navigate(`/products/${product.id}`, { state: product });
                      setSearchResults([]);
                    }}
                    key={product.id}
                    className="flex items-center p-[10px] rounded-lg text-[15px]"
                  >
                    <img
                      src={product.image}
                      alt="result search img"
                      className="w-[80px] mr-4"
                    />
                    <span>{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Link to="/cart">
          <div className="justify-around bg-[#0e562e] rounded px-[10px] py-[2px] mx-auto flex items-center h-[42px] max-w-[140px] box-border cursor-pointer nav_cart">
            <div className="relative mr-[8px] text-center">
              <i className="fa-solid fa-cart-shopping text-[#fff] text-[20px] nav_cart-icon"></i>
              <span className="absolute bottom-0 min-w-[15px] bg-white rounded-full text-[9px] left-[14px] font-bold text-[#4cb551]">
                {getTotalCartItems()}
              </span>
            </div>
            <div className="nav-cart-money 1lg:block text-center flex flex-col">
              <span className="text-[#fff] py-[2px] text-[11px] 1lg:text-[13px] inline-block">
                Giỏ hàng
              </span>
              <strong className="text-[#ffbe65] ml-[5px] text-[11px] 1lg:text-[14px]">
                {getTotalCartAmountWithsale().toLocaleString("vi-VN")}đ
              </strong>
            </div>
          </div>
        </Link>

        <div className="nav_history-cart 1lg:block relative">
          <div
            className="text-[#fff] bg-[#0e562e] rounded h-[42px] flex items-center min-w-[110px] p-[5px] w-[150px] justify-center"
            onClick={showInfoContact}
          >
            <i className="fa-regular fa-user mr-[5px] text-[20px]"></i>
            <span className="text-[13px] leading-[16px]">Lịch sử đơn nhận</span>
          </div>

          <div
            className={`nav-history-info bg-white p-[10px] rounded-lg min-w-[235px] absolute t-[100%] right-0 [box-shadow:0_0_12px_rgba(51,51,51,.2)] [transition:.3s] z-10 ${
              show ? "block" : "hidden"
            }`}
          >
            <div className="history-info-detail flex justify-between mb-[20px]">
              <h4 className="font-bold text-[14px]">Hỗ trợ trực tuyến</h4>
              <i
                className="fa-solid fa-xmark cursor-pointer"
                onClick={hideInfoContact}
              ></i>
            </div>
            <ul>
              <li className="border my-[12px] py-[6px] px-[16px] text-[15px]">
                <a href="tel: 0866554764" className="block">
                  <i className="fa-solid fa-phone align-middle inline-block text-[#60b357] text-[20px]"></i>
                  <strong className="inline-block align-middle leading-[20px] ml-[12px]">
                    0866554764{" "}
                    <span className="block font-normal text-[12px]">
                      (7h30 - 22h00)
                    </span>
                  </strong>
                </a>
              </li>
              <li className="border my-[12px] py-[6px] px-[16px] text-[15px]">
                <a
                  href="https://www.facebook.com/thientan2528/"
                  className="block"
                >
                  <i className="fa-brands fa-facebook-messenger align-middle inline-block bg-[linear-gradient(45deg,_rgba(51,_120,_255,_1),_rgba(154,_54,_255,_1),_rgba(255,_96,_111,_1))] bg-clip-text text-transparent text-[22px]"></i>
                  <strong className="inline-block align-middle leading-[20px] ml-[12px]">
                    Chat Mess
                    <span className="block font-normal text-[12px]">
                      (7h30 - 22h00)
                    </span>
                  </strong>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {localStorage.getItem("auth-token") ? (
          <div className="nav_account 1lg:flex justify-between min-w-[150px] text-white">
            <Dropdown
              menu={{
                items,
              }}
              placement="bottom"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <div
                onClick={() => handleNavigateToUserData("/account")}
                className="flex items-center"
              >
                <h1>{userData?.namecus}</h1>
                <i className="fa-regular fa-user pl-3"></i>
              </div>
            </Dropdown>
          </div>
        ) : (
          <div className="nav_account 1lg:flex justify-between min-w-[150px] text-white">
            <Link
              to={"#"}
              className="border-r pr-2"
              onClick={() => {
                setShowModal(true);
                setStateLogin("Đăng ký");
              }}
            >
              Đăng ký
            </Link>
            <Link
              to={"#"}
              className="px-2"
              onClick={() => {
                setShowModal(true);
                setStateLogin("Đăng nhập");
              }}
            >
              Đăng nhập
              <i className="fa-regular fa-user pl-2"></i>
            </Link>
          </div>
        )}
      </div>

      {showModal &&
        createPortal(
          <LoginSignup onClose={() => setShowModal(false)} />,
          document.body
        )}
    </div>
  );
};
