// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Pagination } from "antd";

const ListAccounts = () => {
  const [accounts, setAccounts] = useState([]);

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allAccounts");
    const data = await response.json();
    setAccounts(data.accounts);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1 className="my-5">TÀI KHOẢN</h1>
      <div className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.6fr_0.6fr_0.5fr] w-full gap-4">
        <p>Mã</p>
        <p>Tên tài khoản</p>
        <p>Mật khẩu</p>
        <p>Ngày tạo</p>
        <p></p>
        <p></p>
        <p></p>
      </div>
      <div className="list_product-allProduct w-full">
        <hr />
        {accounts.length > 0 &&
          accounts
            .slice((current - 1) * pageSize, current * pageSize)
            .map((account, index) => {
              return (
                <div
                  key={index}
                  className="grid grid-cols-[0.5fr_1fr_1fr_1fr_0.6fr_0.6fr_0.5fr] w-full gap-4 items-center p-3"
                >
                  <p>{account.id}</p>
                  <p>{account.username}</p>
                  <p>{account.password}</p>
                  <p>{new Date(account.created_date).toLocaleDateString()}</p>
                  <button className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white">
                    Chỉnh sửa
                  </button>
                  <button className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white">
                    Xem chi tiết
                  </button>
                  <button className="hover:text-primaryColor">
                    <i className="fa-solid fa-trash cursor-pointer m-auto"></i>
                  </button>
                </div>
              );
            })}

        {
          <Pagination
            className="text-center"
            current={current}
            onChange={setCurrent}
            pageSize={pageSize}
            total={accounts.length}
            responsive={true}
          />
        }
      </div>
    </div>
  );
};

export default ListAccounts;
