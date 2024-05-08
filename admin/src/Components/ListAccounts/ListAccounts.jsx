// eslint-disable-next-line no-unused-vars
import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Modal, Pagination } from "antd";
import { createPortal } from "react-dom";
import AccountDetail from "./AccountDetail";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../util/Toast/Toast";

const ListAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [show, setShow] = useState(false);
  const [updateAccount, setUpdateAccount] = useState(null);
  const [accountDetail, setAccountDetail] = useState(null);
  const [accountToDelete, setAccountToDelete] = useState(null);
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

  const handleShow = () => {
    setShow(true);
  };

  const handleUpdateAccount = (account) => {
    setUpdateAccount(account);
    setShow(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  const handleDeleteAccount = useCallback(async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/deleteAccount",
        { id: id },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        await fetchInfo();
        toast.success(`Account ${id} đã được xóa!`);
      } else {
        toast.error(`Xóa account ${id} thất bại`);
      }
    } catch (error) {
      console.error("Xóa account thất bại:", error.message);
      toast.error(`Xóa account ${id} thất bại`);
    } finally {
      setAccountToDelete(null);
    }
  }, []);

  useEffect(() => {
    if (accountToDelete !== null) {
      Modal.confirm({
        title: "Xác nhận xóa",
        content: "Bạn có chắc muốn xóa account này không?",
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk() {
          handleDeleteAccount(accountToDelete);
        },
      });
    }
  }, [accountToDelete, handleDeleteAccount]);

  const confirmDelete = (accountId) => {
    setAccountToDelete(accountId);
  };

  return (
    <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
      <h1 className="uppercase text-[28px] font-semibold m-5">TÀI KHOẢN</h1>
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
            .sort((a, b) => a.id - b.id)
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
                  <p>{formatDate(account.created_date)}</p>
                  <button
                    onClick={() => handleUpdateAccount(account)}
                    className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white"
                  >
                    Chỉnh sửa
                  </button>
                  <button
                    onClick={() => {
                      handleShow();
                      setUpdateAccount(null);
                      setAccountDetail(account);
                    }}
                    className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => {
                      confirmDelete(account.id);
                    }}
                    className="hover:text-primaryColor"
                  >
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

        {show &&
          createPortal(
            <AccountDetail
              onClose={() => setShow(false)}
              updateAccount={updateAccount}
              accountDetail={accountDetail}
              formatDate={formatDate}
              fetchInfo={fetchInfo}
            />,
            document.body
          )}

        <Toast />
      </div>
    </div>
  );
};

export default ListAccounts;
