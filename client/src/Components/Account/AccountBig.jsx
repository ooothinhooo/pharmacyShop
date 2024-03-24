import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
// import { ShopContext } from "../../Context/ShopContext";

export const AccountBig = (props) => {
  // const { userData } = useContext(ShopContext)
  const { userData } = props;
  // console.log(user);

  const [image, setImage] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);


  const [userDetail, setUserDetail] = useState(() => {
    if (userData) {
      return {
        name: userData.namecus || "",
        gender: userData.gender || "",
        date: userData.date || new Date().toLocaleDateString(),
        phone: userData.phone || "",
        email: userData.email || "",
        avatar: userData.avatar || "",
      };
    }
    return {
      name: "",
      gender: "",
      date: new Date().toLocaleDateString(),
      phone: "",
      email: "",
      avatar: "",
    };
  });

  useEffect(() => {
    const initialUserDetail = {
      name: userData.namecus || "",
      gender: userData.gender || "",
      date: userData.date || new Date().toLocaleDateString(),
      phone: userData.phone || "",
      email: userData.email || "",
    };

    setHasChanges(
      Object.keys(userDetail).some(
        (key) => userDetail[key] !== initialUserDetail[key]
      )
    );
  }, [userDetail, userData]);

  // }, [user]);

  const imageHandle = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandle = (e) => {
    console.log(e.target.name);
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };

  const UpdateProfile = async () => {
    // console.log(userDetail);
  
    let responseData = {};
    let user = userDetail;
  
    // Kiểm tra nếu có ảnh mới
    if (image) {
      let formData = new FormData();
      formData.append("user", image);
  
      await fetch("http://localhost:4000/uploadAvatar", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });
  
      if (responseData.success) {
        user.image = responseData.image_url;
      }
    }
  
    await fetch("http://localhost:4000/updateProfile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify(user),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.success) {
          alert("Cập nhật thông tin thành công");
          window.location.href = "/";
        } else {
          alert("Cập nhật thông tin thất bại");
        }
      });
  };

  return (
    <div className="desktop_big flex-1 box-border bg-white rounded-xl min-h-[300px] h-fit p-6">
      <div className="desktop_head text-[24px] font-bold leading-8">
        <h1>Chỉnh sửa thông tin cá nhân</h1>
      </div>
      <div className="desktop_box mt-4">
        <div className="account_profile flex justify-between">
          <div className="account_info w-[395px] text-center">
            <div className="account_avatar mb-4">
              <div className="account_detail-photo">
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  id="avatar_input"
                  onChange={imageHandle}
                  hidden
                />
                <label htmlFor="avatar_input">
                  <div className="cursor-pointer">
                    <figure className="w-[120px] h-[120px] bg-[#f2f6f3] rounded-[50%] !my-0 !mx-auto overflow-hidden flex justify-center items-center">
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt="upload"
                          className="object-cover object-center"
                        />
                      ) : userDetail.avatar ? (
                        <img
                          src={userDetail.avatar}
                          alt="avatar"
                          className="object-cover object-center"
                        />
                      ) : (
                        <i className=" fa-solid fa-plus text-[34px] text-[#8e9aab]"></i>
                      )}
                    </figure>

                    <div className="cursor-pointer text-[15px] font-normal leading-[22px] text-primaryColor underline bg-none mt-5">
                      Bấm để cập nhật ảnh mới
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="account_detail w-[415px] ">
            <div>
              <div className="inputTextField">
                <label htmlFor="name" className="text-[12px] leading-[18px]">
                  Họ và tên
                  <span className="ml-[3px] text-[#f33060]">*</span>
                </label>
                <div className="inputTextField_group">
                  <input
                    type="text"
                    name="name"
                    value={userDetail.name}
                    onChange={changeHandle}
                    className="outline-none box-border bg-transparent py-[9px] border-b border-[#e5e5e5] text-[15px] w-full"
                  />
                </div>
              </div>
            </div>

            <div className="account_detail-gender mt-4">
              <label htmlFor="" className="text-[12px]">
                Giới tính
              </label>
              <div className="flex mt-[10px]">
                <div className="radioButton box-border mb-0 text-[14px] mr-[60px]">
                  <input
                    type="radio"
                    name="gender"
                    id="nam"
                    value="Nam"
                    className="mr-2"
                    checked={userDetail.gender === "Nam"}
                    onChange={changeHandle}
                  />
                  <label htmlFor="nam">Nam</label>
                </div>
                <div className="radioButton box-border mb-0 text-[14px] mr-[60px]">
                  <input
                    type="radio"
                    name="gender"
                    id="nu"
                    value="Nữ"
                    className="mr-2"
                    checked={userDetail.gender === "Nữ"}
                    onChange={changeHandle}
                  />
                  <label htmlFor="nu">Nữ</label>
                </div>
                <div className="radioButton box-border mb-0 text-[14px]">
                  <input
                    type="radio"
                    name="gender"
                    id="khac"
                    value="Khác"
                    className="mr-2"
                    checked={userDetail.gender === "Khác"}
                    onChange={changeHandle}
                  />
                  <label htmlFor="khac">Khác</label>
                </div>
              </div>
            </div>

            <div className="account_detail-birthday mt-4">
              <label htmlFor="" className="text-[12px]">
                Ngày tháng năm sinh{" "}
                <span className="ml-[3px] text-[#f33060]">*</span>
              </label>
              <div className="birthday_field border-b border-[#e5e5e5] mb-[10px]">
                {
                  <DatePicker
                    onChange={(date) =>
                      setUserDetail({
                        ...userDetail,
                        date: date.toLocaleDateString(),
                      })
                    }
                    value={userDetail.date}
                    className="w-full"
                    //   clearIcon
                  />
                }
              </div>
            </div>

            <div className="account_detail-phone mt-4">
              <label htmlFor="phone" className="text-[12px]">
                Số điện thoại
                <span className="ml-[3px] text-[#f33060]">*</span>
              </label>
              <div>
                <input
                  type="text"
                  name="phone"
                  value={userDetail.phone}
                  onChange={changeHandle}
                  className="outline-none box-border bg-transparent py-[9px] border-b border-[#e5e5e5] text-[15px] w-full"
                />
              </div>
            </div>

            <div className="account_detail-email mt-4">
              <div>
                <label htmlFor="" className="text-[12px]">
                  Email
                  <span className="ml-[3px] text-[#f33060]">*</span>
                </label>
                <div>
                  <input
                    type="text"
                    name="email"
                    value={userDetail.email}
                    onChange={changeHandle}
                    className="outline-none box-border bg-transparent py-[9px] border-b border-[#e5e5e5] text-[15px] w-full"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={() => UpdateProfile()}
              disabled={!hasChanges}
              className="border-none flex items-center rounded-xl w-full leading-[54px] text-[17px] text-center font-bold justify-center !bg-primaryColor text-white mt-5 mb-10"
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
