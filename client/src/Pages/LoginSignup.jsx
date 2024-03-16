import React, { useContext, useState } from "react";
import google from "../Components/Assets/google.svg";
import facebook from "../Components/Assets/facebook.svg";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

export const LoginSignup = ({ onClose }) => {
  const { stateLogin, setStateLogin } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(formData);

  const register = async () => {
    let responseData;
    await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };

  const login = async () => {
    let responseData;
    await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      window.location.replace("/");
    } else {
      alert(responseData.error);
    }
  };

  return (
    <div className="fixed z-30 top-0 left-0 right-0 bottom-0 bg-[rgba(0,_0,_0,_0.3)] flex justify-center items-center">
      <div className="bg-white min-w-[300px] max-w-[400px] min-h-[200px] max-h-[600px] rounded-md px-8">
        <div className="flex justify-center relative items-center p-[10px]  ">
          <h3 className="font-bold text-[24px]">{stateLogin}</h3>
          <div className="absolute right-0 opacity-55">
            <i
              className="text-[18px] fa-solid fa-xmark cursor-pointer"
              onClick={onClose}
            ></i>
          </div>
        </div>
        <div className="p-[10px]">
          <div className="flex flex-col gap-[10px]">
            <div className="relative">
              <i className="fa-solid fa-user absolute bottom-3 left-2 text-gray-400"></i>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={changeHandler}
                placeholder="tên tài khoản"
                className="w-full h-[40px] px-[38px] rounded border-0 outline-none border-b mt-3"
              />
            </div>
            <div className="relative">
              <i className="fa-solid fa-lock absolute bottom-3 left-2 text-gray-400"></i>
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={changeHandler}
                placeholder="nhập mật khẩu"
                className="w-full h-[40px] px-[38px] rounded border-0 outline-none border-b mt-3"
              />
            </div>

            {stateLogin === "Đăng ký" ? (
              <label className="relative p-3">
              <input type="checkbox" />
              <span className="ml-2 text-[14px]">
                Tôi đã đọc và đồng ý điều khoản sử dụng
                <span className="text-[#0e562e] ml-1">
                  Thoả thuận người dùng, Chính sách bảo mật{" "}
                </span>
              </span>
            </label>
            ) : ""}
            
            <button
              onClick={() => {
                stateLogin === "Đăng ký" ? register() : login();
              }}
              className="bg-[#0e562e] text-[#fff] h-[50px] rounded-lg w-full mx-auto mb-3 mt-3"
            >
              Tiếp tục
            </button>
            <div className="register_social mb-4">
              <div className="flex justify-center items-center mb-8">Hoặc</div>
              <div className="social_groups flex flex-col gap-[16px]">
                <button className="facebook outline-none py-2 px-5 flex justify-center items-center rounded-lg border text-[17px] leading-8 h-12 bg-white text-[#026ae3] border-[#026ae3]">
                  <img src={facebook} alt="" className="mr-1" />
                  Tiếp tục với Facebook
                </button>
                <button className="google outline-none py-2 px-5 flex justify-center items-center rounded-lg border text-[17px] leading-8 h-12 bg-white border-black">
                  <img src={google} alt="" className="mr-1" />
                  Tiếp tục với Google
                </button>
              </div>
            </div>

            {stateLogin === "Đăng ký" ? (
              <div className="login text-center text-[14px]">
                <span>Đã có tài khoản ?</span>
                <Link
                  to="#"
                  className="text-[#0e562e] ml-1"
                  onClick={() => {
                    setStateLogin("Đăng nhập");
                  }}
                >
                  Đăng nhập ngay
                </Link>
              </div>
            ) : (
              <div className="login text-center text-[14px]">
                <span>Chưa có tài khoản?</span>
                <Link
                  to="#"
                  className="text-[#0e562e] ml-1"
                  onClick={() => {
                    setStateLogin("Đăng ký");
                  }}
                >
                  Đăng ký ngay
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
