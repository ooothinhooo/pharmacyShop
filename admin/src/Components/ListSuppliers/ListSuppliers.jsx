/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from "react";
import { Modal, Pagination } from "antd";
import { createPortal } from "react-dom";
import SuppliersDetail from "./SuppliersDetail";
import Toast from "../util/Toast/Toast";
import axios from "axios";
import { toast } from "react-toastify";
const ListSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [show, setShow] = useState(false);
  const [updateSupplier, setUpdateSupplier] = useState(null);
  const [supplierToDelete, setSupplierToDelete] = useState(null);

  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const fetchInfo = async () => {
    const response = await fetch("http://localhost:4000/allSuppliers");
    const data = await response.json();
    setSuppliers(data.suppliers);
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleShow = () => {
    setShow(true);
  };

  const handleEditSupplier = (supplier) => {
    setUpdateSupplier(supplier);
    setShow(true);
  };

  const handleDeleteSupplier = useCallback(async (id) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/deleteSupplier",
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
        toast.success(`Nhà cung cấp ${id} đã được xóa!`);
      } else {
        toast.error(`Xóa nhà cung cấp ${id} thất bại`);
      }
    } catch (error) {
      console.error("Xóa nhà cung cấp thất bại:", error.message);
      toast.error(`Xóa nhà cung cấp ${id} thất bại`);
    } finally {
      setSupplierToDelete(null);
    }
  }, []);

  useEffect(() => {
    if (supplierToDelete !== null) {
      Modal.confirm({
        title: "Xác nhận xóa",
        content: "Bạn có chắc muốn xóa voucher này không?",
        okText: "Xóa",
        okType: "danger",
        cancelText: "Hủy",
        onOk() {
          handleDeleteSupplier(supplierToDelete);
        },
      });
    }
  }, [supplierToDelete, handleDeleteSupplier]);

  const confirmDelete = (voucherId) => {
    setSupplierToDelete(voucherId);
  };

  return (
    <>
      <div className="list_product flex flex-col items-center w-full min-h-[750px] h-auto py-[10px] px-[50px] m-[30px] rounded bg-white">
        <div className="flex w-full justify-between items-center">
          <div></div>
          <h1 className="uppercase text-[28px] font-semibold m-5">
            NHÀ CUNG CẤP
          </h1>
          <button
            onClick={() => {
              handleShow();
              setUpdateSupplier(null);
            }}
            className="flex items-center bg-primaryColor text-white rounded p-2"
          >
            Thêm nhà cung cấp <i className="fa-solid fa-plus pl-2"></i>
          </button>
        </div>
        <div className="grid grid-cols-[0.3fr_1.2fr_0.8fr_1fr_1fr_1fr] w-full gap-4">
          <p>Mã</p>
          <p>Tên nhà cung cấp</p>
          <p>Địa chỉ</p>
          <p>Số điện thoại</p>
          <p></p>
          <p></p>
        </div>
        <div className="list_product-allProduct w-full">
          <hr />
          {suppliers.length > 0 &&
            suppliers
              .sort((a, b) => a.voucher_id - b.voucher_id)
              .slice((current - 1) * pageSize, current * pageSize)
              .map((supplier, index) => {
                return (
                  <div
                    key={index}
                    className="grid grid-cols-[0.3fr_1.2fr_0.8fr_1fr_1fr_1fr] w-full gap-4 items-center py-3"
                  >
                    <p>{supplier.id}</p>
                    <p>{supplier.sup_name}</p>
                    <p>{supplier.sup_address}</p>
                    <p>{supplier.sup_phone}</p>
                    <button
                      onClick={() => handleEditSupplier(supplier)}
                      className="border p-2 rounded-xl border-primaryColor transition-all duration-200 hover:bg-green-500 hover:text-white"
                    >
                      Chỉnh sửa
                    </button>
                    <button
                      onClick={() => confirmDelete(supplier.id)}
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
              total={suppliers.length}
              responsive={true}
            />
          }

          {show &&
            createPortal(
              <SuppliersDetail
                onClose={() => setShow(false)}
                fetchInfo={fetchInfo}
                updateSupplier={updateSupplier}
              />,
              document.body
            )}

          <Toast />
        </div>
      </div>
    </>
  );
};

export default ListSuppliers;
